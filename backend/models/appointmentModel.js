import mongoose from "mongoose";

<<<<<<< HEAD
const appointmentSchema = new mongoose.Schema({
  userId: { type: String, required: true },

  docId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Doctor", 
    required: true,
  },

  slotDate: { type: String, required: true },
  slotTime: { type: String, required: true },
  userData: { type: Object, required: true },
  amount: { type: Number, required: true },
  date: { type: Number, required: true },
  cancelled: { type: Boolean, default: false },
  payment: { type: Boolean, default: false },
  isCompleted: { type: Boolean, default: false },
});

const appointmentModel =
  mongoose.models.Appointment ||
  mongoose.model("Appointment", appointmentSchema);

export default appointmentModel;
=======

const appointmentSchema = new mongoose.Schema({
    userId: {type: String, required: true},
    docId: {type: String, required: true},
    slotDate: {type: String, required: true},
    slotTime: { type: String, required: true},
    userData: { type: Object, required: true},
    amount: { type: Number, required: true},
    date: { type: Number, required: true},
    cancelled: { type: Boolean, default: false},
    payment: { type: Boolean, default: false},
    isCompleted: { type: Boolean, default: false }

    
})

const appointmentModel = mongoose.models.appointment || mongoose.model('appointment', appointmentSchema)

export default appointmentModel
>>>>>>> 6a576abdee5462a810efa8e598b45ba5b3df7102
