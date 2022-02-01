const Company = require("../models/Company");
const ErrorRessponse = require("../utils/errorResponse");

exports.getCompanies = async (req, res, next) => {
  try {
    const company_data = await Company.find();
    res.status(200).json({ success: true, data: company_data });
  } catch (err) {
    next(err);
  }
};

exports.getCompany = async (req, res, next) => {
  try {
    const company_data = await Company.findById(req.params.id);
    res.status(200).json({ success: true, data: company_data });
  } catch (err) {
    next(err);
  }
};

exports.createStudent = async (req, res, next) => {
  try {
    const company_data = await Company.create(req.body);
    res.status(201).json({ success: true, data: company_data });
  } catch (err) {
    next(err);
  }
};
