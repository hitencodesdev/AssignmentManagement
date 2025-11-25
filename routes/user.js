const express = require("express");
const router = express.Router();

const {
    getUsers,
    createUser,
    deleteUser,
    editUser,
    updateUser,
    addUser
} = require("../controllers/users");

router.get("/create",addUser)
router.get("/list", getUsers);
router.post("/create", createUser);
router.get("/delete/:id", deleteUser);
router.get("/edit/:id", editUser);
router.post("/update/:id", updateUser);

module.exports = router;
