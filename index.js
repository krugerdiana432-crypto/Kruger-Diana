require("dotenv").config();
const express = require("express");
const { MessagingResponse } = require("twilio").twiml;
const config = require("./config");
const db = require("./db.json");

const app = express();
app.use(express.urlencoded({ extended: false }));

app.post("/whatsapp", (req, res) => {
  const msg = (req.body.Body || "").toLowerCase();
  const twiml = new MessagingResponse();

  if (msg.includes("salut")) {
    twiml.message(`Salut 😎 Je suis ${config.botName}`);
  } 
  else if (msg.includes("aide")) {
    twiml.message("Commandes : Salut, Info, Prix, Merci, Fun");
  } 
  else if (msg.includes("prix")) {
    twiml.message(`💰 Prix : ${db.prix}`);
  } 
  else if (msg.includes("info")) {
    twiml.message(config.description);
  } 
  else if (msg.includes("merci")) {
    twiml.message("Avec plaisir 😘");
  } 
  else if (msg.includes("fun")) {
    twiml.message("🔥 Kruger Diana Bot dit : Reste cool !");
  } 
  else {
    twiml.message("😅 Je n'ai pas compris. Tape 'Aide'.");
  }

  res.type("text/xml").send(twiml.toString());
});

app.listen(config.port, () => {
  console.log(`${config.botName} en ligne 🚀`);
});