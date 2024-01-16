import express from 'express';
import { authorization, login } from '../controller/auth.controller';
import { verifyToken } from '../middleware/auth.middleware';

const router = express.Router();

router.post('/auth', verifyToken, authorization)
router.post('/auth/login', login)

export default router;