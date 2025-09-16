import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import employeeRouter from "./routes/employee.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

const corsOptions = { origin: "*" };
app.use(cors(corsOptions));
app.use(bodyParser.json());

// Ruta de healthcheck
app.get("/", (req, res) => {
  res.status(200).send("Servidor funcionando correctamente");
});

// Rutas principales
app.use("/api/employee", employeeRouter);

// Middleware 404
app.use((req, res) => {
  res.status(404).send({ url: req.originalUrl + " No encontrado" });
});

// Middleware de errores
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";
  return res.status(statusCode).json({ error: message });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
