const express = require('express');

const { 
    addUser, 
    getUser, 
    updateUser, 
    deleteUser, 
    getUserByName, 
    getUserById, 
    logoutUser,
    loginUser,
    getUserByToken
} = require('../controllers/user.controller');

const router = express.Router();

router.post('/create', addUser);

router.post("/login",loginUser);

router.get("/logout",logoutUser);

router.get("/token", getUserByToken)

router.get("/get", getUser);

router.put("/:id", updateUser);

router.delete("/:id", deleteUser);

router.get('/name/:name', getUserByName);

router.get('/:id', getUserById);

module.exports = router;

