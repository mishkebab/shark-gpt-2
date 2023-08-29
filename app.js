import express from "express";
import cors from "cors";
import generate from "./generate.js";
import score from "./score.js";
import fetch from "node-fetch";

// require('dotenv').config();

const app = express();

app.use(express.static('dist'));
app.use(express.json())
app.use(cors());

const port = process.env.PORT || 3005;

app.get("/", (req, res) => {
    res.sendFile(`${__dirname}/dist/index.html`)
});

app.post("/generate", async (req, res) => {
    const judge = req.body.judge
    const category = req.body.category
    const auto_pitch = req.body.auto_pitch
    const pitch = req.body.pitch

    try {
        const sqlQuery = await generate(judge, category, auto_pitch, pitch)
        res.json({ response: sqlQuery })
    } catch (error) {
        console.error(error)
        res.status(500).send("Oops Internal Server Error")
    }
})

app.post("/score", async (req, res) => {
    const judge = req.body.judge
    const category = req.body.category
    const auto_pitch = req.body.auto_pitch
    const pitch = req.body.pitch
    const tweet = req.body.tweet

    try {
        const sqlQuery = await score(judge, category, auto_pitch, pitch, tweet)
        res.json({ response: sqlQuery })
    } catch (error) {
        console.error(error)
        res.status(500).send("Oops Internal Server Error")
    }
})

app.listen(port, () => {
    console.log(`listening on port ${port}`)
})