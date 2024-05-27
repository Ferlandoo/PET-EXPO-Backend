import express from 'express';
import { getCats, getCatById, createCat, updateCat, deleteCat } from '../controllers/catsController.js';
import { protect } from '../middleware/authMiddleware.js';
import checkObjectId from '../middleware/checkObjecId.js';

const router = express.Router();

router.route('/').get(getCats).post(protect, createCat);
router.route('/:id')
  .get(checkObjectId, getCatById)
  .put(protect, checkObjectId, updateCat)
  .delete(protect, checkObjectId, deleteCat);

export default router;
