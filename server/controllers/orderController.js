import asyncHandler from "express-async-handler";
import Order from "../models/orderModel.js";
import mongoose from "mongoose";

// Handler function to create a new order
const createOrder = asyncHandler(async (req, res) => {
  try {
    // Destructure request body
    const { user, orderItems, address, postalCode, bookingDate } = req.body;

    //create ObjectId for each order item
    const orderItemsWithObjectId = orderItems.map((item) => ({
      _id: new mongoose.Types.ObjectId(),
      maid: item.maid,
      price: item.price,
      image: item.image,
    }));

    // Create a new order instance
    const order = new Order({
      user,
      orderItems: orderItemsWithObjectId,
      address,
      postalCode,
      bookingDate,
    });

    // Save the order to the database
    const createdOrder = await order.save();

    // Send JSON response with the created order
    res.status(201).json(createdOrder);
  } catch (error) {
    // Handle errors
    console.error("Error creating order:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// Handler function to get orders by user ID
const getOrdersByUserId = asyncHandler(async (req, res) => {
  try {
    // Extract the user ID from request parameters
    const userId = req.params.userId;

    // Check if userId is undefined or empty
    if (!userId) {
      return res.status(400).json({ message: "User ID is required" });
    }

    // Find orders associated with the user ID
    const orders = await Order.find({ user: userId });

    // Check if orders are found
    if (!orders || orders.length === 0) {
      return res.status(404).json({ message: "No orders found for the user" });
    }

    // Send JSON response with the orders
    res.json(orders);
  } catch (error) {
    // Handle errors
    console.error("Error fetching orders by user ID:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// Handler function to delete an order by ID
const deleteOrder = asyncHandler(async (req, res) => {
  const orderId = req.params.orderId;
  try {
    // Find the order by ID
    const order = await Order.findById(orderId);

    // Check if the order exists
    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    // Perform any additional checks or validations before deleting the order, if necessary

    // Delete the order from the database
    await Order.deleteOne({ _id: orderId });

    // Send JSON response indicating successful deletion
    res.json({ message: "Order deleted successfully" });
  } catch (error) {
    // Handle errors
    console.error("Error deleting order:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// Export the handler functions
export { createOrder, getOrdersByUserId, deleteOrder };
