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
