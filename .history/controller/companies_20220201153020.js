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

exports.updateCompany = async (req, res, next) => {
  try {
    const company_data = await Company.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );
    if (!company_data) {
      return next(
        new ErrorRessponse(`Student not found with id ${req.params.id}`, 404)
      );
    }
    res.status(200).json({ success: true, data: company_data });
  } catch (err) {
    next(err);
  }
};

exports.deleteCompany = async (req, res, next) => {
  try {
    const company_data = await Company.findByIdAndDelete(req.params.id, {
      new: true,
      runValidators: true,
    });
    if (!company_data) {
      return next(
        new ErrorRessponse(`Student not found with id ${req.params.id}`, 404)
      );
    }
    res.status(203).json({ success: true, data: company_data });
  } catch (err) {
    next(err);
  }
};
