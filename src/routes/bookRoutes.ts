import express from 'express';
import authMiddleware from '../middleware/authMiddleware';
import bookController from '../controllers/bookController';

const router = express.Router();

router.post('/', authMiddleware('CREATOR'), bookController.createBook);

router.get('/', authMiddleware('VIEWER'), bookController.getBooks);

export default router;

