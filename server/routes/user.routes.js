import express from 'express';
import { userLogin, userRegister, userProfile } from '../controllers/user.controller.js';

const router = express.Router()

router.post('/login', userLogin);
router.post('/register', userRegister);
router.get('/profile', userProfile);

export default router;