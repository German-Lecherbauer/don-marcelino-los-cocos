# Don Marcelino y Los Cocos

Plataforma web full stack para la gestión interna de pacientes, membresías, usuarios y auditoría de la Asociación Civil Don Marcelino y Los Cocos.

## Demo en producción

Frontend:

- `https://don-marcelino-los-cocos-theta.vercel.app`

API:

- `https://don-marcelino-api.onrender.com`

Health check:

- `https://don-marcelino-api.onrender.com/api/health`

## Funcionalidades principales

- Gestión de pacientes
- Gestión de membresías
- Usuarios y roles
- Auditoría de acciones
- Dashboard
- Autenticación JWT
- Control de permisos por rol
- Diseño responsive
- Interfaz pública institucional
- Área privada de gestión
- Baja lógica y reactivación de pacientes
- Cambio de estado de membresías
- Gestión de roles de usuario

## Roles del sistema

La aplicación implementa tres niveles de acceso:

### Admin

Puede acceder a:

- Dashboard completo
- Pacientes
- Membresías
- Usuarios
- Auditoría
- Gestión de roles
- Activación y desactivación de usuarios
- Creación y edición de pacientes
- Creación y actualización de membresías

### Operador

Puede acceder a:

- Dashboard
- Pacientes
- Membresías

Puede realizar operaciones de gestión sobre pacientes y membresías, pero no posee acceso a la administración de usuarios ni a la auditoría.

### Consulta

Posee acceso de solo lectura a la información permitida por el sistema.

No puede realizar operaciones administrativas ni modificaciones sobre los datos.

## Arquitectura del backend

El backend está desarrollado siguiendo una arquitectura separada por responsabilidades.

### DonMarcelino.Api

Contiene:

- endpoints HTTP
- autenticación
- autorización
- middleware
- configuración de dependencias
- configuración de CORS
- health check

### DonMarcelino.Application

Contiene:

- servicios de aplicación
- interfaces de repositorios
- requests
- lógica de casos de uso

### DonMarcelino.Domain

Contiene:

- entidades
- enums
- reglas principales del dominio

### DonMarcelino.Infrastructure

Contiene:

- DbContext
- Entity Framework Core
- repositorios
- persistencia PostgreSQL
- migraciones

## Estructura del frontend

```text
frontend/src/
├── api/
├── assets/
├── auth/
├── components/
├── layouts/
├── pages/
├── routes/
├── styles/
└── types/

La aplicación utiliza rutas protegidas y renderizado condicionado según el rol del usuario.

También utiliza componentes y estilos reutilizables para mantener consistencia visual dentro del área de gestión.

## Tecnologías utilizadas

### Backend

- .NET 10
- ASP.NET Core
- Entity Framework Core
- PostgreSQL
- JWT
- Docker

### Frontend

- React
- TypeScript
- Vite
- React Router
- Axios
- CSS

### Infraestructura

- Vercel
- Render
- Supabase
- GitHub

## Requisitos

Para ejecutar el proyecto localmente se necesita:

- .NET SDK 10
- Node.js
- npm
- Docker Desktop
- Git

## Base de datos

La aplicación utiliza PostgreSQL.

En desarrollo local, PostgreSQL puede ejecutarse mediante Docker.

Desde la raíz del proyecto:

- `docker compose up -d`

Para verificar el contenedor:

- `docker ps`

Si el contenedor ya existe pero está detenido:

- `docker start donmarcelino-postgres`

> No utilizar `docker compose down -v` si se desea conservar la información almacenada en PostgreSQL.

En producción, la base de datos se encuentra alojada en Supabase.

## Ejecutar el backend

Desde la raíz del proyecto:

- `dotnet run --project backend/DonMarcelino.Api/DonMarcelino.Api.csproj`

La API se ejecuta localmente en:

- `http://localhost:5106`

Health check:

- `http://localhost:5106/api/health`

## Variables de entorno del backend

La configuración sensible debe realizarse mediante variables de entorno.

Ejemplos:

- `ConnectionStrings__DefaultConnection`
- `Jwt__Key`
- `ASPNETCORE_ENVIRONMENT`

Las credenciales y claves privadas no deben almacenarse dentro del repositorio.

## Variables de entorno del frontend

Crear:

- `frontend/.env`

Con:

- `VITE_API_URL=http://localhost:5106/api`

Existe también:

- `frontend/.env.example`

como referencia de configuración.

En producción, esta variable apunta a la API desplegada en Render.

## Ejecutar el frontend

Ingresar a la carpeta:

- `cd frontend`

Instalar dependencias:

- `npm install`

Ejecutar Vite:

- `npm run dev`

La aplicación estará disponible en:

