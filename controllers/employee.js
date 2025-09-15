import { query } from "../utils/connetToDB.js";
import {
  createEmployeeTableQueryIfNotExists,
  createOrUpdateRoleTypeQuery,
  getAllEmployeeQuery,
  createEmployeeQuery,
  getEmployeeQuery,
  deleteEmployeeQuery,
  updateEmployeeQuery
} from "../utils/sqlQuery.js";
import { createError } from "../utils/error.js";

export async function getAllEmployees(req, res, next) {
  try {
    console.log("Iniciando getAllEmployees...");

    // Crear o actualizar el tipo role_type de forma segura
    console.log("Verificando/actualizando tipo role_type...");
    await query(createOrUpdateRoleTypeQuery);
    console.log("Tipo role_type verificado/actualizado");

    // Crear la tabla si no existe
    console.log("Verificando tabla employee_details...");
    await query(createEmployeeTableQueryIfNotExists);
    console.log("Tabla employee_details verificada/creada");

    // Obtener todos los empleados
    const { rows } = await query(getAllEmployeeQuery);
    console.log("Empleados obtenidos:", rows);
    res.status(200).json(rows);
  } catch (error) {
    console.error("Error en getAllEmployees:", error);
    return next(createError(400, "Error, no se pudo obtener a todos los empleados"));
  }
}

export async function getEmployees(req, res, next) {
  const id = req.params.id;
  const data = await query(getEmployeeQuery, [id]);
  console.log(data);
  if(!data.rows.length){
    return next(createError(404, "Empleado no encontrado"));
  }
  res.status(200).json(data.rows[0]);

}

export async function deleteEmployees(req, res, next) {
  const id = req.params.id;
  const data = await query(deleteEmployeeQuery, [id]);
  console.log(data);
  if (!data.rowCount) {
    return next(createError(404, "Empleado no encontrado"));
  }
  res.status(200).json({message: "Empleado eliminado exitosamente"});
}



export async function createEmployees(req, res, next) {
 try {
  const {name, age, email, role, salary} = req.body;
  if(!name || !age || !email || !role || !salary){
    return res.status(400).json({error:"Mission fallida"})
  };
  const data = await query(createEmployeeQuery, [name, email, age, role, salary]);
  res.status(201).json(data.rows[0]);
 } catch (error) {
    console.log(error.message);
    return next(createError(400, error.message)); // ME QUEDE AQUI
 }
}

export async function updateEmployees(req, res, next) {
  try {
    const {id} = req.params;
    const {name, email, age, role, salary} = req.body;
    const result = await query(updateEmployeeQuery, [name, email, age, role, salary, id]);
    if(result.rowCount === 0){
      return res.status(404).json({error: "Empleado no encontrado"});
    }
    res.status(200).json(result.rows[0]);

  } catch (error) {
    res.status(400).json({error: error.message});
  }
}

