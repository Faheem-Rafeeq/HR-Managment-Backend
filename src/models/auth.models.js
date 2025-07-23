import mongoose from "mongoose";
import bcrypt from "bcrypt";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },

  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
  },

  phone: {
    type: String,
    required: true,
  },

  gender: {
    type: String,
    enum: ["male", "female", "other"],
    required: true,
  },

  dob: {
    type: Date,
    required: true,
  },

  address: {
    type: String,
    default: "",
  },

  role: {
    type: String,
    enum: ["owner", "admin", "hr", "employee"],
    default: "employee",
  },

  department: {
    type: String,
    default: "",
  },

  isActive: {
    type: Boolean,
    default: true,
  },

  password: {
    type: String,
    required: true,
    minlength: 6,
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// 🔒 Hash password before saving
userSchema.pre("save", async function () {
  if (!this.isModified("password")) return;
  this.password = await bcrypt.hash(this.password, 10);
});

// 🔍 Compare password on login
userSchema.methods.matchPassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

const User = mongoose.model("User", userSchema);
export default User;