- `http://localhost:5173`

## Autenticación

La aplicación utiliza JWT.

Después del login, el token se utiliza para autenticar las solicitudes realizadas hacia la API.

Las rutas privadas del frontend están protegidas según autenticación y rol.

Las solicitudes realizadas mediante Axios incorporan automáticamente el token en el encabezado de autorización.

## Seguridad y permisos

El sistema implementa autorización tanto en frontend como en backend.

Las restricciones visuales del frontend mejoran la experiencia de usuario, mientras que las políticas del backend garantizan que un usuario no pueda ejecutar operaciones para las que no posee permisos aunque intente acceder directamente mediante una URL o una solicitud HTTP.

Políticas principales:

- `AdminOnly`
- `AdminOrOperador`
- `Authenticated`

El backend es quien aplica finalmente las restricciones de seguridad.

## Diseño responsive

La plataforma incluye adaptación para escritorio, tablet y dispositivos móviles.

Entre las mejoras responsive se incluyen:

- navegación lateral en escritorio
- menú móvil tipo drawer
- tablas adaptadas a pantallas pequeñas
- ocultamiento de columnas secundarias en móvil
- formularios y modales responsive
- adaptación de Dashboard y área privada
- landing institucional responsive

La aplicación fue probada también desde dispositivos móviles reales.

## Auditoría

Las acciones importantes del sistema generan automáticamente registros de auditoría.

Ejemplos:

- Crear Paciente
- Actualizar Paciente
- Desactivar Paciente
- Activar Paciente
- Crear Membresía
- Actualizar Membresía
- Cambiar estado de Membresía
- Crear Usuario
- Cambiar rol de Usuario
- Cambiar estado de Usuario

Los detalles almacenados permiten identificar claramente la entidad afectada.

Ejemplos:

- `Se reactivó el paciente QA Editado Paciente.`
- `Se cambió el estado de la membresía del paciente Lucía Benítez a Vencida.`
- `Se creó el usuario consulta.demo@donmarcelino.com con rol Consulta.`

## Dashboard

El dashboard muestra un resumen general de la información del sistema.

Entre las métricas disponibles se encuentran:

- Total de pacientes
- Pacientes activos
- Membresías activas
- Membresías vencidas
- Usuarios activos

La información mostrada varía según el rol del usuario.

Los administradores también pueden visualizar la actividad reciente registrada por el módulo de auditoría.

## Persistencia

La aplicación utiliza Entity Framework Core como ORM.

Las modificaciones del esquema de base de datos se gestionan mediante migraciones.

Ejemplo:

- `dotnet ef database update`

En producción, las migraciones se aplican sobre PostgreSQL alojado en Supabase.

## Despliegue

### Frontend

El frontend está desplegado en Vercel.

Vercel se encuentra conectado al repositorio de GitHub, por lo que cada actualización realizada sobre la rama principal genera automáticamente un nuevo despliegue.

La aplicación incluye configuración de rewrites para permitir el funcionamiento correcto de React Router al recargar rutas internas.

### Backend

El backend se encuentra desplegado en Render utilizando Docker.

Render también se encuentra conectado al repositorio de GitHub y realiza nuevos despliegues automáticamente cuando se publican cambios en el backend.

### Base de datos

PostgreSQL se encuentra alojado en Supabase.

## Flujo de despliegue

El flujo principal del proyecto es:

```text
Desarrollo local
       ↓
Git commit
       ↓
Git push
       ↓
GitHub
       ↓
Vercel / Render
       ↓
Supabase

Esto permite mantener un flujo de integración y despliegue simple para el proyecto.

Estado del proyecto

Versión funcional desplegada en producción.

Actualmente se encuentran implementados y probados:

- autenticación
- autorización por roles
- pacientes
- membresías
- usuarios
- auditoría
- dashboard
- baja lógica
- reactivación de pacientes
- responsive
- manejo de errores básicos de conexión
- interfaz pública
- área privada
- despliegue de frontend
- despliegue de backend
- base de datos en producción
- navegación con React Router
- soporte de refresh en rutas internas
- consumo de API mediante variables de entorno
- CORS para producción

Objetivo del proyecto

El proyecto fue desarrollado como una aplicación full stack orientada a representar un sistema de gestión real.

Busca demostrar conocimientos en:

- arquitectura de software
- desarrollo backend
- desarrollo frontend
- autenticación y autorización
- diseño de APIs
- modelado de datos
- persistencia
- seguridad
- manejo de roles
- responsive design
- Docker
- despliegue en producción
- integración entre frontend, backend y base de datos

Autor

Germán Lecherbauer

Proyecto desarrollado como aplicación full stack y pieza de portfolio.