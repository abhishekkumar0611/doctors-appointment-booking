<<<<<<< HEAD
import jwt from "jsonwebtoken";

const authAdmin = (req, res, next) => {
  try {
    console.log("ADMIN AUTH HEADER:", req.headers.authorization); // 👈 debug

    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({
        success: false,
        message: "not authorized Login Again",
      });
    }

    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    console.log("DECODED ADMIN TOKEN:", decoded); // 👈 debug

    // ✅ admin check
    if (!decoded.isAdmin) {
      return res.status(403).json({
        success: false,
        message: "Admin access denied",
      });
    }

    // ✅ attach admin id
    req.adminId = decoded.id;

    next();
  } catch (error) {
    console.log("ADMIN AUTH ERROR:", error);
    return res.status(401).json({
      success: false,
      message: "Invalid or expired token",
    });
  }
};

export default authAdmin;
=======
import jwt from 'jsonwebtoken';


//Admin authentication middleware
const authAdmin = async(req, res, next) => {
    try {

        const {atoken} = req.headers
        if (!atoken) {
            return res.json({success: false, message: "not authorized Login Again"})
        }
        const token_decode = jwt.verify(atoken, process.env.JWT_SECRET)

        if (token_decode !== process.env.ADMIN_EMAIL + process.env.ADMIN_PASSWORD) {
            return res.json({success: false, message: "not authorized Login Again"})
            

        }
        next()

        
    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message})
        
    }

}

export default authAdmin
>>>>>>> 6a576abdee5462a810efa8e598b45ba5b3df7102
