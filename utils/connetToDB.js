import pg from "pg";
import env from "dotenv";

env.config();

const requireEnvVars = ["PG_USER", "PG_HOST", "PG_PORT", "PG_DATABASE", "PG_PASSWORD"];

requireEnvVars.forEach((varName) => {
    if(!process.env[varName]){
        console.log(`Missing required environment variable: ${varName}`);
        process.exit(1);
    }
})

const db = new pg.Pool({
    user: process.env.PG_USER,
    host: process.env.PG_HOST,
    database: process.env.PG_DATABASE,
    password: process.env.PG_PASSWORD,
    port: process.env.PG_PORT,
})

db.connect()
    .then(()=> console.log("Conectado a la base de datos"))
    .catch((err) => {
        console.log("No se conecto a la base de datos",err);
        process.exit(1);
})

db.on("error", (err) =>{
    console.log("Error en la base de datos: ", err);
    process.exit(1);
})

export const query = (text, params) => db.query(text, params);

