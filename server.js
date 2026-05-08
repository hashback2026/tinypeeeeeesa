require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const stkRoutes = require("./routes/stk");

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.use("/api", stkRoutes);

app.post("/api/webhook", (req, res) => {
    console.log("Webhook received:", req.body);
    res.json({ message: "Webhook received successfully" });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
