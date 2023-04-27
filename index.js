const express = require("express");
const bodyParser = require("body-parser");
const InitiateMongoServer = require("./config/db");
const user = require("./routes/user"); 
const shoppingList = require("./routes/shop"); 

InitiateMongoServer();

const app = express();

// PORT
const PORT = process.env.PORT || 3000;


// Middleware
app.use(bodyParser.json());


app.get("/", (req, res) => {
  res.json({ message: "API Working" });
});

app.use("/user", user);
app.use("/shop", shoppingList);

app.listen(PORT, (req, res) => {
  console.log(`Server Started at PORT ${PORT}`);
});