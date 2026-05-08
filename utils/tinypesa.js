const axios = require("axios");

const API_KEY = process.env.TINYPESA_API_KEY;

console.log("Loaded API KEY:", API_KEY);

async function stkPush(phone, amount) {

    try {

        const response = await axios({
            method: "POST",
            url: "https://api.tinypesa.com/api/v1/express/initialize/",
            headers: {
                "Content-Type": "application/json",
                "ApiKey": API_KEY
            },
            data: {
                amount: Number(amount),
                msisdn: phone,
                account_no: "BulkPay"
            }
        });

        return response.data;

    } catch (error) {

        return {
            error: true,
            details: error.response?.data || error.message
        };
    }
}

module.exports = { stkPush };
