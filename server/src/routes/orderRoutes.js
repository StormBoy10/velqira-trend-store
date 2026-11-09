import express from 'express';
import { Order } from '../models/Order.js';
import { Product } from '../models/Product.js';
import { protect, adminOnly } from '../middleware/auth.js';

const router = express.Router();

// @route POST /api/orders (Customer create order - Atomic stock guard & price recalculation)
router.post('/', protect, async (req, res) => {
  const { orderItems, shippingAddress, paymentMethod } = req.body;

  if (!orderItems || orderItems.length === 0) {
    return res.status(400).json({ success: false, message: 'No order items provided' });
  }

  try {
    let verifiedSubtotal = 0;
    const verifiedItems = [];

    for (const item of orderItems) {
      // Atomic stock guard: Find product with sufficient stock and deduct atomically
      const product = await Product.findOneAndUpdate(
        {
          _id: item.product,
          isActive: true,
          stock: { $gte: item.quantity },
        },
        {
          $inc: { stock: -item.quantity },
        },
        { new: true }
      );

      if (!product) {
        return res.status(400).json({
          success: false,
          message: `Product "${item.name || 'Item'}" is unavailable or out of stock for quantity ${item.quantity}.`,
        });
      }

      // Recalculate price on backend
      const itemPrice = product.price;
      verifiedSubtotal += itemPrice * item.quantity;

      verifiedItems.push({
        product: product._id,
        name: product.name,
        price: itemPrice,
        quantity: item.quantity,
        image: product.image,
      });
    }

    const shippingPrice = verifiedSubtotal > 100 ? 0 : 15;
    const verifiedTotalPrice = verifiedSubtotal + shippingPrice;

    const order = await Order.create({
      user: req.user._id,
      orderItems: verifiedItems,
      shippingAddress,
      paymentMethod: paymentMethod || 'Credit Card',
      totalPrice: verifiedTotalPrice,
      isPaid: true,
      status: 'Processing',
    });

    res.status(201).json({
      success: true,
      message: 'Order verified, stock deducted atomically, and created successfully',
      order,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// @route GET /api/orders/my-orders (Customer retrieve their orders)
router.get('/my-orders', protect, async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user._id }).sort({ createdAt: -1 });
    res.json({ success: true, count: orders.length, orders });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// @route GET /api/orders (Admin retrieve all store orders)
router.get('/', protect, adminOnly, async (req, res) => {
  try {
    const orders = await Order.find().populate('user', 'name email').sort({ createdAt: -1 });
    res.json({ success: true, count: orders.length, orders });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

export default router;
