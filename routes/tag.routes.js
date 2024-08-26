const express = require('express');

const { 
    getTag, 
    addTag, 
    updateTag, 
    deleteTag 
} = require('../controllers/tag.controller');

const router = express.Router();

router.get("/", getTag);

router.post('/', addTag)

router.put("/:id", updateTag);

router.delete("/:id", deleteTag);

module.exports = router;

