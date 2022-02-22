import * as fs from "fs";
import express from "express";
import generalSettings from "./config.js";

const app = express();
let allCoffesDataArray = [];
app.use(express.json());

const readData = () => {
  const data = fs.readFileSync("store/db.json");
  return JSON.parse(data.toString());
};
const writeData = (newCoffee) => {
  allCoffesDataArray.push(newCoffee);
  fs.writeFileSync("store/db.json", JSON.stringify(allCoffesDataArray));
};

const findCoffeeByCode = (code) => {
  return allCoffesDataArray.find((coffee) => coffee.code === code);
};

allCoffesDataArray = readData();

app.get(`${generalSettings.baseUrl}/coffee`, (req, res) => {
  res.send(JSON.stringify(allCoffesDataArray));
});

app.get(`${generalSettings.baseUrl}/coffee/:code`, (req, res) => {
  const code = +req.params.code;
  const requestedCoffee = findCoffeeByCode(code);
  res.send(JSON.stringify(requestedCoffee));
});

app.post(`${generalSettings.baseUrl}/coffee`, (req, res) => {
  writeData(req.body);
  res.send("works");
});

app.listen(5000);
console.log("server is running on port 5000 localhost!");