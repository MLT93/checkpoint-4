import morgan from "morgan";
import "dotenv/config";
import "express-async-errors";
import express from "express";
import axios from "axios";
import * as fs from "node:fs";
import { arrObj } from "./types";

/* inicialización del servidor y definición del puerto de escucha */
const server = express();
const PORT: string | number = process.env.PORT || 3000;

/* middlewares: registro información HTTP con morgan y deserializo solicitudes en formato JSON */
server.use(morgan("dev"));
server.use(express.json());

/* llamada de la API, escritura de la data en un archivo y CRUD en el servidor */
const url = "https://my-json-server.typicode.com/typicode/demo/posts";
const rutaDelArchivo = "/home/marko/Development/checkpoint-4/database/db.json";

((url) => {
  axios.get(url).then(async (response) => {
    const data: arrObj = await response.data;
    console.log(data);
    const stringify = JSON.stringify(data);
    await fs.promises.writeFile(rutaDelArchivo, stringify, "utf-8");
  });
})(url);

server.post("/api", async (req, res) => {
  try {
    const contenidoDelArchivo = await fs.promises.readFile(
      rutaDelArchivo,
      "utf-8",
    );
    const fixBuffer = contenidoDelArchivo.toString();
    const bufferParsed = JSON.parse(fixBuffer);

    const { id, title } = req.body;

    const post = [...bufferParsed, { id: id, title: title }];

    const stringifyPost = JSON.stringify(post);
    await fs.promises.writeFile(rutaDelArchivo, stringifyPost, "utf-8");

    res.status(200).json({
      request: req.url,
      msg: "Post",
      response: post,
    });
  } catch (err) {
    if (err instanceof Error) {
      console.error(err.message);
      res.status(404).send(`404 - Not Found: ${err.message}`);
    }
  }
});

server.get("/api", async (req, res) => {
  try {
    const contenidoDelArchivo = await fs.promises.readFile(
      rutaDelArchivo,
      "utf-8",
    );
    const fixBuffer = contenidoDelArchivo.toString();
    const bufferParsed = JSON.parse(fixBuffer);

    res.status(200).json({
      request: req.url,
      msg: "Read",
      response: bufferParsed,
    });
  } catch (err) {
    if (err instanceof Error) {
      console.error(err.message);
      res.status(404).send(`404 - Not Found: ${err.message}`);
    }
  }
});

server.get("/api/:id", async (req, res) => {
  try {
    const contenidoDelArchivo = await fs.promises.readFile(
      rutaDelArchivo,
      "utf-8",
    );
    const fixBuffer = contenidoDelArchivo.toString();
    const bufferParsed = JSON.parse(fixBuffer);
    const { id } = req.params;

    const getOne = bufferParsed.find(
      (e: { id: number }) => e.id === Number(id),
    );

    res.status(200).json({
      request: req.url,
      msg: "Read",
      response: getOne,
    });
  } catch (err) {
    if (err instanceof Error) {
      console.error(err.message);
      res.status(404).send(`404 - Not Found: ${err.message}`);
    }
  }
});

server.put("/api/:id", async (req, res) => {
  try {
    const contenidoDelArchivo = await fs.promises.readFile(
      rutaDelArchivo,
      "utf-8",
    );
    const fixBuffer = contenidoDelArchivo.toString();
    const bufferParsed = JSON.parse(fixBuffer);

    const { id } = req.params;
    const fixedId = Number(id);
    const { title } = req.body;
    const put = bufferParsed.map((element: { id: number; title: string }) =>
      element.id === fixedId ? { ...element, title: title } : element,
    );

    const stringifyPut = JSON.stringify(put);
    await fs.promises.writeFile(rutaDelArchivo, stringifyPut, "utf-8");

    res.status(200).json({
      request: req.url,
      msg: "Post",
      response: put,
    });
  } catch (err) {
    if (err instanceof Error) {
      console.error(err.message);
      res.status(404).send(`404 - Not Found: ${err.message}`);
    }
  }
});

server.delete("/api/:id", async (req, res) => {
  try {
    const contenidoDelArchivo = await fs.promises.readFile(
      rutaDelArchivo,
      "utf-8",
    );
    const fixBuffer = contenidoDelArchivo.toString();
    const bufferParsed = JSON.parse(fixBuffer);

    const { id } = req.params;
    const fixedId = Number(id);
    const deleted = bufferParsed.filter(
      (element: { id: number; title: string }) => element.id !== fixedId,
    );

    const stringifyDelete = JSON.stringify(deleted);
    await fs.promises.writeFile(rutaDelArchivo, stringifyDelete, "utf-8");

    res.status(200).json({
      request: req.url,
      msg: "Post",
      response: deleted,
    });
  } catch (err) {
    if (err instanceof Error) {
      console.error(err.message);
      res.status(404).send(`404 - Not Found: ${err.message}`);
    }
  }
});

server.listen(PORT, () => {
  console.log(`App listening on port http://localhost:${PORT}`);
});
