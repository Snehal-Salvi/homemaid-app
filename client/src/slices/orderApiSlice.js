import { apiSlice } from "./apiSlice";
import { ORDERS_URL } from "../constants";

export const ordersApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createOrder: builder.mutation({
      query: (orderData) => ({
        url: `${ORDERS_URL}/create`,
        method: "POST",
        body: orderData,
      }),
    }),
    getOrdersByUserId: builder.query({
      query: (userId) => ({
        url: `${ORDERS_URL}/user/${userId}`,
      }),
    }),
  }),
});

export const { useCreateOrderMutation, useGetOrdersByUserIdQuery } = ordersApiSlice;
