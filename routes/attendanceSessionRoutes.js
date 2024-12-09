const express = require("express");
const { getSessions } = require("../controllers/attendanceSessionController");
const router = express.Router();

router.get("/", getSessions);

module.exports = router;