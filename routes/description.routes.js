const express = require('express');

const { 
    addDescription, 
    getDescriptions, 
    updateDescription, 
    deleteDescription, 
    getDescriptionById 
} = require('../controllers/description.controller');

const router = express.Router();

router.get("/", getDescriptions);

router.post('/', addDescription)

router.put("/:id", updateDescription);

router.delete("/:id", deleteDescription);

router.get('/:id', getDescriptionById);

module.exports = router;

