
import Category from "../models/Category.js";
import Place from "../models/Place.js";


export const getCategories = async (query) => {
    try {
        console.log("im in the service");

        

        const categories = await Category.find();
            

        const total = await Category.countDocuments();

        return ({
            
            categories
        });
    } catch (error) {
        return ({ "message": error.message });
    }
}

export const getCategory = async (id) => {
    try {
        if (!id) {
            return { message: "Invalid category ID" };
        }

        const category = await Category.findOne({ _id: id });

        return category;
    } catch (error) {
        return { message: error.message };
    }
};

export const addCategory = async (categoryData) => {
    try {
        const category = new Category(categoryData);
        await category.save();
        return category;
    } catch (error) {
        throw new Error(error.message);
    }
};

export const editCategory = async (id, updatedData) => {
    try {
        console.log("im in service");

        const category = await Category.findById(id);
        if (!category) {
            return null; 
        }

        const places = await Place.find({ category: category.title });
        if (places.length > 0) {
            return null;
        }

        const updatedCategory = await Category.findByIdAndUpdate(id, updatedData, { new: true });
        console.log(updatedCategory, "from service");

        return updatedCategory;
    } catch (error) {
        throw new Error(error.message);
    }
};



export const removeCategory = async (id) => {
    try {
        const cat = await Category.findById(id);
        if (!cat) {
            return null;
        }

        const places = await Place.find({ category: cat.title });
        if (places.length > 0) {
            return null;
        }

        const deletedCategory = await Category.findByIdAndDelete(id);
        return deletedCategory;
    } catch (error) {
        throw new Error(error.message);
    }
};