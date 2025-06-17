import CategoryModel from '../model/category.model';

const AddCategory = async (req, res) => {
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
        await newCategory.save();

        return res.status(201).json({
            error: false,
            message: 'Category added successfully',
            success: true,
            data: newCategory
        });

    } catch (error) {
        return res.status(500).json({
            error: true,
            message: error.message || 'Internal server error',
            success: false
        })
    }
}