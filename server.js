import express from "express";
import mongoose from "mongoose";
import Cards from "./dbCards.js";
import Cors from "cors";

//App config
const app = express();
const port = process.env.PORT || 8001;
const connection_url = `mongodb+srv://admin:GTkRXrrUnv5s0tFz@cluster0.qtyxxtp.mongodb.net/?retryWrites=true&w=majority`;

//Middlewares
app.use(express.json());
app.use(Cors());

//DB config
mongoose.connect(connection_url, {
  useNewUrlParser: true,
  //createIndexes: true,
  useUnifiedTopology: true,
});

//API enpoints
app.get("/", (req, res) => res.status(200).send("Don't Give Up"));
app.post("/tinder/cards", (req, res) => {
  const dbCard = req.body;

  Cards.create(dbCard, (err, data) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(201).send(data);
    }
  });
});

app.get("/tinder/cards", async (req, res) => {
  try {
    await Cards.find(err, data);
    res.status(200).send(data);
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
});

//Listner
app.listen(port, () => console.log(`listening on localhost: ${port}`));
