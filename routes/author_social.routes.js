const express = require('express');

const { 
    getAs, 
    addAs, 
    updateAs, 
    deleteAs 
} = require('../controllers/author_social.controller');

const router = express.Router();

router.get("/", getAs);

router.post('/', addAs)

router.put("/:id", updateAs);

router.delete("/:id", deleteAs);

module.exports = router;

