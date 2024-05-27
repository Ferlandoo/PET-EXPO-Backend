import mongoose from "mongoose";

const birdSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  species: {
    type: String,
    required: true,
  },
  family: {
    type: String,
    required: true,
  },
  habitat: {
    type: String,
    required: true,
  },
  place_of_found: {
    type: String,
    required: true,
  },
  diet: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  weight_kg: {
    type: Number,
    required: true,
  },
  wingspan_cm: {
    type: Number,
  },
  height_cm: {
    type: Number,
  },
  image: {
    type: String,
    required: true,
  },
});

const Bird = mongoose.model("Bird", birdSchema);

export default Bird;
