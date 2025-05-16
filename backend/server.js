import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";
import productRoutes from "./routes/product.routes.js";
import path from "path";
dotenv.config();

const app = express();
const __dirname = path.resolve();
app.use(express.json());

//GET all products

app.use("/api/products", productRoutes);
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "/frontend/online/dist")));
  app.get("*", (req, res) =>
    res.sendFile(
      path.resolve(__dirname, "frontend", "online", "build", "index.html")
    )
  );
}
app.listen(5000, () => {
  connectDB();
  console.log("server running on localhost:5000 hello");
});
