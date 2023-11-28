import * as fs from "node:fs";

/* Función para leer un archivo */
export const readData = async (archivoDeLectura: string) => {
  try {
    // Lectura del archivo
    const archivo = await fs.promises.readFile(archivoDeLectura, "utf-8");

    // Parsear datos para trabajar con ellos
    const parsedData = JSON.parse(archivo);

    console.log(parsedData);
    return parsedData;
  } catch (err) {
    if (err instanceof Error) {
      console.error(err.message);
      throw err;
    }
  } finally {
    console.log("El proceso de lectura ha finalizado");
  }
};

/* Función para escribir en el archivo */
export const writeData = async (
  archivoDeDestinoJSON: string,
  datosAEscribir: any,
) => {
  try {
    // Convertir los datos a formato JSON
    const JSONdata = JSON.stringify(datosAEscribir, null, 2);

    // Escribir en el archivo de manera asíncrona
    await fs.promises.writeFile(archivoDeDestinoJSON, JSONdata, "utf-8");

    console.log("Datos escritos", archivoDeDestinoJSON);
  } catch (err) {
    if (err instanceof Error) console.error(err.message);
    throw err;
  } finally {
    console.log("El proceso de escritura ha finalizado");
  }
};

/* Ejemplo de llamada a la función */
try {
  await writeData("archivoDeDestinoJSON", "datosAEscribir");
  const datosLeidos = await readData("archivoDeLectura");
  console.log(datosLeidos);
} catch (error) {
  if (error instanceof Error) console.error("Error general:", error.message);
} finally {
  console.log("Proceso finalizado con éxito");
}
