import CategoryModel from '../model/category.model.js';

export const AddCategory = async (req, res) => {
  try {
    const { name, image } = req.body;

    if (!name || !image) {
      return res.status(400).json({
        error: true,
        message: 'Name and image are required',
        success: false,
      });
    }

    const existingCategory = await CategoryModel.findOne({ name: { $regex: new RegExp(`^${name}$`, 'i') } });

    if (existingCategory) {
      return res.status(409).json({
        error: true,
        message: 'Category with this name already exists',
        success: false,
      });
    }
    
    const newCategory = new CategoryModel({ name, image });
    const saveCategory = await newCategory.save();

    if (!saveCategory) {
      return res.status(500).json({
        error: true,
        message: 'Failed to add category',
        success: false,
      });
    }

    return res.status(201).json({
      error: false,
      message: 'Category added successfully',
      success: true,
      data: saveCategory,
    });

  } catch (error) {
    return res.status(500).json({
      error: true,
      message: error.message || 'Internal server error',
      success: false,
    });
  }
};

export const GetAllCategories = async (req, res) => {
    try {
        const categories = await CategoryModel.find({});

        if (!categories || categories.length === 0) {
            return res.status(404).json({
                error: true,
                message: 'No categories found',
                success: false
            });
        }

        return res.status(200).json({
            error: false,
            message: 'Categories retrieved successfully',
            success: true,
            data: categories
        });

    } catch (error) {
        return res.status(500).json({
            error: true,
            message: error.message || 'Internal server error',
            success: false
        });
    }
}

export const UpdateCategory = async (req, res) => {
  try {
    const { id, name, image } = req.body;

    if(!id){
      return res.status(400).json({
        error: true,
        message: 'Invalid user!',
        success: false,
      });
    }
    if (!name || !image) {
      return res.status(400).json({
        error: true,
        message: 'Name and image are required',
        success: false,
      });
    }

    const updatedCategory = await CategoryModel.updateOne(
      { _id: id },
      { name, image },
      { new: true }
    );

    if (!updatedCategory) {
      return res.status(404).json({
        error: true,
        message: 'Category not found',
        success: false,
      });
    }

    return res.status(200).json({
      error: false,
      message: 'Category updated successfully',
      success: true,
      data: updatedCategory,
    });

  } catch (error) {
    return res.status(500).json({
      error: true,
      message: error.message || erroe,
      success: false,
    });
  }
};