import validator from 'validator';
import bcrypt from 'bcrypt';
import { v2 as cloudinary } from 'cloudinary';
import doctorModel from '../models/doctorModel.js';
import jwt from 'jsonwebtoken';



// API for adding doctor
const addDoctor = async(req, res) => {
    try {
        const { name, email, password, speciality, degree, experience, about, fees, adress } = req.body;
        const imageFile = req.imageFile;

        if (!name || !email || !password || !speciality || !degree || !experience || !about || !fees || !adress) {
            return res.json({success: false, message: 'Missing Details'})
        }

        if (!validator.isEmail(email)) {
            return res.json({success: false, message: 'Please enter a valid email'})
        }

        if (password.length < 8) {
            return res.json({success: false, message: 'Please enter a strong password'})
        }

        //hashing doctor password
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)

        //upload immage to cloudinary
        const imageUpload = await cloudinary.uploader.upload(imageFile.path, { resource_type: 'image'})
        const imageUrl = imageUpload.secure_url

        const doctorData = {
            name,
            email,
            password: hashedPassword,
            speciality,
            degree,
            experience,
            about,
            fees,
            adress:JSON.parse(adress),
            date: Date.now()
        }

        const newDoctor = new doctorModel(doctorData)
        await newDoctor.save()

        res.json({ success:  true, message: "Doctor addes"})


    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message})
    }
}

//API for admin login
<<<<<<< HEAD

const loginAdmin = async (req, res) => {
  try {
    const { email, password } = req.body;

    // 1️⃣ Validate input
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Email and password are required",
      });
    }

    // 2️⃣ Match with env credentials
    if (
      email !== process.env.ADMIN_EMAIL ||
      password !== process.env.ADMIN_PASSWORD
    ) {
      return res.status(401).json({
        success: false,
        message: "Invalid credentials",
      });
    }

    // 3️⃣ Create admin token (IMPORTANT)
    const token = jwt.sign(
      {
        id: "admin",      // static id is fine here
        isAdmin: true,    // ✅ REQUIRED for authAdmin
        email,
      },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    return res.json({
      success: true,
      token,
    });
  } catch (error) {
    console.log("ADMIN LOGIN ERROR:", error);
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};



=======
const loginAdmin = async(req, res) => {
    try {
        
        const { email, password } = req.body;

        if (!email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD) {
            const token = jwt.sign(email+password, process.env.JWT_SECRET )
            res.json({success: true, token})

        } else {
            res.json({success: false, message: "invalid Credentials"})
        }
    } catch (error) {
         console.log(error)
        res.json({ success: false, message: error.message})
    }
}
>>>>>>> 6a576abdee5462a810efa8e598b45ba5b3df7102

const allDoctors = async(req, res) => {
    try {
        const doctors = await doctorModel.find({}).select('-password')
        res.json({success: true, doctors})
    } catch (error) {
        console.log(error)
        res.json({success: false, message: error.message})
    }

}

export { addDoctor, loginAdmin, allDoctors}