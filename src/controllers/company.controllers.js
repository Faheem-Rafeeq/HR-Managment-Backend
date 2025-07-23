// src/controllers/company.controller.js
import Company from "../models/company.models.js";

export const createCompany = async (req, res) => {
  try {
    const { name } = req.body;

    if (req.user.role !== "owner") {
      return res.status(403).json({ message: "Only owners can create companies" });
    }

    const company = await Company.create({
      name,
      createdBy: req.user.id,
    });

    res.status(201).json({ message: "Company created", company });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

export const getMyCompanies = async (req, res) => {
  try {
    const companies = await Company.find({
      $or: [
        { createdBy: req.user.id },
        { admins: req.user.id },
        { hrUsers: req.user.id },
      ],
    });

    res.status(200).json(companies);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};
