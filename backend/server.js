import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";
import productRoutes from "./routes/product.routes.js";
import path from "path";
import { fileURLToPath } from "url";
dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, "..");

const app = express();
app.use(express.json());
app.use("/api/products", productRoutes);

if (process.env.NODE_ENV === "production") {
  const staticDir = path.join(rootDir, "frontend", "online", "dist");
  app.use(express.static(staticDir));
  app.use((req, res, next) => {
    if (req.url.startsWith("/api/")) {
      return next();
    }
    res.sendFile(path.join(staticDir, "index.html"));
  });
}

app.listen(5000, () => {
  connectDB();
  console.log("server running on localhost:5000 hello");
});
