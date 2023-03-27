const express = require("express");
const cors = require("cors");
const conection = require("./db");
const userRoutes = require("./routes/user.routes")
const postRoutes = require("./routes/post.routes");
const auth = require("./middleware/auth.middleware");

require("dotenv").config();
const app = express();

app.use(express.json());
app.use(cors());
app.use("/users", userRoutes);
app.use(auth);
app.use("/posts", postRoutes);

app.listen(process.env.port, async (req, res) => {
    try {
        await conection;
        console.log("conected to DB");
    } catch (e) {
        console.log(e);
        res.status(400).send({ err: e.message });
    }
})
