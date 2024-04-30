import express from 'express';
import { createOrder, getOrdersByUserId, deleteOrder } from '../controllers/orderController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

// Route to create a new order
router.route('/create').post(protect, createOrder);

// Route to get orders by user ID
router.route('/user/:userId').get(protect, getOrdersByUserId);

// Route to delete an order by order ID
router.route('/:orderId').delete(protect, deleteOrder);

export default router;
