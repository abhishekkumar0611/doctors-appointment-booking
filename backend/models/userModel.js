import mongoose from 'mongoose';


const userScheema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, unique: true },
    password: { type: String, required: true },
<<<<<<< HEAD
    image: { type: String, default: "" },
    address: {
        line1: { type: String, default: "" },
        line2: { type: String, default: "" },
        city: { type: String, default: "" }
    },


    gender: { type: String, default: 'Not selected' },
    dob: { type: String, default: 'Not selected' },
    phone: { type: String, default: '0000000000' }

}, { minimize: false })
=======
    image: { type: String, default:"" },
    adress: { type: Object, default: {line1: '',line2: ''}},
    gender: { type: String, default: 'Not selected'},
    dob:  { type: String, default: 'Not selected'},
    phone:  { type: String, default: '0000000000'}

},  {minimize: false})
>>>>>>> 6a576abdee5462a810efa8e598b45ba5b3df7102

const userModel = mongoose.models.user || mongoose.model('user', userScheema)

export default userModel