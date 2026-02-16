const axios = require("axios");

// Convert Ghana numbers to 233XXXXXXXXX format
function toGhanaIntl(phone) {
  if (!phone) return null;

  let p = String(phone).replace(/\D/g, ""); // remove non-digits

  // +233xxxxxxxxx -> 233xxxxxxxxx
  if (p.startsWith("233") && p.length === 12) return p;

  // 0xxxxxxxxx -> 233xxxxxxxxx
  if (p.startsWith("0") && p.length === 10) {
    return "233" + p.slice(1);
  }

  return null; // invalid number
}

async function sendSMS(phone, message) {
  const formattedNumber = toGhanaIntl(phone);

  if (!formattedNumber) {
    console.log("Invalid Ghana number:", phone);
    return { success: false, error: "Invalid phone number" };
  }

  try {
    const response = await axios.post(
      "https://smsc.hubtel.com/v1/messages/send",
      {
        from: process.env.HUBTEL_SENDER_ID,
        to: formattedNumber,
        content: message,
      },
      {
        auth: {
          username: process.env.HUBTEL_CLIENT_ID,
          password: process.env.HUBTEL_CLIENT_SECRET,
        },
      }
    );

    console.log("SMS Sent:", response.data);
    return { success: true };
  } catch (error) {
    console.log("SMS Error:", error.response?.data || error.message);
    return { success: false };
  }
}

module.exports = sendSMS;
