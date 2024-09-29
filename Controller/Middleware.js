const jwt = require("jsonwebtoken");

// Middleware to authenticate user
exports.authenticateUser = (req, res, next) => {
  // Get the token from the Authorization header
  const token = req.header("Authorization")?.split(" ")[1]; // "Bearer <token>"

  if (!token) {
    return res
      .status(401)
      .json({ message: "Access denied. No token provided." });
  }

  try {
    // Verify the token using the secret key
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log(decoded);
    // Attach the user ID to the request object
    req.userId = decoded.userId;
    req.email = decoded.email;

    // Proceed to the next middleware or route handler
    next();
  } catch (err) {
    return res.status(400).json({ message: "Invalid token." });
  }
};

exports.verifyUser = (req, res, next) => {
  // Get the token from the Authorization header
  const token = req.header("Authorization")?.split(" ")[1]; // "Bearer <token>"

  if (!token) {
    return res
      .status(401)
      .json({ message: "Access denied. No token provided." });
  }

  try {
    // Verify the token using the secret key
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    // Attach the user ID to the request object

    req.email = decoded.email;
    req.verify = decoded.verify;
    req.password = decoded.password;
    req.otp = decoded.otp;
    req.name = decoded.name;
    // Proceed to the next middleware or route handler
    next();
  } catch (err) {
    return res.status(400).json({ message: "Invalid token." });
  }
};
