import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";
import productRoutes from "./routes/product.routes.js";
dotenv.config();

const app = express();

app.use(express.json());

//GET all products

app.use("/api/products", productRoutes);
app.listen(5000, () => {
  connectDB();
  console.log("server running on localhost:5000 hello");
});
