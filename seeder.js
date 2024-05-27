import mongoose from "mongoose";
import dotenv from "dotenv";
import Bird from "./models/birdsModel.js";
import Cat from "./models/catsModel.js";
import Dog from "./models/dogsModel.js";
import User from "./models/userModel.js";
import { getAllBirds } from "./data/birdsData.js";
import { getAllCats } from "./data/catsData.js";
import { getAllDogs } from "./data/dogsData.js";
import user from "./data/userData.js";
import connectDB from "./config/dbConfig.js";

dotenv.config();

connectDB();

const importData = async () => {
  try {
    await Bird.deleteMany();
    await Cat.deleteMany();
    await Dog.deleteMany();
    await User.deleteMany();

    const birds = await getAllBirds();
    await Bird.insertMany(birds);
    const cats = await getAllCats();
    await Cat.insertMany(cats);
    const dogs = await getAllDogs();
    await Dog.insertMany(dogs);
    await User.insertMany(user);

    console.log("Data Imported!");
    process.exit();
  }
  catch (error) {
    console.error(`Error: ${error}`);
    process.exit(1);
  }
}

const destroyData = async () => {
  try {
    await Bird.deleteMany();
    await Cat.deleteMany();
    await Dog.deleteMany();
    await User.deleteMany();

    console.log("Data destroyed!");
    process.exit();
  } catch (error) {
    console.error(`Error: ${error}`);
    process.exit(1);
  }
}


if (process.argv[2] === "-d") {
  destroyData();
}
else {
  importData();
}
