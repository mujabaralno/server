const { Schema, model } = require('mongoose');

const UserSchema = new Schema({
  clerkId: { type: String, required: true, unique: true },
  firstName: { type: String, required: true },
  lastName: {type: String, required: true },
  photo: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  npm: { type: String, required: true },
  angkatan: { type: String, required: true },
});

const User = model('User', UserSchema);  
module.exports = User;
