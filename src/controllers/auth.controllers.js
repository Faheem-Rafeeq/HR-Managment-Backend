import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import User from "../models/auth.models.js";


const generateAccessToken = (user) => {
  return jwt.sign({ id: user._id, role: user.role }, process.env.ACCESS_JWT_SECRET, {
    expiresIn: "6h",
  });
};

const generateRefreshToken = (user) => {
  return jwt.sign({ id: user._id, role: user.role }, process.env.REFRESH_JWT_SECRET, {
    expiresIn: "7d",
  });
};

// Register
const registerUser = async (req, res) => {
  try {
    const {
      name,
      email,
      phone,
      gender,
      dob,
      address,
      role,
      department,
      password,
    } = req.body;

    if (!email || !password || !name || !phone || !gender || !dob)
      return res.status(400).json({ message: "All required fields must be filled" });

    const existingUser = await User.findOne({ email });
    if (existingUser)
      return res.status(400).json({ message: "User already exists" });

    const user = new User({
      name,
      email,
      phone,
      gender,
      dob,
      address,
      role,
      department,
      password,
    });

    await user.save();

    const accessToken = generateAccessToken(user);
    const refreshToken = generateRefreshToken(user);

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      sameSite: "Lax",
      secure: process.env.NODE_ENV === "production",
    });

    res.status(201).json({
      message: "User registered successfully",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    console.error("Register error:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// Login
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password)
      return res.status(400).json({ message: "Email and password required" });

    const user = await User.findOne({ email });
    if (!user || !(await user.matchPassword(password)))
      return res.status(400).json({ message: "Invalid credentials" });

    const accessToken = generateAccessToken(user);
    const refreshToken = generateRefreshToken(user);

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      sameSite: "Lax",
      secure: process.env.NODE_ENV === "production",
    });

    res.json({
      message: "Login successful",
      accessToken,
      refreshToken,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// Logout
const logoutUser = async (req, res) => {
  try {
    res.clearCookie("refreshToken");
    res.json({ message: "User logged out successfully" });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// Refresh Token
const refreshToken = async (req, res) => {
  try {
    const token = req.cookies.refreshToken || req.body.refreshToken;
    if (!token)
      return res.status(401).json({ message: "No refresh token provided" });

    const decoded = jwt.verify(token, process.env.REFRESH_JWT_SECRET);
    const user = await User.findById(decoded.id);
    if (!user) return res.status(404).json({ message: "Invalid token" });

    const accessToken = generateAccessToken(user);
    res.json({ message: "Token refreshed", accessToken });
  } catch (error) {
    console.error("Token refresh error:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export { registerUser, loginUser, logoutUser, refreshToken };
