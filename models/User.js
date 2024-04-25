const { Schema, default: mongoose } = require("mongoose");

const schema = new Schema({
  name: {
    required: true,
    type: String,
  },
  email: {
    required: true,
    type: String,
  },
  password: {
    required: true,
    type: String,
  },
  phone: {
    required: true,
    type: String,
  },
  bio: {
    required: false,
    type: String,
  },
});

const User = mongoose.models.User ?? mongoose.model("User", schema);

export default User;
