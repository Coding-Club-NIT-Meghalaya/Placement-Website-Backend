const express = require("express");
const router = express.Router();
router.route("/").get(getStudents).post(createStudent);

router.route("/:id").get(getStudent).put(updateStudent).delete(deleteStudent);

module.exports = router;
