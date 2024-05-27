import express from 'express';
import { getBirds, getBirdById, createBird, updateBird, deleteBird } from '../controllers/birdsController.js';
import { protect } from '../middleware/authMiddleware.js';
import checkObjectId from '../middleware/checkObjecId.js';

const router = express.Router();

router.route('/').get(getBirds).post(protect, createBird);
router.route('/:id')
  .get(checkObjectId, getBirdById)
  .put(protect, checkObjectId, updateBird)
  .delete(protect, checkObjectId, deleteBird);

export default router;
