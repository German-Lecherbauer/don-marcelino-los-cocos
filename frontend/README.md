# Don Marcelino y Los Cocos

Plataforma web full stack para la gestión interna de pacientes, membresías, usuarios y auditoría de la Asociación Civil Don Marcelino y Los Cocos.

## Funcionalidades principales

- Gestión de pacientes
- Gestión de membresías
- Usuarios y roles
- Auditoría de acciones
- Dashboard
- Autenticación JWT
- Control de permisos por rol
- Diseño responsive

## Arquitectura del backend

### DonMarcelino.Api

Contiene:

- endpoints HTTP
- autenticación
- autorización
- middleware
- configuración de dependencias

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
└── types/
```

La aplicación utiliza rutas protegidas y renderizado condicionado según el rol del usuario.

## Requisitos

Para ejecutar el proyecto localmente se necesita:

- .NET SDK 10
- Node.js
- npm
- Docker Desktop
- Git

## Base de datos

La aplicación utiliza PostgreSQL ejecutándose mediante Docker.

Desde la raíz del proyecto:

- `docker compose up -d`

Para verificar el contenedor:

- `docker ps`

Si el contenedor ya existe pero está detenido:

- `docker start donmarcelino-postgres`

> No utilizar `docker compose down -v` si se desea conservar la información almacenada en PostgreSQL.

## Ejecutar el backend

Desde la raíz del proyecto:

- `dotnet run --project backend/DonMarcelino.Api/DonMarcelino.Api.csproj`

La API se ejecuta localmente en:

- `http://localhost:5106`

Health check:

- `http://localhost:5106/api/health`

## Variables de entorno del frontend

Crear:

- `frontend/.env`

Con:

- `VITE_API_URL=http://localhost:5106/api`

Existe también:

- `frontend/.env.example`

como referencia de configuración.

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

## Seguridad y permisos

El sistema implementa autorización tanto en frontend como en backend.

Las restricciones visuales del frontend mejoran la experiencia de usuario, mientras que las políticas del backend garantizan que un usuario no pueda ejecutar operaciones para las que no posee permisos aunque intente acceder directamente mediante una URL o una solicitud HTTP.

Políticas principales:

- `AdminOnly`
- `AdminOrOperador`
- `Authenticated`

## Diseño responsive

La plataforma incluye adaptación para escritorio, tablet y dispositivos móviles.

Entre las mejoras responsive se incluyen:

- navegación lateral en escritorio
- menú móvil tipo drawer
- tablas adaptadas a pantallas pequeñas
- ocultamiento de columnas secundarias en móvil
- formularios y modales responsive
- adaptación de Dashboard y área privada

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

Los detalles almacenados permiten identificar claramente la entidad afectada.

Ejemplo:

- `Se reactivó el paciente QA Editado Paciente.`

## Estado del proyecto

Versión inicial funcional.

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

## Autor

**Germán Lecherbauer**

Proyecto desarrollado como aplicación full stack y pieza de portfolio.