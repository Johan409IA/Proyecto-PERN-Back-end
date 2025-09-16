import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import employeeRouter from "./routes/employee.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

const corsOptions = {
  origin: "*",
};

app.use(cors(corsOptions));
app.use(bodyParser.json());

// Definir las rutas ANTES del middleware de 404
app.use("/api/employee", employeeRouter);

// Middleware de manejo de rutas no encontradas (debe ir DESPUÉS de todas las rutas)
app.use(function (req, res) {
  res.status(404).send({ url: req.originalUrl + " No encontrado" }); // Error - NO ENCONTRADO
});

// Middleware de manejo de errores (debe ir al final)
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";
  return res.status(statusCode).json({ error: message });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
