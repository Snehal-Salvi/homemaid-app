import React from "react";
import ReactDOM from "react-dom/client";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "./index.css";
import App from "./App";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import MaidScreen from "./screens/Maids/MaidScreen.js";
import MaidDetailsScreen from "./screens/Maids/MaidDetailsScreen.js";
import { Provider } from "react-redux";
import store from "./store.js";
 
import ResetPassword from "./screens/Login/ResetPassword.js";
import HomeScreen from "./screens/Home/HomeScreen.js";
import AboutScreen from "./screens/About/AboutScreen.js";
import BlogScreen from "./screens/Blog/BlogScreen.js";
import ContactScreen from "./screens/Contact/ContactScreen.js";
import RegisterScreen from "./screens/Register/RegisterScreen.js";
import MyOrders from "./screens/MyOrders/MyOrders.js";
import ErrorPage from "./components/Error/ErrorPage.js";


const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      
      <Route index={true} path="/" element={<HomeScreen />} />
      <Route path="/maids" element={<MaidScreen />} />
      <Route path="/about" element={<AboutScreen />} />
      <Route path="/blogs" element={<BlogScreen />} />
      <Route path="/contact" element={<ContactScreen />} />
      <Route path="/maid/:id" element={<MaidDetailsScreen />} />
      <Route path="/register" element={<RegisterScreen />} />
      <Route path="/reset-password/:resetToken" element={<ResetPassword />} />
      <Route path="/myorders" element={<MyOrders />} />
      <Route path="*" element={<ErrorPage />} />
    </Route>
  )
);

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>
);
