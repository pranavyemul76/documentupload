// User Registration Route
const User = require("../Modules/User");
const nodemailer = require("nodemailer");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const Semail = process.env.email;
const password = process.env.password;
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: Semail,
    pass: password,
  },
});
exports.UserRegister = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;
    // Check if the user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email already exists" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    // Generate OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const GenerateToken = jwt.sign(
      {
        name,
        email,
        password: hashedPassword,
        verify: false,
        otp,
      },
      process.env.JWT_SECRET
    );
    // Prepare email options
    const mailOptions = {
      from: Semail,
      to: email,
      subject: "Your OTP Code",
      text: `Your OTP code is ${otp}`,
    };

    // Send OTP email
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        return res.status(500).json({ message: error.toString() });
      }
      // Send a response after the email is successfully sent
      res.json({ token: GenerateToken, message: "OTP sent to email" });
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "An error occurred" });
  }
};

// User Login Route
exports.UserLogin = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (user && bcrypt.compare(password, user?.password)) {
    const token = jwt.sign(
      { email: user.email, userId: user._id },
      process.env.JWT_SECRET
    );
    res.json({ token, message: "Login successfull" });
  } else {
    res.status(401).json({ message: "Invalid credentials" });
  }
};

exports.VerifyOtp = async (req, res) => {
  const { name, email, password, otp } = req;
  const { inputOtp } = req.body;
  try {
    if (!inputOtp) {
      return res.status(400).json({ message: "Invalid OTP" });
    }
    if (inputOtp === otp) {
      // Create and save the new user
      const CreareUser = User({ name, email, password, verify: true });
      const SaveUser = await CreareUser.save();
      const token = jwt.sign(
        { email: email, userId: SaveUser._id },
        process.env.JWT_SECRET
      );
      res.status(200).json({ token, message: "OTP verified" });
    } else {
      return res.status(400).json({ message: "Invalid OTP" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error verifying OTP" });
  }
};
exports.GetUsersByemail = async (req, res) => {
  try {
    const { email } = req.params;
    console.log(email);
    const UsersList = await User.find({});
    res.status(200).json({ users: UsersList });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error + "Error Fetching user list" });
  }
};
