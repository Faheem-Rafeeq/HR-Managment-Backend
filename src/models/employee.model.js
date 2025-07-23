import mongoose from "mongoose";

const employeeSchema = new mongoose.Schema({
  companyId: { type: mongoose.Schema.Types.ObjectId, ref: "Company", required: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  department: { type: String, required: true },
  role: { type: String, enum: ["employee", "hr", "admin"], default: "employee" },
  joiningDate: { type: Date, default: Date.now },
  salary: { type: Number, default: 0 },
  status: { type: String, enum: ["active", "inactive"], default: "active" },
});

const Employee = mongoose.model("Employee", employeeSchema);
export default Employee;
