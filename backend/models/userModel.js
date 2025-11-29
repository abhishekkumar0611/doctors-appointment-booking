import mongoose from 'mongoose';


const userScheema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, unique: true },
    password: { type: String, required: true },
    image: { type: String, default:"" },
    adress: { type: Object, default: {line1: '',line2: ''}},
    gender: { type: String, default: 'Not selected'},
    dob:  { type: String, default: 'Not selected'},
    phone:  { type: String, default: '0000000000'}

},  {minimize: false})

const userModel = mongoose.models.user || mongoose.model('user', userScheema)

export default userModel