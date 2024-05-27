import express from 'express';
import { getDogs, getDogById, createDog, updateDog, deleteDog } from '../controllers/dogsController.js';
import { protect } from '../middleware/authMiddleware.js';
import checkObjectId from '../middleware/checkObjecId.js';

const router = express.Router();

router.route('/').get(getDogs).post(protect, createDog);
router.route('/:id')
  .get(checkObjectId, getDogById)
  .put(protect, checkObjectId, updateDog)
  .delete(protect, checkObjectId, deleteDog);

export default router;
