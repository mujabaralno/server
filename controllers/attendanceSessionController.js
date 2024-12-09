const AttendanceSession = require("../database/models/attendancesession.model");

exports.getSessions = async (req, res) => {
  try {
    const sessions = await AttendanceSession.find();
    res.status(200).json(sessions);
  } catch (error) {
    res.status(500).json({ message: "Failed to retrieve sessions", error });
  }
};