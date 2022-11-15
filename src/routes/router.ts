import { Router } from 'express';
import multer from 'multer';
import { order } from '../controllers/order';
import { questions } from '../controllers/question';

const router = Router();

router.post('/order', order);

router.post('/questions', questions);

export default router;
