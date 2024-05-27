import express from 'express';
import { loginUser, logoutUser, getUserProfile, updateUserProfile, registerUser } from '../controllers/userController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/logout', logoutUser);
router.post('/login', loginUser);
router.route('/profile').get(protect, getUserProfile).put(protect, updateUserProfile);
router.post('/register', registerUser);


export default router;
