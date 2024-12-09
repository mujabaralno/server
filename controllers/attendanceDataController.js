const AttendanceData = require("../database/models/attendancedata.model");

const haversineDistance = (lat1, lon1, lat2, lon2) => {
  const toRad = (value) => (value * Math.PI) / 180;

  const R = 6371e3;
  const φ1 = toRad(lat1);
  const φ2 = toRad(lat2);
  const Δφ = toRad(lat2 - lat1);
  const Δλ = toRad(lon2 - lon1);

  const a =
    Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
    Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) * Math.sin(Δλ / 2);

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
};

const CAMPUS_LATITUDE = -7.193234156344108;
const CAMPUS_LONGITUDE = 107.88183192771106;
const CAMPUS_RADIUS = 120;

const createAttendanceData = async (req, res) => {
  try {
    const { userId, sessionId, location } = req.body;

    if (!userId || !sessionId || !location) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const { latitude, longitude } = location;

    const distance = haversineDistance(
      latitude,
      longitude,
      CAMPUS_LATITUDE,
      CAMPUS_LONGITUDE
    );

    if (distance > CAMPUS_RADIUS) {
      return res
        .status(400)
        .json({ error: "You are outside the campus area!" });
    }

    const session = await AttendanceSession.findById(sessionId);
    if (!session) {
      return res.status(404).json({ error: "Attendance session not found" });
    }

    const currentTime = new Date();
    const endTime = new Date(session.endTime);

    let status = "Mangkir";

    if (currentTime <= endTime) {
      status = "Hadir";
    } else if (currentTime <= new Date(endTime.getTime() + 15 * 60 * 1000)) {
      status = "Terlambat";
    } else {
      return res.status(403).json({ error: "Attendance session has expired" });
    }

    const existingAttendance = await AttendanceData.findOne({
      userId,
      sessionId,
    });
    if (existingAttendance) {
      return res
        .status(409)
        .json({ error: "User has already checked in for this session" });
    }

    const newAttendance = new AttendanceData({
      userId,
      sessionId,
      status,
      timestamp: currentTime,
    });

    await newAttendance.save();

    res.status(201).json({ message: "Attendance recorded successfully" });
  } catch (error) {
    console.error("Error recording attendance:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = {
  createAttendanceData,
};
