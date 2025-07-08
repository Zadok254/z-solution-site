const axios = require('axios');
const moment = require('moment');

const mpesaAuth = async () => {
  const consumerKey = process.env.MPESA_CONSUMER_KEY;
  const consumerSecret = process.env.MPESA_CONSUMER_SECRET;
  const url = 'https://sandbox.safaricom.co.ke/oauth/v1/generate?grant_type=client_credentials';

  const buffer = Buffer.from(`${consumerKey}:${consumerSecret}`);
  const auth = `Basic ${buffer.toString('base64')}`;

  const { data } = await axios.get(url, {
    headers: {
      Authorization: auth
    }
  });

  return data.access_token;
};

exports.stkPush = async (req, res) => {
  try {
    const { phone, amount } = req.body;
    const access_token = await mpesaAuth();

    const timestamp = moment().format('YYYYMMDDHHmmss');
    const shortcode = process.env.MPESA_SHORTCODE;
    const passkey = process.env.MPESA_PASSKEY;

    const password = Buffer.from(`${shortcode}${passkey}${timestamp}`).toString('base64');

    const payload = {
      BusinessShortCode: shortcode,
      Password: password,
      Timestamp: timestamp,
      TransactionType: "CustomerPayBillOnline",
      Amount: amount,
      PartyA: phone,
      PartyB: shortcode,
      PhoneNumber: phone,
      CallBackURL: `${process.env.BASE_URL}/api/mpesa/callback`,
      AccountReference: "Z Solutions",
      TransactionDesc: "Z Solutions Checkout"
    };

    const response = await axios.post(
      'https://sandbox.safaricom.co.ke/mpesa/stkpush/v1/processrequest',
      payload,
      {
        headers: {
          Authorization: `Bearer ${access_token}`
        }
      }
    );

    res.json({
      message: "STK Push initiated",
      data: response.data
    });
    res.json({
  message: "STK Push initiated",
  checkoutRequestID: response.data.CheckoutRequestID,
  merchantRequestID: response.data.MerchantRequestID
});


  } catch (err) {
    console.error("Mpesa Error:", err.message);
    res.status(500).json({ message: "Mpesa error", error: err.message });
  }
};
