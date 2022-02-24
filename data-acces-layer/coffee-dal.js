import * as fs from "fs";

let coffeeList = [];
const getData = () => {
  const data = fs.readFileSync("store/db.json");
  coffeeList = JSON.parse(data.toString());
  return coffeeList;
};

const addCoffee = (newCoffeeObj) => {
  coffeeList.push(newCoffeeObj);
  fs.writeFileSync("store/db.json", JSON.stringify(coffeeList));
};

const updateData = (newDataArray) => {
  fs.writeFileSync("store/db.json", JSON.stringify(newDataArray));
};

export default {
  getData,
  addCoffee,
  updateData,
};