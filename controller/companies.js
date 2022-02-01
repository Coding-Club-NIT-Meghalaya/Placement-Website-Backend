const fs = require("fs");
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

exports.createCompany = async (req, res, next) => {
  try {
    const { name, domain } = req.body;
    const data = {
      name,
      domain,
      photo: req.file.filename,
    };
    const company_data = await Company.create(data);
    res.status(201).json({ success: true, data: company_data });
  } catch (err) {
    next(err);
  }
};

exports.updateCompany = async (req, res, next) => {
  try {
    if (req.file !== undefined) {
      req.body.photo = req.file.filename;
    }
    const old_company_data = await Company.findById(req.params.id);
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
    if (req.file !== undefined) {
      fs.unlink(`./uploads/${old_company_data.photo}`, (err) => {
        if (err) throw err;
        console.log("Image deleted from the filesystem");
      });
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
    fs.unlink(`./uploads/${company_data.photo}`, (err) => {
      if (err) throw err;
      console.log(
        "Image successfully deleted from filesystem: ",
        company_data.photo
      );
    });
    res.status(203).json({ success: true, data: company_data });
  } catch (err) {
    next(err);
  }
};
