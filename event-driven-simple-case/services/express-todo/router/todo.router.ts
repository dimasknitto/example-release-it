import express from 'express';
import { createTodo, deleteTodo, getOneTodo, getTodo, updateTodo } from '../controller/todo.controller';
import { verifyToken } from '../middleware/auth.middleware';

const router = express.Router();

router.get('/todo', verifyToken, getTodo)
router.get('/todo/:uuid', verifyToken, getOneTodo)
router.post('/todo/', verifyToken, createTodo)
router.patch('/todo/:uuid', verifyToken, updateTodo)
router.delete('/todo/:uuid', verifyToken, deleteTodo)

export default router;