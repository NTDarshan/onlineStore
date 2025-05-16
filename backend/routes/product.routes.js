import express from "express";
import {
  CreateProduct,
  DeleteProduct,
  GetAllProduct,
  UpdateProduct,
} from "../controller/product.controller.js";
const router = express.Router();

//Get all product
router.get("/getAllProducts", GetAllProduct);
//update product
router.put("/updateProduct/:pid", UpdateProduct);
//create update
router.post("/createProduct", CreateProduct);
//delete product
router.delete("/deleteProduct/:pid", DeleteProduct);

export default router;
