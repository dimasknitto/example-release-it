import express from 'express';
import { createUser, deleteUser, getOneUser, getUser, updateUser } from '../controller/user.controller';

const router = express.Router();

router.get('/user/', getUser)
router.get('/user/:uuid', getOneUser)
router.post('/user/', createUser)
router.patch('/user/:uuid', updateUser)
router.delete('/user/:uuid', deleteUser)

export default router;