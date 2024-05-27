import aysncHandler from 'express-async-handler';
import Cat from '../models/catsModel.js';

// @desc Fetch all cats
// @route GET /api/cats
// @access Public
const getCats = aysncHandler(async (request, response) => {
  const cats = await Cat.find({});
  response.json(cats);
});

// @desc Fetch single cat
// @route GET /api/cats/:id
// @access Public
const getCatById = aysncHandler(async (request, response) => {
  const cat = await Cat.findById(request.params.id);

  if (cat) {
    response.json(cat);
  } else {
    response.status(404);
    throw new Error('Cat not found');
  }
});

// @desc Create a cat
// @route POST /api/cats
// @access Private/Admin
const createCat = aysncHandler(async (request, response) => {
  const { name, origin, temperament, colors, description, image } = request.body;

  const cat = new Cat({
    name,
    origin,
    temperament,
    colors,
    description,
    image,
  });

  const createdCat = await cat.save();
  response.status(201).json(createdCat);
});

// @desc Update a cat
// @route PUT /api/cats/:id
// @access Private/Admin
const updateCat = aysncHandler(async (request, response) => {
  const { name, origin, temperament, colors, description, image } = request.body;

  const cat = await Cat.findById(request.params.id);

  if (cat) {
    cat.name = name;
    cat.origin = origin;
    cat.temperament = temperament;
    cat.colors = colors;
    cat.description = description;
    cat.image = image;

    const updatedCat = await cat.save();
    response.json(updatedCat);
  } else {
    response.status(404);
    throw new Error('Cat not found');
  }
});

// @desc Delete a cat
// @route DELETE /api/cats/:id
// @access Private/Admin
const deleteCat = aysncHandler(async (request, response) => {
  const cat = await Cat.findById(request.params.id);

  if (cat) {
    await Cat.deleteOne({ _id: cat._id });
    response.json({ message: 'Cat removed' });
  } else {
    response.status(404);
    throw new Error('Cat not found');
  }
});

export { getCats, getCatById, createCat, updateCat, deleteCat };
