const express = require("express");
const PostModel = require("../models/post.models");
const postRoutes = express.Router();
const jwt = require("jsonwebtoken")

postRoutes.get("/", async (req, res) => {
    try {
        const token = req.headers.authorization;
        const decoded = jwt.verify(token, "secret");
        if (decoded) {
            const userID = decoded.userID;
            console.log(decoded.userID);
            const posts = await PostModel.find({ "userID": userID });
            res.status(200).send(posts);
        } else {
            res.status(400).send({ msg: "Please login first" });
        }
    } catch (e) {
        console.log(e);
        res.status(400).send({ err: e.message });
    }
})

postRoutes.post("/add", (req, res) => {
    try {
        const post = new PostModel(req.body);
        post.save();
        res.status(200).send({ msg: "new post added" });
    } catch (e) {
        console.log(e);
        res.status(400).send({ err: e.message });
    }
})

postRoutes.patch("/update/:id", async (req, res) => {
    try {
        const { id } = req.params;
        await PostModel.findByIdAndUpdate({ _id: id }, req.body)
        res.status(200).send({ msg: "post updated" });
    } catch (e) {
        console.log(e);
        res.status(400).send({ err: e.message })
    }
})

postRoutes.delete("/delete/:id", async (req, res) => {
    try {
        const { id } = req.params;
        await PostModel.findByIdAndDelete({ _id: id })
        res.status(200).send({ msg: "post updated" });
    } catch (e) {
        console.log(e);
        res.status(400).send({ err: e.message })
    }
})

module.exports = postRoutes;
