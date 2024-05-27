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
  temperament: {
    type: String,
    required: true,
  },
  colors: {
    type: [String],
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
