const { Schema, model } = require("mongoose");

const EventSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  date: {
    type: String,
    required: true
  },
  imageURL: {
    type: String,
    required: true
  },
  coordinate: {
    latitude: Number,
    longitude: Number
  },
  creator: {
    type: Schema.Types.ObjectId,
    ref: "User"
  },
  createdAt: {
    type: Date,
    default: Date.now()
  }
});

EventSchema.pre("save", async function(next) {
  const url = `/files/${this.imageURL}`;
  this.imageURL = url;
  next();
});

module.exports = model("Event", EventSchema);
