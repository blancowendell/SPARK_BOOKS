# Mern Template
Mern Template a ready made client server repo web app


# npm Scripts Documentation

This document explains the purpose of each npm script available in this project.

## Available Scripts

| Script Name          | Command                                           | Description                                                        |
|----------------------|-------------------------------------------------|--------------------------------------------------------------------|
| `test`               | `echo "Error: no test specified" && exit 1`     | Default placeholder for running tests (not implemented).           |
| `start`              | `node ./bin/www`                                 | Starts the Node.js server in production mode.                      |
| `dev`                | `nodemon ./bin/www`                              | Starts the server in development mode with auto-restart on changes.|
| `migrations:status`  | `node ./routes/utility/checkmigrations.js`      | Checks the current status of Sequelize database migrations.         |
| `migrate`            | `npx sequelize-cli db:migrate`                   | Runs all pending database migrations.                              |
| `migrate:undo`       | `npx sequelize-cli db:migrate:undo`              | Reverts the last executed migration.                              |
| `seed`               | `npx sequelize-cli db:seed:all`                   | Runs all seed files to populate the database with sample data.    |
| `seed:undo`          | `npx sequelize-cli db:seed:undo:all`              | Removes all seeded data from the database.                         |
| `db:drop`            | `npx sequelize-cli db:drop`                        | Drops the current database.                                        |
| `db:create`          | `npx sequelize-cli db:create`                      | Creates the database.                                              |
| `db:migrate`         | `npx sequelize-cli db:migrate`                     | Runs database migrations (same as `migrate`).                      |
| `db:seed`            | `npx sequelize-cli db:seed:all`                     | Runs seeders to populate the database (same as `seed`).           |
| `db:reset`           | `npm run db:drop && npm run db:create && npm run db:migrate && npm run db:seed` | Completely resets the database: drops, recreates, migrates, and seeds.|

---

## Usage Examples

- **Start server in production:**

  ```bash
  npm start

### MCR Generator

Creating an MCR (Model–Controller–Routes) in this project is fully automated using custom npm scripts.

The generator automatically:

Creates a Controller

Creates a Routes file

Registers the route automatically in server.js

(Optional) Generates Sequelize migrations (create or alter)

Enforces consistent naming conventions

Available MCR Commands

Important:
All commands must include -- so npm correctly forwards arguments to Node.

1️⃣ Create Controller & Routes Only (No Migration)
npm run make:mcr -- <module_name> [private|public]

Example
npm run make:mcr -- maintenance_users private

What it does

Creates controller

Creates routes

Registers routes in server.js

❌ Does NOT generate any migration

2️⃣ Create Controller, Routes & CREATE Migration
npm run make:mcr:create -- <module_name> [private|public]

Example
npm run make:mcr:create -- sampleFile public

What it does

Creates controller

Creates routes

Registers routes in server.js

✅ Generates a CREATE migration in:

database/migrations/create/

Generated migration filename
YYYYMMDDHHMMSS-create-sample-file.js

3️⃣ Create Controller, Routes & ALTER Migration
npm run make:mcr:alter -- <module_name> [private|public]

Example
npm run make:mcr:alter -- sampleFile public

What it does

Creates controller

Creates routes

Registers routes in server.js

✅ Generates an ALTER migration in:

database/migrations/alter/

Generated migration filename
YYYYMMDDHHMMSS-alter-sample-file.js

Route Scope
Scope	Description
private (default)	JWT-protected routes
public	Routes without authentication
Naming Rules (IMPORTANT)

To ensure correct camelCase, snake_case, and route generation, follow these rules.

✅ Allowed Input Formats
Input	Generated File
maintenance_users	maintenanceUsers.controller.js
access-type	accessType.routes.js
sample file	sampleFile.controller.js
sampleFile	sampleFile.routes.js
❌ Not Allowed
samplefile


Reason: camelCase cannot be inferred from a single lowercase word.

Generated Files
Example Command
npm run make:mcr -- maintenance_users private

Output
controller/private/maintenanceUsers.controller.js
routes/private/maintenanceUsers.routes.js

Controller Structure

Each generated controller includes:

load<Module>()

get<Module>()

add<Module>()

edit<Module>()

Example

loadSampleFile
getSampleFile
addSampleFile
editSampleFile

Routes Structure

Each generated routes file includes:

GET    /load-<module>
GET    /get-<module>/:id
POST   /add-<module>
PUT    /edit-<module>/:id

Migration Naming & Columns

Migrations generated via make:mcr:create or make:mcr:alter follow strict conventions.

Table Naming
sampleFile → sample_file

Column Prefix Rules

The prefix is derived from the first letter of each table word.

Table Name	Prefix
sample_file	sf
order_item_detail	oid
user	u
Example Columns
sf_id
sf_created_at
sf_status

server.js Auto-Registration

Routes are automatically injected into the correct regions.

Public Routes
//#region ROUTES PUBLIC
var sampleFileRouter = require("./routes/public/sampleFile.routes");
//#endregion

//#region ROUTES USE PUBLIC
app.use("/sample_file", sampleFileRouter);
//#endregion

Private Routes
//#region ROUTES PRIVATE
var maintenanceUsersRouter = require("./routes/private/maintenanceUsers.routes");
//#endregion

//#region ROUTES USE PRIVATE
app.use("/maintenance_users", maintenanceUsersRouter);
//#endregion

Summary

The MCR Generator provides:

Zero manual wiring

Consistent naming

Scoped routing (public/private)

Automated migrations

Scalable, production-ready structure

You can safely generate controllers, routes, and migrations in seconds.