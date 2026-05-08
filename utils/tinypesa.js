const axios = require("axios");

const API_KEY = process.env.TINYPESA_LINK_API_KEY;
const USERNAME = process.env.TINYPESA_USERNAME;
const API_URL = process.env.TINYPESA_API_URL;

async function stkPush(phone, amount, transactionCode = "BulkPay") {

    try {

        // Normalize phone number
        let msisdn = phone
            .replace(/\s+/g, "")
            .replace(/[^0-9]/g, "");

        if (msisdn.startsWith("0")) {
            msisdn = "254" + msisdn.slice(1);
        } else if (msisdn.length === 9) {
            msisdn = "254" + msisdn;
        }

        const payload = {
            amount: Number(amount),
            msisdn: msisdn,
            account_no: transactionCode,
            callback_url: process.env.TINYPESA_WEBHOOK_URL
        };

        console.log("Using Username:", USERNAME);
        console.log("API Key Loaded:", !!API_KEY);

        const response = await axios({
            method: "POST",
            url: `${API_URL}/express/initialize/`,
            headers: {
                "ApiKey": API_KEY,
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            data: payload
        });

        return response.data;

    } catch (error) {

        console.log(
            "TinyPesa Error:",
            error.response?.data || error.message
        );

        return {
            error: true,
            details:
                error.response?.data ||
                error.message
        };
    }
}

module.exports = { stkPush };
