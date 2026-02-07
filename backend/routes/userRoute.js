import express from 'express';
<<<<<<< HEAD
import { registerUser, loginUser, getProfile, updateProfile, bookAppointment, cancelAppointment, getMyAppointments } from '../controllers/userController.js';
=======
import { registerUser, loginUser, getProfile, updateProfile, bookAppointment } from '../controllers/userController.js';
>>>>>>> 6a576abdee5462a810efa8e598b45ba5b3df7102
import authUser from '../middlewares/authUser.js';
import upload from '../middlewares/multer.js'

const userRouter = express.Router()

userRouter.post('/register', registerUser)
userRouter.post('/login', loginUser)


userRouter.get('/get-profile', authUser, getProfile)
userRouter.post('/update-profile', upload.single('image'), authUser, updateProfile)

userRouter.post('/book-appointment', authUser, bookAppointment)
<<<<<<< HEAD
userRouter.post('/cancel-appointment', authUser, cancelAppointment)

userRouter.post('/my-appointments', authUser, getMyAppointments)


=======
>>>>>>> 6a576abdee5462a810efa8e598b45ba5b3df7102


export default userRouter