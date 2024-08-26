const express = require('express');

const { 
    getCategory, 
    addCategory, 
    updateCategoryByID,
    deleteCategoryByID, 
    getCategoryByID
} = require('../controllers/category.controller');

const router = express.Router();

router.get("/",getCategory)

router.get("/:id",getCategoryByID)

router.post("/",addCategory)

router.put("/:id", updateCategoryByID)

router.delete("/:id",deleteCategoryByID)


module.exports = router;