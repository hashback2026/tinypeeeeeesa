const axios = require("axios");

const API_KEY = process.env.TINYPESA_API_KEY;

async function stkPush(phone, amount) {
    try {
        const response = await axios.post(
            "https://api.tinypesa.com/api/v1/express/initialize",
            {
                amount: amount,
                msisdn: phone,
                account_no: "BulkPay"
            },
            {
                headers: {
                    ApiKey: API_KEY,
                    "Content-Type": "application/json"
                }
            }
        );

        return response.data;

    } catch (error) {
        return {
            error: true,
            details: error.response?.data || error.message
        };
    }
}

module.exports = { stkPush };
