const mongoose = require("mongoose");

const ClassSchema = new mongoose.Schema(
  {
    classID: {
      type: Number,
      required: true,
    },
    className: {
      type: String,
      required: true,
    },
    imageUrl: {
      type: String,
    },
    universityName: {
      type: String,
      required: true,
    },
    students: {
      type: Array,
      default: [],
    },
  },
  {
    timestamps: true,
  }
);

const ClassRoom = mongoose.model("ClassRoom", ClassSchema);

module.exports = ClassRoom;
