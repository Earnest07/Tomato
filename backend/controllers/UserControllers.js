import userModel from "../models/UserModel.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import validator from "validator";

// Login user

const loginUser = async (req, res) => {
  const { email, password } = req.body;
  const user = await userModel.findOne({ email });
  try {
    if (!user) return res.status(400).json({ msg: "User does not exist" });

    const comparePassword = await bcrypt.compare(password, user.password);

    if (!comparePassword) {
      return res.status(400).json({ msg: "Invalid credentials" });
    }

    return res.status(200).json({
      success: true,
      user: user,
      token: await createToken(user._id),
    });
  } catch (error) {
    res.status(400).json({ success: true, message: error.message });
  }

  try {
  } catch (error) {}
};

// create token

const createToken = async (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET);
};

// Register User

const registerUser = async (req, res) => {
  console.log("Register endpoint hit");
  const { name, password, email } = req.body;
  try {
    const exists = await userModel.findOne({ email });
    if (exists) {
      return res
        .status(400)
        .json({ success: false, message: "User already exists" });
    }

    if (!validator.isEmail(email)) {
      return res.status(400).json({ success: false, message: "Invalid email" });
    }

    if (password.length < 8) {
      return res.status(400).json({
        success: false,
        message: "Password must be at least 8 characters",
      });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new userModel({
      name: name,
      email: email,
      password: hashedPassword,
    });

    const user = await newUser.save();

    const token = await createToken(user._id);

    res.status(200).json({
      success: true,
      id: newUser._id,
      name: newUser.name,
      email: newUser.email,
      token: token,
      message: "Created user",
    });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

export { loginUser, registerUser };
