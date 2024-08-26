const express = require('express');

const { 
    getDescTopic, 
    addDescTopic, 
    updateDescTopic, 
    deleteDescTopic 
} = require('../controllers/desc_topic.controller');

const router = express.Router();

router.get("/", getDescTopic);

router.post('/', addDescTopic)

router.put("/:id", updateDescTopic);

router.delete("/:id", deleteDescTopic);

module.exports = router;

