    const express = require("express");
    const { createAttendanceData } = require("../controllers/attendanceDataController");

    const router = express.Router();

    router.post("/", createAttendanceData);

    module.exports = router;
