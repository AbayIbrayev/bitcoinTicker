const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

app.post("/", (req, res) => {
  // console.log(req.body.crypto);

  let crypto = req.body.crypto;
  let fiat = req.body.fiat;
  let amount = req.body.amount;

  console.log(crypto);
  console.log(fiat);

  let options = {
    url: "https://apiv2.bitcoinaverage.com/convert/global",
    method: "GET",
    qs: {
      from: crypto,
      to: fiat,
      amount: amount
    },
    headers: { "X-testing": "testing" }
  };

  request(options, function(error, response, body) {
    let data = JSON.parse(body);
    let price = data.price;

    let currentDate = data.time;

    console.log(price);

    res.write(`<p>The current date is ${currentDate}</p>`);

    res.write(
      `<h1>The current price of ${amount} ${crypto} is ${price} ${fiat}</h1>`
    );

    res.send();
  });
});

app.listen(3000, function() {
  console.log("Server is running on port 3000.");
});
