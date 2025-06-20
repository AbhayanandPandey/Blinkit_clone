import SubCategoryModel from '../model/subCategory.model.js';

export const AddSubCategory = async (req, res) => {
    try {
        const { name, image, category } = req.body;

        if (!name && !image && !category[0]) {
            return res.status(400).json(
                {
                    error: true,
                    success: false,
                    message: "All fields are required"
                });
        }

        const newSubCategory = new SubCategoryModel({
            name,
            image,
            category
        });

        const dataCat = await newSubCategory.save();

        return res.status(201).json(
            {
                success: true,
                error: false,
                message: "Sub-category added successfully",
                data: dataCat
            });
    } catch (error) {
        console.error("Error adding sub-category:", error);
        return res.status(500).json(
            {
                success: false,
                error: true,
                error: error.message || error
            });
    }
}