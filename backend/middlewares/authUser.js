<<<<<<< HEAD
import jwt from "jsonwebtoken";

const authUser = (req, res, next) => {
  try {
    console.log("AUTH HEADER:", req.headers.authorization); // 👈 ADD
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({
        success: false,
        message: "not authorized Login Again",
      });
    }

    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    console.log("DECODED TOKEN:", decoded); // 👈 ADD

    req.userId = decoded.id;
    next();
  } catch (error) {
    console.log("AUTH ERROR:", error);
    return res.status(401).json({
      success: false,
      message: "Invalid or expired token",
    });
  }
};


export default authUser;
=======
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
>>>>>>> 6a576abdee5462a810efa8e598b45ba5b3df7102
