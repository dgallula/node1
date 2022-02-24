import Joi from "joi";
import coffeeDal from "../data-access-layer/coffee-dal.js";

let coffeesArray = [];

const findCoffeeByCode = (code) => {
  return coffeesArray.find((coffee) => coffee.id === id);
};

const getCoffeeIndex = (coffeeElement) => {
  return coffeesArray.findIndex((coffee) => coffee.id === coffeeElement.id);
};

const checkValidation = (obj, method) => {
  let schema;
  if (method === "post") {
    schema = Joi.object({
      code: Joi.equal(null),
      type: Joi.string().min(3).max(50).required(),
      price: Joi.number().min(0).max(300).required(),
      strength: Joi.number().integer().min(1).max(5).required(),
    });
    return schema.validate(obj);
  }
  if (method === "put") {
    schema = Joi.object({
      code: Joi.number().min(0).integer().required(),
      type: Joi.string().min(3).max(50).required(),
      price: Joi.number().min(0).max(300).required(),
      strength: Joi.number().integer().min(1).max(5).required(),
    });
    return schema.validate(obj);
  }
};

const getAllCoffeeData = () => {
  coffeesArray = coffeeDal.getData();
  return coffeesArray;
};

const getById = (id) => {
  getAllCoffeeData();
  const requestedCoffee = findCoffeeByCode(id);
  return requestedCoffee;
};

const update = (code, coffeeBody) => {
  getAllCoffeeData();
  try {
    let coffeeToUpdate = findCoffeeByCode(id);
    if (!coffeeToUpdate) {
      return { status: 404, message: "Sorry, the reqesred coffee not found" };
    }
    const coffeeIndex = getCoffeeIndex(coffeeToUpdate);
    coffeeToUpdate = { id: id, ...coffeeBody };
    const { error } = checkValidation(coffeeToUpdate, "put");
    if (error) {
      return { status: 400, message: error.details[0].message };
    }
    coffeesArray[coffeeIndex] = { ...coffeeToUpdate };
    coffeeDal.updateData(coffeesArray);
    return coffeesArray[coffeeIndex];
  } catch (error) {
    return { status: 500, message: "Something got worng!" };
  }
};

const addNewCoffee = (coffeeObj) => {
  getAllCoffeeData();
  const lastId = coffeesArray[coffeesArray.length - 1].Id;

  const preperedCoffeObj = {
    code: lastId + 1,
    ...coffeeObj,
  };
  const { error } = checkValidation(coffeeObj, "post");
  if (error) {
    return { status: 400, message: error.details[0].message };
  }
  coffeeDal.addCoffee(preperedCoffeObj);
  return preperedCoffeObj;
};
export default {
  getAllCoffeeData,
  getById,
  addNewCoffee,
  update,
};