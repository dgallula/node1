import express from "express";
import coffeeBl from "../business-logic/coffe-bl.js"
import generalSettings from "../config.js";

const router = express.Router();

router.get(`${generalSettings.baseUrl}/coffe`, (req, res) => {
  try {
    const result = coffeeBl.getAllCoffeeData();
    res.send(result);
  } catch (error) {
    res.status(500).send("Something got wrong!");
  }
});

router.get(`${generalSettings.baseUrl}/coffee/:id`, (req, res) => {
  const id = +req.params.id;
  const resultCoffeeById = coffeeBl.getById(id);
  if (!resultCoffeeById) {
    res.status(404).send(`Sorry, the requerested coffee not found`);
  }
  res.send(resultCoffeeById);
});

router.put(`${generalSettings.baseUrl}/coffee/:id`, (req, res) => {
  const id = +req.params.id;
  const resultCoffee = coffeeBl.update(id, req.body);

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
    .send(`Sorry we couldn't find what you looking for, please try again`);
});
router.post(`*`, (req, res) => {
  res
    .status(404)
    .send(`Sorry we couldn't find what you looking for, please try `);
});
export {
  router
};