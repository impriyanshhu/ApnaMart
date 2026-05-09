import express from 'express';
import { upload } from '../config/multer.js';
import authAdmin from '../middlewares/authAdmin.js';
import { addProduct, changeStock, productById, productList, updateProduct } from '../controllers/productController.js';

const productRouter = express.Router();

productRouter.post('/add', upload.array(["images"]), authAdmin, addProduct);
productRouter.get('/list', productList);
productRouter.patch('/id', productById);
productRouter.post('/stock', authAdmin, changeStock);
productRouter.post('/update', upload.array(["images"]), authAdmin, updateProduct);

export default productRouter;