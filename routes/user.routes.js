const express = require("express");
const UserModel = require("../models/user.model");
const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")
const userRoutes = express.Router();

userRoutes.post("/register", async (req, res) => {
    console.log(req.body);
    try {
        const { name, email, password, gender, age, city, is_married } = req.body;
        const user = await UserModel.findOne({ email });
        if (user) {
            res.status(200).send({ msg: "User already exist, please login" })
        } else {
            bcrypt.hash(password, 5, async (err, hashed) => {
                if (err) {
                    res.status(200).send({ msg: "User already exist, please login" })
                } else {
                    const newUser = new UserModel(req.body);
                    await newUser.save({ name, email, password: hashed, gender, age, city, is_married });
                    res.status(200).send({ msg: "new user added" });
                }
            })
        }
    } catch (e) {
        console.log(e);
        res.status(400).send({ err: e.message });
    }
})

userRoutes.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await UserModel.findOne({ email });
        console.log("login");
        if (user) {
            bcrypt.compare(password, user.password, (err, result) => {
                if (err) {
                    res.status(400).send({ msg: "invalid password" });
                } else {
                    res.status(200).send({ msg: "login success", token: jwt.sign({ "userID": user._id }, "secret") });
                }
            })
        } else {
            res.status(400).send({ msg: "no user found" });
        }
    } catch (e) {
        console.log(e);
        res.status(400).send({ err: e.message })
    }
})

module.exports = userRoutes;

