const express = require("express");
const {
  getCompanies,
  getCompany,
  createCompany,
  updateCompany,
  deleteCompany,
} = require("../controller/companies");

const router = express.Router();
router.route("/").get(getCompanies).post(createCompany);

router.route("/:id").get(getCompany).put(updateCompany).delete(deleteCompany);

module.exports = router;
