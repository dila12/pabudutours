const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const sendBookingEmail = require("./api/send-booking-email");
const sendContactEmail = require("./api/send-contact-email");

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.post("/api/send-booking-email", sendBookingEmail);
app.post("/send-booking-email", sendBookingEmail);
app.post("/api/send-contact-email", sendContactEmail);
app.post("/send-contact-email", sendContactEmail);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
