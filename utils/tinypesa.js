const axios = require("axios");

const API_KEY = process.env.TINYPESA_API_KEY;

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

        const response = await axios.post(
            "https://api.tinypesa.com/api/v1/express/initialize",
            payload,
            {
                headers: {
                    "ApiKey": API_KEY,
                    "Content-Type": "application/json"
                }
            }
        );

        return response.data;

    } catch (error) {

        return {
            error: true,
            details:
                error.response?.data ||
                error.message
        };
    }
}

module.exports = { stkPush };
