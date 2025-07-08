const express = require("express");
const router = express.Router();
const { stkPush } = require("../controllers/mpesaController");

router.post("/stk", stkPush);

const Payment = require('../models/Payment');

router.post("/callback", async (req, res) => {
  try {
    const callback = req.body.Body.stkCallback;

    const paymentData = {
      phone: callback.CallbackMetadata?.Item.find(i => i.Name === "PhoneNumber")?.Value || "N/A",
      amount: callback.CallbackMetadata?.Item.find(i => i.Name === "Amount")?.Value || 0,
      mpesaRef: callback.CallbackMetadata?.Item.find(i => i.Name === "MpesaReceiptNumber")?.Value || "N/A",
      checkoutRequestID: callback.CheckoutRequestID,
      merchantRequestID: callback.MerchantRequestID,
      resultDesc: callback.ResultDesc,
      status: callback.ResultCode === 0 ? "Success" : "Failed"
    };

    await Payment.create(paymentData);

    console.log("✅ Mpesa payment saved:", paymentData);
    res.status(200).send("Payment received");

  } catch (err) {
    console.error("❌ Callback Error:", err.message);
    res.status(500).send("Callback processing failed");
  }
});
const Payment = require('../models/Payment');

router.get("/status/:checkoutId", async (req, res) => {
  try {
    const payment = await Payment.findOne({ checkoutRequestID: req.params.checkoutId });

    if (!payment) {
      return res.json({ status: "Pending" });
    }

    return res.json({ status: payment.status });

  } catch (err) {
    res.status(500).json({ message: "Error checking status" });
  }
});

router.post("/callback", (req, res) => {
  console.log("📲 Mpesa Callback:", req.body);
  res.status(200).send("Callback received");
});
if (statusData.status === "Success") {
  clearInterval(interval);
  window.location.href = "/thank-you.html"; // Create this file
}


module.exports = router;
