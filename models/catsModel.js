import mongoose from "mongoose";

const catSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  origin: {
    type: String,
    required: true,
  },
  temperate: {
    type: String,
    required: true,
  },
  color: {
    type: Array,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
});

const Cat = mongoose.model("Cat", catSchema);

export default Cat;
