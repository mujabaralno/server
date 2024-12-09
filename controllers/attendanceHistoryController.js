const AttendanceData = require("../database/models/attendancedata.model");

const getAttendanceHistory = async (req, res) => {
  try {
    const { userId } = req.query;

    if (!userId) {
      return res.status(400).json({ error: "Missing userId" });
    }

    const attendanceHistory = await AttendanceData.find({ userId })
      .sort({ timestamp: -1 }) 
      .populate("sessionId", "sessionName", "status") 
      .exec();

    if (!attendanceHistory.length) {
      return res.status(404).json({ message: "No attendance records found" });
    }

    res.status(200).json(attendanceHistory);
  } catch (error) {
    console.error("Error fetching attendance history:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = { getAttendanceHistory };
