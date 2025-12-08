import jwt from 'jsonwebtoken';


//User authentication middleware
const authUser = async(req, res, next) => {
    try {

        const {token} = req.headers
        if (!token) {
            return res.json({success: false, message: "not authorized Login Again"})
        }
        const token_decode = jwt.verify(token, process.env.JWT_SECRET)

        req.body.userId = token_decode.userId
        next()

       
        next()

        
    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message})
        
    }

}

export default authUser