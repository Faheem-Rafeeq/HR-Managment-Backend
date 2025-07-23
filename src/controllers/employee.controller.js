import Employee from "../models/employee.model.js";
import User from "../models/auth.models.js";

// Add new employee
export const addEmployee = async (req, res) => {
  try {
    const { userId, department, role, salary } = req.body;
    const companyId = req.user.id; // assume company owner/admin is creating

    const employee = new Employee({
      userId,
      companyId,
      department,
      role,
      salary,
    });

    await employee.save();
    res.status(201).json({ message: "Employee added", employee });
  } catch (error) {
    res.status(500).json({ message: "Failed to add employee", error: error.message });
  }
};

// Get all employees for a company
export const getEmployees = async (req, res) => {
  try {
    const companyId = req.user.id;

    const employees = await Employee.find({ companyId }).populate("userId", "name email phone");
    res.json({ employees });
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch employees", error: error.message });
  }
};

// Get single employee
export const getEmployee = async (req, res) => {
  try {
    const employee = await Employee.findById(req.params.id).populate("userId");
    if (!employee) return res.status(404).json({ message: "Employee not found" });
    res.json(employee);
  } catch (error) {
    res.status(500).json({ message: "Error getting employee", error: error.message });
  }
};

// Update employee
export const updateEmployee = async (req, res) => {
  try {
    const updated = await Employee.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json({ message: "Employee updated", updated });
  } catch (error) {
    res.status(500).json({ message: "Error updating employee", error: error.message });
  }
};

// Delete employee
export const deleteEmployee = async (req, res) => {
  try {
    await Employee.findByIdAndDelete(req.params.id);
    res.json({ message: "Employee deleted" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting employee", error: error.message });
  }
};
