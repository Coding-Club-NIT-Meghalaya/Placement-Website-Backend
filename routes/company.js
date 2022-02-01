const express = require("express");
const upload = require("../middleware/multer");
const {
  getCompanies,
  getCompany,
  createCompany,
  updateCompany,
  deleteCompany,
} = require("../controller/companies");

const router = express.Router();
router.route("/").get(getCompanies).post(upload.single("photo"), createCompany);

router.route("/:id").get(getCompany).put(updateCompany).delete(deleteCompany);

module.exports = router;
