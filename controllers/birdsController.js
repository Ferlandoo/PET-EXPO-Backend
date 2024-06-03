import aysncHandler from 'express-async-handler';
import Bird from '../models/birdsModel.js';

// @desc Fetch all birds
// @route GET /api/birds
// @access Public
const getBirds = aysncHandler(async (request, response) => {
  const birds = await Bird.find({});
  response.json(birds);
});

// @desc Fetch single bird
// @route GET /api/birds/:id
// @access Public
const getBirdById = aysncHandler(async (request, response) => {
  const bird = await Bird.findById(request.params.id);

  if (bird) {
    response.json(bird);
  } else {
    response.status(404);
    throw new Error('Bird not found');
  }
});

// @desc Create a bird
// @route POST /api/birds
// @access Private/Admin
const createBird = aysncHandler(async (request, response) => {
  const { name, species, family, habitat, place_of_found, diet, description, wingspan_cm, weight_kg, image } = request.body;

  const bird = new Bird({
    name,
    species,
    family,
    habitat,
    place_of_found,
    diet,
    description,
    wingspan_cm,
    weight_kg,
    image
  });

  const createdBird = await bird.save();
  response.status(201).json(createdBird);
});

// @desc Update a bird
// @route PUT /api/birds/:id
// @access Private/Admin
const updateBird = aysncHandler(async (request, response) => {
  const { name, species, family, habitat, place_of_found, diet, description, wingspan_cm, weight_kg, height_cm, image } = request.body;

  const bird = await Bird.findById(request.params.id);

  if (bird) {
    bird.name = name;
    bird.species = species;
    bird.family = family;
    bird.habitat = habitat;
    bird.place_of_found = place_of_found;
    bird.diet = diet;
    bird.description = description;
    bird.wingspan_cm = wingspan_cm;
    bird.weight_kg = weight_kg;
    bird.height_cm = height_cm;
    bird.image = image;

    const updatedBird = await bird.save();
    response.json(updatedBird);
  } else {
    response.status(404);
    throw new Error('Bird not found');
  }
});

// @desc Delete a bird
// @route DELETE /api/birds/:id
// @access Private/Admin
const deleteBird = aysncHandler(async (request, response) => {
  const bird = await Bird.findById(request.params.id);

  if (bird) {
    await Bird.deleteOne({ _id: bird._id });
    response.json({ message: 'Bird removed' });
  } else {
    response.status(404);
    throw new Error('Bird not found');
  }
});

export { getBirds, getBirdById, createBird, updateBird, deleteBird };
