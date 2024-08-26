const { errorHandler } = require("../helpers/error_handler");

const Category = require("../schemas/Category");

const { categoryValidation } = require("../validations/category.validation");

const addCategory = async(req,res)=>{
  
    try{

        const {error, value} = categoryValidation(req.body);

        if (error) return res.status(400).send({message:error.message});

        const {category_name,parent_category_id} = value;

        const category = await Category.findOne({category_name:{$regex:category_name,$options:"i"}})
        
        if (category) return res.status(400).send({message:"Category already exists..."})

        const newCategory = await Category.create({category_name,parent_category_id})

        res.status(201).send({message: "Category created successfully...",newCategory});

    }catch(error){

      errorHandler(res,error);  

    }

};

const getCategory = async(req, res)=>{
    try{

        res.send(await Category.find());

    }catch(error){

      errorHandler(res,error);  

    }
};

const updateCategoryByID = async (req, res) => {

    try {

      const {error, value} = categoryValidation(req.body);

      if (error) return res.status(400).send({message:error.message});

      const { id } = req.params;
      
      const {category_name} = value;

      console.log(category_name);

      const updateCategory = await Category.findByIdAndUpdate(

        id,

        { category_name },

        { new: true }

      );

      res.status(200).send({

        message: "Category updated successfully",

        data: updateCategory,

      });

    } catch (error) {

      errorHandler(res, error);

    }
};
  
const deleteCategoryByID = async (req, res) => {

    try {

      const { id } = req.params;

      const deletedCategory = await Category.findByIdAndDelete(id);

      res.send({

        message: "Category deleted successfully",

        data: deletedCategory,

      });
    } catch (error) {

      errorHandler(res, error);
    }
};

const getCategoryByID = async (req, res) => {
  
    try {
      
      const category = await Category.findById(req.params.id);
  
      if(!category) return res.status(400).send("Category not found");
  
      res.send(category);
  
    } catch (error) {
        
        errorHandler(res, error);
  
    }
};

module.exports = {
    addCategory,
    getCategory,
    updateCategoryByID,
    deleteCategoryByID,
    getCategoryByID,
};