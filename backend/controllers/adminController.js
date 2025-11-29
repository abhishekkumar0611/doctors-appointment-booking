import validator from 'validator';
import bcrypt from 'bcrypt';
import { v2 as cloudinary } from 'cloudinary';
import doctorModel from '../models/doctorModel';
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

export { addDoctor, loginAdmin}