const express = require('express');

const { 
    getQA, 
    addQA, 
    updateQA, 
    deleteQA 
} = require('../controllers/question_answer.controller');

const router = express.Router();

router.get("/", getQA);

router.post('/', addQA)

router.put("/:id", updateQA);

router.delete("/:id", deleteQA);

module.exports = router;

