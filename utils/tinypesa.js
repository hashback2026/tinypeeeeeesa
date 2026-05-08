const axios = require("axios");

const API_KEY = process.env.TINYPESA_LINK_API_KEY;
const USERNAME = process.env.TINYPESA_USERNAME;
const CALLBACK_URL = process.env.TINYPESA_WEBHOOK_URL;

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

        const url =
            `https://api.tinypesa.com/api/v1/express/initialize/?username=${USERNAME}`;

        const payload = {
            amount: Number(amount),
            msisdn,
            account_no: transactionCode,
            callback_url: CALLBACK_URL
        };

        const response = await axios({
            method: "POST",
            url,
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
                "Apikey": API_KEY
            },
            data: payload
        });

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
