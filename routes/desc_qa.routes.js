const express = require('express');

const { 
    getDescQa, 
    addDescQa, 
    updateDescQa, 
    deleteDescQa 
} = require('../controllers/desc_qa.controller');

const router = express.Router();

router.get("/", getDescQa);

router.post('/', addDescQa)

router.put("/:id", updateDescQa);

router.delete("/:id", deleteDescQa);

module.exports = router;

