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
    page = parseInt(page) || 1;
    limit = parseInt(limit) || 10;

    const skip = (page - 1) * limit;

    const searchQuery = search
      ? {
        name: { $regex: search, $options: 'i' },
      }
      : {};

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

export const deleteProduct = async (req, res) => {
  try {
    const { productId } = req.body;

    if (!productId) {
      return res.status(400).json({
        success: false,
        message: "Product ID is required",
      });
    }

    const deletedProduct = await ProductModel.findByIdAndDelete(productId);

    if (!deletedProduct) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Product deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: error.message,
    });
  }
}

export const updateProduct = async (req, res) => {
  try {
    const { productId, category, subCategory, ...rest } = req.body;

    if (!productId) {
      return res.status(400).json({ success: false, message: 'Product ID is required' });
    }

    const updateData = { ...rest };

    if (Array.isArray(category)) {
      updateData.category = category;
    } else if (typeof category === 'string') {
      updateData.category = [category];
    } else if (category === null || category === '') {
      updateData.category = [];
    }

    if (Array.isArray(subCategory)) {
      updateData.subCategory = subCategory;
    } else if (typeof subCategory === 'string') {
      updateData.subCategory = [subCategory];
    } else if (subCategory === null || subCategory === '') {
      updateData.subCategory = [];
    }

    const updatedProduct = await ProductModel.findByIdAndUpdate(
      productId,
      updateData,
      { new: true }
    );

    if (!updatedProduct) {
      return res.status(404).json({ success: false, message: 'Product not found' });
    }

    res.status(200).json({
      success: true,
      message: 'Product updated successfully',
      product: updatedProduct,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Internal Server Error',
      error: error.message,
    });
  }
};

export const getAllProductsByCategory = async (req, res) => {
  try {
    const { id } = req.body

    if (!id) {
      return res.status(400).json({
        error: true,
        success: false,
        message: "Category ID is required",
      });
    }
    const products = await ProductModel.find({ category: { $in: id } }).limit(15)


    res.status(200).json({
      error: false,
      success: true,
      message: "Products retrieved successfully",
      data: products,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message || error,
      error: true,
    });
  }
}

export const getProductByCategoryAndSubCategory = async (req, res) => {
  try {
    let { categoryId, subCategoryId, page, limit } = req.body;

    page = parseInt(page) || 1;
    limit = parseInt(limit) || 10;

    if (!categoryId) {
      const firstCategory = await CategoryModel.findOne().sort({ createdAt: 1 });
      if (!firstCategory) {
        return res.status(404).json({
          error: true,
          success: false,
          message: "No categories found",
        });
      }
      categoryId = [firstCategory._id];
    }

    if (!subCategoryId) {
      const firstSubCategory = await SubCategoryModel.findOne().sort({ createdAt: -1 });
      if (!firstSubCategory) {
        return res.status(404).json({
          error: true,
          success: false,
          message: "No subcategories found",
        });
      }
      subCategoryId = [firstSubCategory._id];
    }

    const searchQuery = {
      category: { $in: categoryId },
      subCategory: { $in: subCategoryId },
    };

    const skip = (page - 1) * limit;

    const [data, totalCount] = await Promise.all([
      ProductModel.find(searchQuery).sort({ createdAt: -1 }).limit(limit).skip(skip),
      ProductModel.countDocuments(searchQuery),
    ]);

    res.status(200).json({
      error: false,
      success: true,
      message: "Products retrieved successfully",
      data: data,
      totalCount: totalCount,
      totalPages: Math.ceil(totalCount / limit),
      limit: limit,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message || error,
      error: true,
    });
  }
};

export const getProductDetails = async (req, res) => {
  try {
    const { productId } = req.body;
    if (!productId) {
      return res.status(400).json({
        error: true,
        success: false,
        message: "Product ID is required",
      });
    }

    const product = await ProductModel.findOne({_id: productId });

    if (!product) {
      return res.status(404).json({
        error: true,
        success: false,
        message: "Product not found",
      });
    }
    res.status(200).json({
      error: false,
      success: true,
      message: "Product details retrieved successfully",
      data: product,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message || error,
      error: true,
    });
  } 
};