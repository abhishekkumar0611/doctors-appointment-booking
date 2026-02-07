import mongoose from "mongoose";

const doctorSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, unique: true },
    password: { type: String, required: true },
    image: { type: String, required: true },
<<<<<<< HEAD
    address: {
      line1: { type: String, default: "" },
      line2: { type: String, default: "" },
      city: { type: String, default: "" }
    },




=======
    adress: { type: Object, required: true},
>>>>>>> 6a576abdee5462a810efa8e598b45ba5b3df7102
    speciality: { type: String, required: true },
    degree: { type: String, required: true },
    about: { type: String, required: true },
    available: { type: Boolean, required: true },
    fees: { type: Number, required: true },
<<<<<<< HEAD
=======
    adress: { type: Object, required: true },
>>>>>>> 6a576abdee5462a810efa8e598b45ba5b3df7102
    date: { type: Number, required: true },
    slots_booked: { type: Object, default: {} },
  },
  { minimize: false }
);

const doctorModel =
<<<<<<< HEAD
  mongoose.models.Doctor || mongoose.model("Doctor", doctorSchema); 
=======
  mongoose.model.doctor || mongoose.model("doctor", doctorSchema);
>>>>>>> 6a576abdee5462a810efa8e598b45ba5b3df7102

export default doctorModel;
