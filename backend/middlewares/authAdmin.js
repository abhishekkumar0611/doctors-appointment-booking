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



//Admin authentication middleware


export default authAdmin
