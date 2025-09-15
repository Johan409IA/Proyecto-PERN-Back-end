// Consulta para crear o actualizar el enum de forma segura
export const createOrUpdateRoleTypeQuery = `
    DO $$
    BEGIN
        -- Si el tipo no existe, créalo
        IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'role_type') THEN
            CREATE TYPE role_type AS ENUM('Manager', 'Developer', 'HR', 'Sales', 'Inter', 'Intern');
        ELSE
            -- Si existe, verifica si necesita actualizarse
            -- Agregar 'Intern' si no existe
            IF NOT EXISTS (
                SELECT 1 FROM pg_enum
                WHERE enumtypid = (SELECT oid FROM pg_type WHERE typname = 'role_type')
                AND enumlabel = 'Intern'
            ) THEN
                ALTER TYPE role_type ADD VALUE 'Intern';
            END IF;
        END IF;
    END $$;
`;

// Consulta para crear la tabla de forma segura
export const createEmployeeTableQueryIfNotExists = `
    CREATE TABLE IF NOT EXISTS employee_details(
        id SERIAL PRIMARY KEY,
        name VARCHAR(50) NOT NULL,
        email VARCHAR(50) NOT NULL UNIQUE,
        age SMALLINT NOT NULL CHECK (age > 17),
        role role_type NOT NULL DEFAULT 'Inter',
        salary DECIMAL(8,2) NOT NULL
    );
`;

export const getAllEmployeeQuery = `SELECT * FROM employee_details;`;


export const createEmployeeQuery = `
    INSERT INTO employee_details (name, email, age, role, salary)
    VALUES ($1, $2, $3, COALESCE($4::role_type, 'Intern'::role_type), $5) RETURNING *
`;

export const getEmployeeQuery = `SELECT * FROM employee_details WHERE id = $1;`;

export const deleteEmployeeQuery = `DELETE FROM employee_details WHERE id = $1;`;

export const updateEmployeeQuery = `
    UPDATE employee_details
    SET
    name = $1,
    email = $2,
    age = $3,
    role = $4::role_type,
    salary = $5
    WHERE id = $6
    RETURNING *
`;




