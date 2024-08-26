const express = require('express');

const { 
    getTerms, 
    addTerm,
    updateTermByID,
    deleteTermById,
    getTermsByLetter,
    getTermsByTerm,
    getTermsByQuery, 

} = require('../controllers/dictionary.controller');

const router = express.Router();

router.get("/",getTerms)

router.post("/",addTerm)

router.put("/:id", updateTermByID)

router.delete("/:id",deleteTermById)

router.get("/letter/:letter", getTermsByLetter)

router.get("/term/:term", getTermsByTerm)

router.get("/search?:query", getTermsByQuery)

module.exports = router;