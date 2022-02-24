import express from "express";
import generalSettings from "./config.js";
import { router } from "./controllers/coffee-controller.js";

const app = express();
app.use(express.json());
app.use("/", router);

app.listen(generalSettings.port);
console.log(`server is running on port ${generalSettings.port} localhost!`);