import express from 'express';
import authMiddleware from '../middleware/authMiddleware';
import bookController from '../controllers/bookController';

const router = express.Router();

// Create book route (secured by CREATOR role)
router.post('/', authMiddleware('CREATOR'), bookController.createBook);

// Get books route (secured by VIEWER and VIEW_ALL roles)
router.get('/', authMiddleware('VIEWER'), bookController.getBooks);

export default router;

