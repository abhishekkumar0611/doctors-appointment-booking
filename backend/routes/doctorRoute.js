import express from 'express';
import { doctorList } from '../controllers/doctorController.js';

const doctorRouter = express.Router()


doctorRouter.get('/list', doctorList)

<<<<<<< HEAD
export default doctorRouter
=======
export default doctorRouter
>>>>>>> 6a576abdee5462a810efa8e598b45ba5b3df7102
