// src/models/company.model.js
import mongoose from "mongoose";

const companySchema = new mongoose.Schema({
  name: { type: String, required: true },
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }, // Owner
  admins: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  hrUsers: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
}, { timestamps: true });

const Company = mongoose.model("Company", companySchema);
export default Company;
