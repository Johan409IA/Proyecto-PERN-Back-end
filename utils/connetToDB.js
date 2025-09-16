import pg from "pg";
import env from "dotenv";

env.config();

// Railway provides DATABASE_URL, but we also support individual variables for local development
let dbConfig;

if (process.env.DATABASE_URL) {
  // Railway production environment
  dbConfig = {
    connectionString: process.env.DATABASE_URL,
    ssl: {
      rejectUnauthorized: false,
    },
  };
} else {
  // Local development environment
  const requireEnvVars = [
    "PGUSER",
    "PGHOST",
    "PGPORT",
    "PGDATABASE",
    "PGPASSWORD",
  ];

  requireEnvVars.forEach((varName) => {
    if (!process.env[varName]) {
      console.log(`Missing required environment variable: ${varName}`);
      process.exit(1);
    }
  });

  dbConfig = {
    user: process.env.PGUSER,
    host: process.env.PGHOST,
    database: process.env.PGDATABASE,
    password: process.env.PGPASSWORD,
    port: process.env.PGPORT,
  };
}

const db = new pg.Pool(dbConfig);

db.connect()
  .then(() => console.log("Conectado a la base de datos"))
  .catch((err) => {
    console.log("No se conecto a la base de datos", err);
    process.exit(1);
  });

db.on("error", (err) => {
  console.log("Error en la base de datos: ", err);
  process.exit(1);
});

export const query = (text, params) => db.query(text, params);
