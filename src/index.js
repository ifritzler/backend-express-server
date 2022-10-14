const express = require("express");
const Contenedor = require("./models/Contendor.js");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 8080;

const productos = new Contenedor("productos.txt");

app.get("/", (_req, res) => {
  res.status(200).json({
    message: "This is a list of server endpoints",
    endpoints: [
      {
        method: "GET",
        url: process.env.BASE_URL + "/productos",
      },
      {
        method: "GET",
        url: process.env.BASE_URL + "/productoRandom",
      },
    ],
  });
});

app.get("/productos", async (_req, res) => {
  try {
    const result = await productos.getAll();
    res.send({ data: result });
  } catch (error) {
    console.log(error);
    res.send({ data: [] });
  }
});

app.get("/productoRandom", async (_req, res) => {
  try {
    const result = await productos.getAll();
    const randomIndex = Math.floor(Math.random() * (result.length - 0 + 1) + 0);
    res.send(result[randomIndex]);
  } catch (error) {
    res.status(404).send({ data: null, error: `Archivo inexistente` });
  }
});

const server = app.listen(PORT, () => {
  console.log(`Server listen on port ${PORT}`);
});

server.on("error", (error) => console.log(`Gateway error: ${error}`));
