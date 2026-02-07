import mongoose from "mongoose";

const doctorSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, unique: true },
    password: { type: String, required: true },
    image: { type: String, required: true},
    address: {
      line1: { type: String, default: "" },
      line2: { type: String, default: "" },
      city: { type: String, default: "" }
    },




    adress: { type: Object, required: true},
    speciality: { type: String, required: true },
    degree: { type: String, required: true },
    about: { type: String, required: true },
    available: { type: Boolean, required: true },
    fees: { type: Number, required: true },
    adress: { type: Object, required: true },

    date: { type: Number, required: true },
    slots_booked: { type: Object, default: {} },
  },
  { minimize: false }
);

const doctorModel =

  mongoose.model.doctor || mongoose.model("doctor", doctorSchema);

export default doctorModel;
