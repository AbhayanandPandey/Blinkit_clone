import CategoryModel from '../model/category.model.js';

export const AddCategory = async (req, res) => {
    try {
        const { name, image } = req.body;

        if (!name || !image) {
            return res.status(400).json({
                error: true,
                message: 'Name and image are required',
                success: false
            });
        }

        const newCategory = new CategoryModel({ name, image });
        const saveCategory = await newCategory.save();

        if(!saveCategory) {
            return res.status(500).json({
                error: true,
                message: 'Failed to add category',
                success: false
            });
        }

        return res.status(201).json({
            error: false,
            message: 'Category added successfully',
            success: true,
            data: saveCategory
        });

    } catch (error) {
        return res.status(500).json({
            error: true,
            message: error.message || 'Internal server error',
            success: false
        })
    }
}