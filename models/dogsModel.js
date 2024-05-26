import mongoose from "mongoose";

const dogSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  breed_group: {
    type: String,
    required: true,
  },
  size: {
    type: String,
    required: true,
  },
  life_span: {
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
  color: {
    type: String,
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

const Dog = mongoose.model("Dog", dogSchema);

export default Dog;
