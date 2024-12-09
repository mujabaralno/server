const mongoose = require('mongoose');

const AttendanceSessionSchema = new mongoose.Schema({
    sessionName: { type: String, required: true },
    description: { type: String },
    location: { type: String },
    qr_code: { type: String },
    startTime: { type: Date, default: Date.now},
    endTime: { type: Date, default: Date.now  },
});

const AttendanceSession = mongoose.model('AttendanceSession', AttendanceSessionSchema);
module.exports = AttendanceSession;
