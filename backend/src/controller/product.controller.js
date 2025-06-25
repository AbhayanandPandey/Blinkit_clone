import ProductModel from "../model/product.model.js";

export const uploadProduct = async (req, res) => {
  try {
    const {
      name,
      category,
      subCategory,
      unit,
      stock,
      price,
      discount = 0, 
      description,
      more_details,
      images,
    } = req.body;

    if (
      !name ||
      !Array.isArray(category) || category.length === 0 ||
      !Array.isArray(subCategory) || subCategory.length === 0 ||
      !unit ||
      stock === undefined || stock === '' ||
      price === undefined || price === '' ||
      !description ||
      !Array.isArray(images) || images.length === 0
    ) {
      return res.status(400).json({
        error: true,
        success: false,
        message: "All fields are required",
      });
    }

    const newProduct = new ProductModel({
      name,
      image: images, 
      category,
      subCategory,
      unit,
      stock,
      price,
      discount,
      description,
      more_details,
    });

    await newProduct.save();

    res.status(201).json({
      success: true,
      message: "Product uploaded successfully",
      product: newProduct,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: error.message,
    });
  }
};
