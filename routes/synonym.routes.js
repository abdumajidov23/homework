const express = require('express');

const { 
    addSynonym, 
    getSynonyms, 
    updateSynonym, 
    deleteSynonym, 
    getSynonymById 
} = require('../controllers/synonym.controller');

const router = express.Router();

router.post('/', addSynonym)

router.get("/", getSynonyms);

router.put("/:id", updateSynonym);

router.delete("/:id", deleteSynonym);

router.get('/:id', getSynonymById);

module.exports = router;

