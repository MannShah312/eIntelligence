// import express from "express";
// import { checkBrandController } from "../controllers/checkBrandController.js";

// const router = express.Router();

// router.post("/checkBrand", checkBrandController);

// export default router;

import express from 'express';
import { checkBrandController, downloadBrandCSVController } from '../controllers/checkBrandController.js';

const router = express.Router();

// JSON endpoint
router.post('/check', checkBrandController);

// CSV download endpoint
router.post('/check/download', downloadBrandCSVController);

export default router;