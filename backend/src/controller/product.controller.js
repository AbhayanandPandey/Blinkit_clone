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

export const getAllProducts = async (req, res) => {
  try {
    let { page, limit, search } = req.body;

    // Ensure page and limit are numbers with defaults
    page = parseInt(page) || 1;
    limit = parseInt(limit) || 10;

    const skip = (page - 1) * limit;

    // Build search query using text index if `search` is provided
    const searchQuery = search
      ? {
          $text: {
            $search: search,
            $caseSensitive: false,
            $diacriticSensitive: false,
          },
        }
      : {};

    // Fetch products and total count concurrently
    const [products, totalCount] = await Promise.all([
      ProductModel.find(searchQuery)
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit),
      ProductModel.countDocuments(searchQuery),
    ]);

    res.status(200).json({
      success: true,
      message: 'Products retrieved successfully',
      error: false,
      data: products,
      totalCount,
      totalPages: Math.ceil(totalCount / limit),
      currentPage: page,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message || 'Internal server error',
      error: error.message,
    });
  }
};

