const express = require("express");
const { getAttendanceHistory } = require("../controllers/attendanceHistoryController");

const router = express.Router();

router.get("/", getAttendanceHistory);

module.exports = router;
