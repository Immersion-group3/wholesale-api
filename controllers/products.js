import { ProductModel } from "../models/product.js";

export const addProductCatalogue = async (req, res, next) => {
  try {
    const product = new ProductModel(req.body);
    const savedProduct = await product.save();
    res.status(201).json(savedProduct);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const getAllCatalogProducts = async (req, res) => {
  try {
    const products = await ProductModel.find();
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getCatalogProductById = async (req, res) => {
  try {
    const product = await ProductModel.findById(req.params.id);
    if (!product) return res.status(404).json({ message: "Product not found" });
    res.json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateCatalogProductById = async (req, res) => {
  try {
    const updatedProduct = await ProductModel.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedProduct)
      return res.status(404).json({ message: "Product not found" });
    res.json(updatedProduct);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const deleteCatalogProductById = async (req, res) => {
  try {
    const deletedProduct = await ProductModel.findByIdAndDelete(req.params.id);
    if (!deletedProduct)
      return res.status(404).json({ message: "Product not found" });
    res.json({ message: "Product deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
export const filterProducts = async (req, res) => {
  try {
    const filters = {};
    if (req.query.category) filters.category = req.query.category;
    if (req.query.isOrganic) filters.isOrganic = req.query.isOrganic;

    const products = await ProductModel.find(filters);
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const paginateProducts = async (req, res) => {
  const { page = 1, limit = 10 } = req.query;
  try {
    const products = await ProductModel.find()
      .limit(limit * 1)
      .skip((page - 1) * limit);
    const count = await ProductModel.countDocuments();
    res.json({
      products,
      totalPages: Math.ceil(count / limit),
      currentPage: page,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const searchProducts = async (req, res) => {
  const { search } = req.query;
  try {
    const products = await ProductModel.find({
      name: { $regex: search, $options: "i" },
    });
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
    // const {availability, category};
    //const {filters};
    // filter by availability specific

    if (availability) {
      filters.availability = availability === "true"; // Convert to Boolean
    }
    // Filter by category if specified
    if (category) {
      filters.category = category;
    }

    try {
      const products = await ProductModel.find(filters);
      res.json(products);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
};
