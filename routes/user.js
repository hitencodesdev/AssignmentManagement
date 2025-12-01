const express = require("express");
const router = express.Router();
const auth=require('../middleware/auth')
const {
    getUsers,
    createUser,
    deleteUser,
    editUser,
    updateUser,
    addUser
} = require("../controllers/users");

router.get("/create",auth(),addUser)
router.get("/list",auth(),getUsers);
router.post("/create",auth(),createUser);
router.get("/delete/:id",auth(),deleteUser);
router.get("/edit/:id",auth(),editUser);
router.post("/update/:id",auth(),updateUser);

module.exports = router;
