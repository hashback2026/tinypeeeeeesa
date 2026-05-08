const axios = require("axios");

const API_KEY = process.env.TINYPESA_API_KEY;

async function stkPush(phone, amount, reference = "BulkPay", description = "Payment") {
    try {
        const response = await axios.post(
            "https://tinypesa.com/api/v1/stkpush",
            {
                phone_number: phone,
                amount: amount,
                reference: reference,
                description: description,
                callback_url: process.env.TINYPESA_WEBHOOK_URL
            },
            {
                headers: {
                    Authorization: `Bearer ${API_KEY}`,
                    "Content-Type": "application/json"
                }
            }
        );

        return response.data;
    } catch (error) {
        return { error: true, details: error.response?.data || error.message };
    }
}

module.exports = { stkPush };
