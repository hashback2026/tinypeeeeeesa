const express = require("express");
const router = express.Router();
const { stkPush } = require("../utils/tinypesa");

router.post("/bulk-stk", async (req, res) => {
    const { numbers, amount } = req.body;

    if (!numbers || !amount) {
        return res.status(400).json({ error: "Numbers and amount required" });
    }

    const phoneList = numbers.split(",").map(n => n.trim());

    let results = [];

    for (let phone of phoneList) {
        const response = await stkPush(phone, amount);
        results.push({ phone, response });
    }

    res.json({
        message: "Bulk STK requests sent",
        results
    });
});

module.exports = router;
