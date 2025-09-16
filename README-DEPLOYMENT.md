# Railway Deployment Guide

## Pasos para desplegar en Railway

### 1. Instalar Railway CLI

```bash
npm install -g @railway/cli
```

### 2. Login en Railway

```bash
railway login
```

### 3. Crear proyecto

```bash
railway create perm-backend
```

### 4. Agregar base de datos PostgreSQL

```bash
railway add postgresql
```

### 5. Configurar variables de entorno

Railway automáticamente creará `DATABASE_URL` cuando agregues PostgreSQL.

### 6. Desplegar

```bash
railway up
```

### 7. Generar dominio público

```bash
railway domain
```

## Variables de entorno

Railway automáticamente proporciona:

- `DATABASE_URL`: URL completa de conexión a PostgreSQL
- `PORT`: Puerto donde correrá la aplicación

## Estructura de la base de datos

La aplicación creará automáticamente:

- Tipo enum `role_type` con valores: 'Manager', 'Developer', 'HR', 'Sales', 'Inter', 'Intern'
- Tabla `employee_details` con campos:
  - id (SERIAL PRIMARY KEY)
  - name (VARCHAR(50) NOT NULL)
  - email (VARCHAR(50) NOT NULL UNIQUE)
  - age (SMALLINT NOT NULL CHECK (age > 17))
  - role (role_type NOT NULL DEFAULT 'Inter')
  - salary (DECIMAL(8,2) NOT NULL)

## Endpoints disponibles

- `GET /api/employee` - Obtener todos los empleados
- `GET /api/employee/:id` - Obtener empleado por ID
- `POST /api/employee` - Crear nuevo empleado
- `PUT /api/employee/:id` - Actualizar empleado
- `DELETE /api/employee/:id` - Eliminar empleado
