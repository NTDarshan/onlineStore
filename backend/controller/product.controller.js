import mongoose from "mongoose";
import Product from "../models/product.model.js";

//get all products api
export const GetAllProduct = async (req, res) => {
  try {
    const products = await Product.find({});
    res.status(200).json({ status: true, data: products });
  } catch (error) {
    res.status(404).json({ status: true, message: "Products not found!" });
  }
};

//updating productuct api
export const UpdateProduct = async (req, res) => {
  const { pid } = req.params;
  const product = req.body;
  if (!mongoose.Types.ObjectId.isValid(pid)) {
    return res.status(400).json({ success: false, message: "Invalid ID" });
  }
  try {
    const updatedProduct = await Product.findByIdAndUpdate(pid, product, {
      new: true,
    });
    res.status(200).json({
      success: true,
      message: "Updated successfully!",
      data: updatedProduct,
    });
  } catch (error) {
    res.status(400).json({ success: false, message: "Updated failed!" });
  }
};

//delete product api
export const DeleteProduct = async (req, res) => {
  const { id } = req.params;

  try {
    await Product.findByIdAndDelete(id);
    res.status(200).json({ success: true, message: "Product deleted" });
  } catch (error) {
    res.status(404).json({ success: false, message: "Product ID not found" });
  }
};

//create product api
export const CreateProduct = (req, res) => {
  const product = req.body;

  if (!product.name || !product.price || !product.image) {
    return res
      .status(400)
      .json({ success: false, message: "please provide all the fields!" });
  }

  const newProduct = new Product(product);

  try {
    newProduct.save();
    res.status(201).json({ success: true, data: newProduct });
  } catch (err) {
    console.log("Error in saving product");
    res
      .status(500)
      .json({ success: false, message: "Error in saving product" });
  }
};
