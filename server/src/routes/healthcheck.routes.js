import express from 'express';
import * as healthcheckControllers from '../controllers/healthcheck.controllers.js';

const router = express.Router();

router.get('/', healthcheckControllers.checkHealth);

export default router;