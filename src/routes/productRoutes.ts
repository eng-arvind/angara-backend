import { Router } from 'express';
import {getProducts,getProductById,placeOrder, getCart,updateCart,deleteCart,createProduct, updateProduct,getOrders,} from '../controllers/productController'

const router = Router();

router.get('/product', getProducts);
router.get('/product/:id', getProductById);
router.post('/order', placeOrder);
router.get('/cart', getCart);
router.post('/cart', updateCart);
router.delete('/cart', deleteCart);

router.post('/product', createProduct);
router.put('/product/:id', updateProduct);
router.get('/order', getOrders);

export default router;
