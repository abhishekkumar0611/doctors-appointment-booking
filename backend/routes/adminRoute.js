import express from 'express';
import upload from '../middlewares/multer.js';
import authAdmin from '../middlewares/authAdmin.js';
import {changeAvailablity} from '../controllers/doctorController.js';
import { allDoctors, addDoctor, loginAdmin } from '../controllers/adminController.js'



const adminRouter = express.Router();

adminRouter.post('/add-Doctor', authAdmin, upload.single('image'), addDoctor);
adminRouter.post('/login', loginAdmin);
adminRouter.post('/all-doctors',  authAdmin, allDoctors);
adminRouter.post('/change-availablity',authAdmin, changeAvailablity);





export default adminRouter