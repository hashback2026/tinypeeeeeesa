const axios = require("axios");

const API_KEY = process.env.TINYPESA_API_KEY;

async function stkPush(phone, amount, transactionCode = "BulkPay") {

    try {

        // Normalize phone
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
            msisdn,
            account_no: transactionCode,
            callback_url: process.env.TINYPESA_WEBHOOK_URL
        };

        console.log("Sending payload:", payload);

        const response = await axios({
            method: "post",
            url: "https://api.tinypesa.com/api/v1/express/initialize/",
            headers: {
                "ApiKey": API_KEY,
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            data: payload,
            maxRedirects: 0
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
