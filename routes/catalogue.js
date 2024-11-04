import express from 'express';
import { searchProducts } from '../controllers/catalogController.js';
import { loacalUpload, catalogueImageUpload } from '../middlewares/upload.js';

const router = express.router();

router.get('/product/search', searchProducts);
export default router;
