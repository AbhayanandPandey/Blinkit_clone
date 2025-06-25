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
      discount,
      description,
      more_details,
      images, // Expecting images key from frontend
    } = req.body;

    // Validation
    if (
      !name ||
      !Array.isArray(category) || !category.length ||
      !Array.isArray(subCategory) || !subCategory.length ||
      !unit ||
      stock === undefined || stock === '' ||
      price === undefined || price === '' ||
      discount === undefined || discount === '' ||
      !description ||
      !Array.isArray(images) || !images.length
    ) {
      return res.status(400).json({
        error: true,
        success: false,
        message: "All fields are required",
      });
    }

    const newProduct = new ProductModel({
      name,
      image: images, // saved to image field
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
