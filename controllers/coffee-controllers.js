import express from "express";
import coffeeBl from "../business-logic/coffee-bl.js";
import generalSettings from "../config.js";

const router = express.Router();

router.get(`${generalSettings.baseUrl}/coffe`, (req, res) => {
  try {
    const result = coffeeBl.getAllCoffeeData();
    res.send(result);
  } catch (error) {
    res.status(500).send("Something got worng!");
  }
});

router.get(`${generalSettings.baseUrl}/coffee/:code`, (req, res) => {
  const code = +req.params.code;
  const resultCoffeeByCode = coffeeBl.getByCode(code);
  if (!resultCoffeeByCode) {
    res.status(404).send(`Sorry, the reqesred coffee not found`);
  }
  res.send(resultCoffeeByCode);
});

router.put(`${generalSettings.baseUrl}/coffee/:code`, (req, res) => {
  const code = +req.params.code;
  const resultCoffee = coffeeBl.update(code, req.body);

  resultCoffee.status
    ? res.status(resultCoffee.status).send(resultCoffee.message)
    : res.send(resultCoffee);
});

router.post(`${generalSettings.baseUrl}/coffee`, (req, res) => {
  const result = coffeeBl.addNewCoffee(req.body);
  result.status
    ? res.status(result.status).send(result.message)
    : res.send(result);
});

router.get(`*`, (req, res) => {
  res
    .status(404)
    .send(`Sorry we couldn't find what you looking for, please try `);
});
router.post(`*`, (req, res) => {
  res
    .status(404)
    .send(`Sorry we couldn't find what you looking for, please try `);
});
export { router };