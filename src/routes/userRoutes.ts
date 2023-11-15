import express from 'express';
import userController from '../controllers/userController';

const router = express.Router();

// Register user route
router.post('/register', userController.registerUser);

// Login user route
router.post('/login', userController.loginUser);

export default router;
