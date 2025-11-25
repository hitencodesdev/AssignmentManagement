const admin = require("../models/Admin");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const key = "&$^@&#*!";

exports.registerAdmin = async (req, res) => {
    try {
        let {name,email, password } = req.body;
        const hashPassword = await bcrypt.hash(password, 10);
        await admin.create({ name,email, password: hashPassword });
        res.redirect("/auth/login");
    } catch (error) {
        res.send(error);
    }
};
