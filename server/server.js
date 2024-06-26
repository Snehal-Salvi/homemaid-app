import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import connectDB from "./config/db.js";
import maidRoutes from "./routes/maidRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";
import { errorHandler, notFound } from "./middleware/errorMiddleware.js";
import passport from "./utils/passport.js";
import authRoutes from "./routes/authRoutes.js";

dotenv.config();

connectDB();

const PORT = process.env.PORT || 5000;

const app = express();

app.use((req, res, next) => {
  res.header(
    "Access-Control-Allow-Origin",
    "https://667bc483d506d3c28237e931--lucky-sunflower-c1d185.netlify.app"
  );
  next();
});

app.use(
  cors({
    origin: [
      "http://127.0.0.1:3000",
      "https://667bc483d506d3c28237e931--lucky-sunflower-c1d185.netlify.app",
    ],
    methods: "GET, POST, PATCH, DELETE, PUT",
    credentials: true,
  })
);

app.use(cookieParser());
passport(app);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send("Api is running....");
});

app.use("/api/maids", maidRoutes);
app.use("/api/users", userRoutes);
app.use("/auth", authRoutes);
app.use("/api/orders", orderRoutes);

app.use(notFound);
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server is runing on port ${PORT}`);
});
