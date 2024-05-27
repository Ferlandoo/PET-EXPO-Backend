import aysncHandler from 'express-async-handler';
import Dog from '../models/dogsModel.js';

// @desc Fetch all dogs
// @route GET /api/dogs
// @access Public
const getDogs = aysncHandler(async (request, response) => {
  const dogs = await Dog.find({});
  response.json(dogs);
});

// @desc Fetch single dog
// @route GET /api/dogs/:id
// @access Public
const getDogById = aysncHandler(async (request, response) => {
  const dog = await Dog.findById(request.params.id);

  if (dog) {
    response.json(dog);
  } else {
    response.status(404);
    throw new Error('Dog not found');
  }
});

// @desc Create a dog
// @route POST /api/dogs
// @access Private/Admin
const createDog = aysncHandler(async (request, response) => {
  const { name, breed_group, size, lifespan, origin, temperament, colors, description, image } = request.body;

  const dog = new Dog({
    name,
    breed_group,
    size,
    lifespan,
    origin,
    temperament,
    colors,
    description,
    image,
  });

  const createdDog = await dog.save();
  response.status(201).json(createdDog);
});

// @desc Update a dog
// @route PUT /api/dogs/:id
// @access Private/Admin
const updateDog = aysncHandler(async (request, response) => {
  const { name, breed_group, size, lifespan, origin, temperament, colors, description, image } = request.body;

  const dog = await Dog.findById(request.params.id);

  if (dog) {
    dog.name = name;
    dog.breed_group = breed_group;
    dog.size = size;
    dog.lifespan = lifespan;
    dog.origin = origin;
    dog.temperament = temperament;
    dog.colors = colors;
    dog.description = description;
    dog.image = image;

    const updatedDog = await dog.save();
    response.json(updatedDog);
  } else {
    response.status(404);
    throw new Error('Dog not found');
  }
});

// @desc Delete a dog
// @route DELETE /api/dogs/:id
// @access Private/Admin
const deleteDog = aysncHandler(async (request, response) => {
  const dog = await Dog.findById(request.params.id);

  if (dog) {
    await Dog.deleteOne({ _id: dog._id });
    response.json({ message: 'Dog removed' });
  } else {
    response.status(404);
    throw new Error('Dog not found');
  }
});

export { getDogs, getDogById, createDog, updateDog, deleteDog };
