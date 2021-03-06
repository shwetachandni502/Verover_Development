require("dotenv").config();

module.exports = {
  mongoURI: "mongodb://localhost:27017/test",
  apiURL: "http://ec2-54-226-102-227.compute-1.amazonaws.com/",
  FAST2SMS: process.env.FAST2SMS,
  secretOrKey: process.env.SECRET_OR_KEY,
  nodeENV: process.env.NODE_ENV,
  stripeSecretKey: process.env.STRIPE_SECRET_KEY,
  clientPath: process.env.CLIENT_PATH,
  senderEmail: process.env.SENDER_EMAIL,
  senderPassword: process.env.SENDER_PASS,
  senderHost: process.env.SENDER_HOST,
  senderUsername: process.env.SENDER_USERNAME,
};
