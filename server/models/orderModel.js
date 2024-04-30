import mongoose from "mongoose";

const orderSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },

    orderItems: [
      {
        name: { type: String }, 
        image: { type: String, required: true },
        price: { type: Number, required: true },
        maid: {
          type: String,  
          required: true,
        },
      },
    ],

    address: {
      type: String,
      required: true,
    },
    postalCode: {
      type: String,
      required: true,
    },
    bookingDate: {
      type: Date,
      required: true,
    },
  },

  {
    timestamps: true,
  }
);

const Order = mongoose.model("Order", orderSchema);

export default Order;
