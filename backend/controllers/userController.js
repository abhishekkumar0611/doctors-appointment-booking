import validator from "validator";
import bcrypt from 'bcrypt';
import userModel from '../models/userModel.js';
import jwt from 'jsonwebtoken';
import { v2 as cloudinary } from 'cloudinary';
import doctorModel from '../models/doctorModel.js';
import appointmentModel from "../models/appointmentModel.js";
import razorpay from 'razorpay';

//API to register user
const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.json({ success: false, message: "Missing Detail" });
    }

    if (!validator.isEmail(email)) {
      return res.json({ success: false, message: "Enter a valid email" });
    }

    if (password.length < 8) {
      return res.json({ success: false, message: "Enter a strong password" });
    }

    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)

    const userData = {
      name,
      email,
      password: hashedPassword,
      

    }

    const newUser = new userModel(userData)
    const user = await newUser.save()

    const token = jwt.sign({id: user._id}, process.env.JWT_SECRET )

    res.json({success: true, token})
  } catch (error) {
    console.log(error)
        res.json({success: false, message: error.message})
        
  }
};



//API for user login
const loginUser = async(req, res) => {
  try {
    const { email, password} = req.body
    const user = await userModel.findOne({email})

    if(!user) {
     return res.json({success: false, message: "user doesn't exists"})

      
    }

    const isMatch = await bcrypt.compare(password, user.password)

    if (isMatch) {
      const token = jwt.sign({id: user._id}, process.env.JWT_SECRET, {expiresIn: "7d"})


      res.json({success: true, token})
      
    } else {
      res.json({ success: false, message: "invalid Credentials"})
    }
    
  } catch (error) {
    console.log(error)
        res.json({success: false, message: error.message})
    

        
    
  }
}

//API for get user's profile


const getUserProfile = async (req, res) => {
  try {
    const user = await userModel
      .findById(req.userId)
      .select("-password");

    if (!user) {
      return res.json({ success: false, message: "User not found" });
    }

    res.json({ success: true, user });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};






//API to update user's profile
const updateProfile = async (req, res) => {
  try {
    const { userId, name, phone, adress, dob, gender } = req.body;

    const  imageFile  = req.file

  if (!name || !phone || !dob || !gender) {
    return res.json({success: false, message: "Data missings"})
    
  }


  await userModel.findByIdAndUpdate(userId, {name, phone, address: JSON.parse(address), dob, gender})
  await userModel.findByIdAndUpdate(userId, {name, phone, adress: JSON.parse(adress), dob, gender})


  if (imageFile) {
    const imageUpload = await cloudinary.uploader.upload(imageFile.path, {resource_type: 'image'})
    const imageUrl = imageUpload.secure_url

    await userModel.findByIdAndUpdate(userId, {image: imageUrl})
  }

  res.json({ success: true, message: 'Profile Updated'})
    
  } catch (error) {
     console.log(error)
        res.json({success: false, message: error.message})
  }
}

//API for book appointment

const bookAppointment = async (req, res) => {
  try {
    const userId = req.userId; // ✅ from token
    const { docId, slotDate, slotTime } = req.body;

    // 1️⃣ Validate input
    if (!docId || !slotDate || !slotTime) {
      return res.json({ success: false, message: "Missing details" });
    }

    // 2️⃣ Fetch doctor
    const docData = await doctorModel.findById(docId).select("-password");
    if (!docData || !docData.available) {
      return res.json({ success: false, message: "Doctor not available" });
    }

    // 3️⃣ Check slot availability
    let slotsBooked = docData.slots_booked || {};

    if (slotsBooked[slotDate]?.includes(slotTime)) {
      return res.json({ success: false, message: "Slot not available" });
    }

    // Add slot
    if (!slotsBooked[slotDate]) slotsBooked[slotDate] = [];
    slotsBooked[slotDate].push(slotTime);

    // 4️⃣ Fetch user
    const userData = await userModel.findById(userId).select("-password");
    if (!userData) {
      return res.json({ success: false, message: "User not found" });
    }

    // 5️⃣ Prepare doctor snapshot for appointment
    // ❌ DO NOT stringify address
    const doctorDataForAppointment = {
      _id: docData._id,
      name: docData.name,
      image: docData.image,
      speciality: docData.speciality,
      address: docData.address, // ✅ keep object
      fees: docData.fees,
    };

    const userDataForAppointment = {
      _id: userData._id,
      name: userData.name,
      email: userData.email,
      image: userData.image,
      address: userData.address, // ✅ keep object
    };

    // 6️⃣ Create new appointment
    const newAppointment = new appointmentModel({
      userId,
      docId: docData._id,           // store ObjectId for reference
      doctorData: doctorDataForAppointment,
      userData: userDataForAppointment,
      amount: docData.fees,
      slotDate,
      slotTime,
      date: Date.now(),
    });

    await newAppointment.save();

    // 7️⃣ Update doctor's slots
    await doctorModel.findByIdAndUpdate(docId, { slots_booked: slotsBooked });

    return res.json({ success: true, message: "Appointment booked" });
  } catch (error) {
    console.error(error);
    return res.json({ success: false, message: error.message });
  }
};



//API to get my appointments
const getMyAppointments = async (req, res) => {
  try {
    const userId = req.userId;

    const appointments = await appointmentModel
      .find({ userId })
      .populate("docId") 
      .sort({ date: -1 });

    res.json({
      success: true,
      appointments,
    });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// API for cancel appointment

 const cancelAppointment = async (req, res) => {
  try {
    const userId = req.userId;
    const { id } = req.params;

    // 1️⃣ Find appointment
    const appointment = await appointmentModel.findById(id);
    if (!appointment) {
      return res.json({
        success: false,
        message: "Appointment not found",
      });
    }

    // 2️⃣ Ownership check
    if (appointment.userId.toString() !== userId) {
      return res.json({
        success: false,
        message: "Unauthorized action",
      });
    }

    // 3️⃣ Already cancelled?
    if (appointment.cancelled) {
      return res.json({
        success: false,
        message: "Appointment already cancelled",
      });
    }

    // 4️⃣ Mark appointment cancelled
    appointment.cancelled = true;
    await appointment.save();

    // 5️⃣ Free doctor slot
    const doctor = await doctorModel.findById(appointment.docId);

    if (doctor?.slots_booked?.[appointment.slotDate]) {
      doctor.slots_booked[appointment.slotDate] =
        doctor.slots_booked[appointment.slotDate].filter(
          (time) => time !== appointment.slotTime
        );

      // remove empty date key
      if (doctor.slots_booked[appointment.slotDate].length === 0) {
        delete doctor.slots_booked[appointment.slotDate];
      }

      await doctor.save();
    }

    res.json({
      success: true,
      message: "Appointment cancelled successfully",
    });
  } catch (error) {
    console.error(error);
    res.json({
      success: false,
      message: error.message,
    });
  }
};

// API to make payment





export { registerUser, loginUser, getUserProfile, updateProfile, bookAppointment, getMyAppointments, cancelAppointment}


