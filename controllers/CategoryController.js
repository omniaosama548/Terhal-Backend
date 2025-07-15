import { addCategory, editCategory, getCategories, getCategory, removeCategory } from "../services/categoryService.js";

export const getAllCategories = async (req, res) => {
    try {
        const userId = req.user.id;
        console.log("im in the controller");

        if (!userId) {
            throw new Error("access denied");
        }

        const categories = await getCategories(req.query);
        res.status(200).json(categories);
    } catch (error) {
        res.status(400).json({ error: error.message }); // Good format
    }
}

export const getCategoryById = async (req, res) => {
    try {
        const userId = req.user?.id;
        const categoryId = req.params.id;

        if (!userId) {
            return res.status(401).json({ message: "You need to login first" });
        }

        if (!categoryId) {
            return res.status(400).json({ message: "category ID is required" });
        }

        const category = await getCategory(categoryId);

        if (!category) {
            return res.status(404).json({ message: "category not found" });
        }

        res.status(200).json(category);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const createCategory = async (req, res) => {
    try {
        const userId = req.user?.id;
        if (!userId) {
            return res.status(401).json({ message: "You need to login first" });
        }

        const categoryData = req.body;
        const category = await addCategory({ ...categoryData, createdBy: userId }); // add createdBy if needed

        res.status(201).json(category);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export const updateCategory = async (req, res) => {
    try {
        const userId = req.user?.id;
        if (!userId) {
            return res.status(401).json({ message: "You need to login first" });
        }

        const categoryId = req.params.id;
        const updatedData = req.body;

        const updatedCategory = await editCategory(categoryId, updatedData);
        
        if (!updatedCategory) {
            return res.status(400).json({ message: "Category cannot be updated because it is linked to existing places or doesn't exist." });
        }

        res.status(200).json(updatedCategory);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};


export const deleteCategory = async (req, res) => {
    try {
        const userId = req.user?.id;
        if (!userId) {
            return res.status(401).json({ message: "You need to login first" });
        }

        const categoryId = req.params.id;

        const deletedCategory = await removeCategory(categoryId);

        if (!deletedCategory) {
            return res.status(400).json({ message: "Category cannot be deleted, it may not exist or is linked to places" });
        }

        res.status(200).json({ message: "Category deleted successfully", category: deletedCategory });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};
