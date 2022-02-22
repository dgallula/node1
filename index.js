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

const findCoffeeByCode = (id) => {
  return allCoffesDataArray.find((coffee) => coffee.id ===id);
  };

allCoffesDataArray = readData();

app.get(`${generalSettings.baseUrl}/coffee`, (req, res) => {
  res.send(JSON.stringify(allCoffesDataArray));
});

app.get(`${generalSettings.baseUrl}/coffee/:code`, (req, res) => {
  const id = +req.params.id;
  const requestedCoffee = findCoffeeByCode(id);
  res.send(JSON.stringify(requestedCoffee));
});

app.post(`${generalSettings.baseUrl}/coffee`, (req, res) => {
  writeData(req.body);
  res.send("works");
});

app.listen(5000);
console.log("server is running on port 5000 localhost!");