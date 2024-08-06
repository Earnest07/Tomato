import jwt from "jsonwebtoken";

const authMiddleware = (req, res, next) => {
  const { token } = req.headers;
  if (!token) {
    return res
      .status(401)
      .json({ success: false, message: "Not Authorized. Login Again" });
  }

  try {
    const tokenDecode = jwt.verify(token, process.env.JWT_SECRET);
    console.log(tokenDecode);
    req.body.userId = tokenDecode.id;
    next();
  } catch (error) {
    console.error("Auth Middleware Error:", error); // Debugging
    res.status(500).json({ success: false, message: "Error" });
  }
};

export default authMiddleware;
