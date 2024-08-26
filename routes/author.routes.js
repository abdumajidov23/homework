const express = require('express');

const { 
    addAuthor, 
    getAuthors, 
    updateAuthor, 
    deleteAuthor, 
    getAuthorByName, 
    getAuthorById, 
    loginAuthor,
    logoutAuthor,
    getAuthorByToken
} = require('../controllers/author.controller');

const router = express.Router();

router.post('/', addAuthor)

router.post("/login",loginAuthor);

router.get("/logout",logoutAuthor);

router.get("/token", getAuthorByToken)

router.get("/", getAuthors);

router.put("/:id", updateAuthor);

router.delete("/:id", deleteAuthor);

router.get('/name/:name', getAuthorByName);

router.get('/:id', getAuthorById);

module.exports = router;

