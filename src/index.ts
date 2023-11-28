import express from "express";
import morgan from "morgan";
import "dotenv/config";
import "express-async-errors";
// import { arrObj } from "./types";

/* variables */
const server = express();
const PORT: string | number = process.env.PORT || 3000;
// const archivoDeLecturaJSON = "../database/db.json";
// const archivoDeDestinoJSON = "../database/actualized-db.json";
// const datosAEscribir: arrObj = [
//   {
//     id: 0,
//     title: "",
//     msg: "",
//   },
// ];

/* lógica */
server.use(morgan("dev"));
server.use(express.json());

/* CRUD... */

server.listen(PORT, () => {
  console.log(`App listening on port http://localhost:${PORT}`);
});
