import validator from "validator";
import bcrypt from 'bcrypt';
import userModel from '../models/userModel.js';
import jwt from 'jsonwebtoken';
import { v2 as cloudinary } from 'cloudinary';
import doctorModel from '../models/doctorModel.js';
import appointmentModel from "../models/appointmentModel.js";
<<<<<<< HEAD
import razorpay from 'razorpay'
=======
>>>>>>> 6a576abdee5462a810efa8e598b45ba5b3df7102

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
<<<<<<< HEAD
      password: hashedPassword,
      
=======
      password: hashedPassword
>>>>>>> 6a576abdee5462a810efa8e598b45ba5b3df7102
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
<<<<<<< HEAD
      const token = jwt.sign({id: user._id}, process.env.JWT_SECRET, {expiresIn: "7d"})
=======
      const token = jwt.sign({id: user._id}, process.env.JWT_SECRET)
>>>>>>> 6a576abdee5462a810efa8e598b45ba5b3df7102
      res.json({success: true, token})
      
    } else {
      res.json({ success: false, message: "invalid Credentials"})
    }
    
  } catch (error) {
    console.log(error)
        res.json({success: false, message: error.message})
<<<<<<< HEAD
    
=======
        
>>>>>>> 6a576abdee5462a810efa8e598b45ba5b3df7102
    
  }
}

//API for get user's profile

<<<<<<< HEAD
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
    const { userId, name, phone, address, dob, gender } = req.body;
=======
const getProfile = async(req, res) => {
  try {

    const { userId } = req.body;
    const userData = await userModel.find(userId).select('-password')

    res.json({success: true, userData})
    
  } catch (error) {
     console.log(error)
        res.json({success: false, message: error.message})
    
  }
};

//API to update user's profile
const updateProfile = async (req, res) => {
  try {
    const { userId, name, phone, adress, dob, gender } = req.body;
>>>>>>> 6a576abdee5462a810efa8e598b45ba5b3df7102
    const  imageFile  = req.file

  if (!name || !phone || !dob || !gender) {
    return res.json({success: false, message: "Data missings"})
    
  }

<<<<<<< HEAD
  await userModel.findByIdAndUpdate(userId, {name, phone, address: JSON.parse(address), dob, gender})
=======
  await userModel.findByIdAndUpdate(userId, {name, phone, adress: JSON.parse(adress), dob, gender})
>>>>>>> 6a576abdee5462a810efa8e598b45ba5b3df7102

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
<<<<<<< HEAD
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
const razorpayInstance = new razorpay({
  key_id: '',
  key_secret: ''
})
// API to make payment
const paymentRazorpay = async (req, res) => {

}




export { registerUser, loginUser, getUserProfile, updateProfile, bookAppointment, getMyAppointments, cancelAppointment}
=======
const bookAppointment = async(req, res) => {
  try {
    const { userId, docId, slotDate, slotTime } = req.body

    const docData = await doctorModel.findById(docId).select('-password')

    if (!docData.available) {
      return res.json({ success: false, message:"doctor not available"})
    }

    let slots_booked = docData.slots_booked

    if (slots_booked[slotDate]) {
      if (slots_booked[slotDate].includes(slotTime)) {
        return res.json({ success: false, message: "slot not available"})
      } else {
        slots_booked[slotDate].push(slotTime)
      }
    } else {
      slots_booked[slotDate] = []
      slots_booked[slotDate].push(slotTime)
    }

    const userData = await userModel.findById(userId).select('-password')

    delete docData.slots_booked

    const appointmentData = {
      userId, docId, userData,docData,amount: docData.fees, slotTime, slotDate,date: Date.now()

    }

    const newAppointment = new appointmentModel(appointmentData)

    await newAppointment.save()

    // save new slots data in docData
    await doctorModel.findByIdAndUpdate(docId, {slots_booked})

    res.json({success: true, message: "Appointment Booked"})
    
  } catch (error) {
    console.log(error)
        res.json({success: false, message: error.message})
  }
}


export { registerUser, loginUser, getProfile, updateProfile, bookAppointment}
>>>>>>> 6a576abdee5462a810efa8e598b45ba5b3df7102
