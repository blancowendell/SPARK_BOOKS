import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

/* ================= ESM FIX ================= */

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/* ================= HELPERS ================= */

const toCamelCase = (str) => {
  const s = str.trim();

  // Preserve camelCase / PascalCase
  if (!/[-_ ]/.test(s)) {
    return s.charAt(0).toLowerCase() + s.slice(1);
  }

  return s
    .toLowerCase()
    .replace(/[-_ ]+(.)?/g, (_, c) => (c ? c.toUpperCase() : ""));
};

const toPascalCase = (str) => {
  const c = toCamelCase(str);
  return c.charAt(0).toUpperCase() + c.slice(1);
};

const toSnakeCase = (str) =>
  str
    .replace(/([a-z])([A-Z])/g, "$1_$2")
    .replace(/[-\s]+/g, "_")
    .toLowerCase();

const toKebabCase = (str) =>
  str
    .replace(/([a-z])([A-Z])/g, "$1-$2")
    .replace(/[_\s]+/g, "-")
    .toLowerCase();

const getPrefix = (table) =>
  table.split("_").map(w => w[0]).join("").toLowerCase();

const timestamp = () =>
  new Date().toISOString().replace(/\D/g, "").slice(0, 14);

/* ================= ARGUMENT PARSING ================= */

const args = process.argv.slice(2);

let MODE = "base";
let MODULE_NAME;
let SCOPE = "private";

if (args[0] === "create" || args[0] === "alter") {
  MODE = args[0];
  MODULE_NAME = args[1];
  SCOPE = args[2] || "private";
} else {
  MODULE_NAME = args[0];
  SCOPE = args[1] || "private";
}

if (!MODULE_NAME) {
  console.error("❌ Module name required");
  process.exit(1);
}

SCOPE = SCOPE === "public" ? "public" : "private";

/* ================= NAMING ================= */

const MODULE = toCamelCase(MODULE_NAME);   // sampleFile
const NAME   = toPascalCase(MODULE_NAME);  // SampleFile
const ROUTE  = toSnakeCase(MODULE_NAME);   // sample_file
const TABLE  = ROUTE;
const FILE   = toKebabCase(MODULE_NAME);   // sample-file
const PREFIX = getPrefix(TABLE);           // sf

/* ================= PATHS ================= */

const ROOT = path.resolve(__dirname, "..");
const controllerDir = path.join(ROOT, "controller", SCOPE);
const routesDir = path.join(ROOT, "routes", SCOPE);
const serverPath = path.join(ROOT, "/routes/routes.loader.js");

/* ================= CONTROLLER ================= */

fs.mkdirSync(controllerDir, { recursive: true });

const controllerPath = path.join(
  controllerDir,
  `${MODULE}.controller.js`
);

if (!fs.existsSync(controllerPath)) {
  fs.writeFileSync(controllerPath,
`const { JsonErrorResponse } = require("../../services/repository/response");

// GET
const load${NAME} = async (req, res) => {
  try {
  
  } catch (error) {
    console.error(error);
    res.json(JsonErrorResponse(error));
  }
};

// GET BY ID
const get${NAME} = async (req, res) => {
  try {

  } catch (error) {
    console.error(error);
    res.json(JsonErrorResponse(error));
  }
};

// POST
const add${NAME} = async (req, res) => {
  try {

  } catch (error) {
    console.error(error);
    res.json(JsonErrorResponse(error));
  }
};

// PUT
const edit${NAME} = async (req, res) => {
  try {

  } catch (error) {
    console.error(error);
    res.json(JsonErrorResponse(error));
  }
};

module.exports = {
  load${NAME},
  get${NAME},
  add${NAME},
  edit${NAME},
};
`);
}

/* ================= ROUTES ================= */

fs.mkdirSync(routesDir, { recursive: true });

const routePath = path.join(
  routesDir,
  `${MODULE}.routes.js`
);

if (!fs.existsSync(routePath)) {
  fs.writeFileSync(routePath,
`const express = require("express");
const router = express.Router();

const {
  load${NAME},
  get${NAME},
  add${NAME},
  edit${NAME}
} = require("../../controller/${SCOPE}/${MODULE}.controller");

// GET
router.get("/load-${ROUTE}", load${NAME});
router.get("/get-${ROUTE}/:id", get${NAME});
router.post("/add-${ROUTE}", add${NAME});
router.put("/edit-${ROUTE}/:id", edit${NAME});

module.exports = router;
`);
}

/* ================= SERVER.JS AUTO-INJECT ================= */

if (fs.existsSync(serverPath)) {
  let server = fs.readFileSync(serverPath, "utf8");

  const routerVar =
    `var ${MODULE}Router = require("./routes/${SCOPE}/${MODULE}.routes");`;

  const appUse =
    `app.use("/${ROUTE}", ${MODULE}Router);`;

  const requireRegion =
    SCOPE === "private"
      ? "//#region ROUTES PRIVATE"
      : "//#region ROUTES PUBLIC";

  const useRegion =
    SCOPE === "private"
      ? "//#region ROUTES USE PRIVATE"
      : "//#region ROUTES USE PUBLIC";

  if (!server.includes(routerVar)) {
    server = server.replace(
      new RegExp(`${requireRegion}[\\s\\S]*?//#endregion`),
      block => block.replace("//#endregion", `${routerVar}\n//#endregion`)
    );
  }

  if (!server.includes(appUse)) {
    server = server.replace(
      new RegExp(`${useRegion}[\\s\\S]*?//#endregion`),
      block => block.replace("//#endregion", `${appUse}\n//#endregion`)
    );
  }

  fs.writeFileSync(serverPath, server);
}

/* ================= MIGRATIONS ================= */

if (MODE === "create" || MODE === "alter") {
  const migDir = path.join(ROOT, "database/migrations", MODE);
  fs.mkdirSync(migDir, { recursive: true });

  const migPath = path.join(
    migDir,
    `${timestamp()}-${MODE}-${FILE}.js`
  );

  const content =
MODE === "create"
? `'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('${TABLE}', {
      ${PREFIX}_id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
      },

      // other fields


      ${PREFIX}_created_at: {
        type: Sequelize.DATE,
        allowNull: false
      },
      ${PREFIX}_status: {
        type: Sequelize.ENUM('ACTIVE','INACTIVE'),
        allowNull: false
      }
    });
  },
  down: async (queryInterface) => {
    await queryInterface.dropTable('${TABLE}');
  }
};
`
: `'use strict';

module.exports = {
  up: async () => {},
  down: async () => {}
};
`;

  fs.writeFileSync(migPath, content);
}

/* ================= DONE ================= */

console.log(`🎉 MCR${MODE !== "base" ? " + migration" : ""} generated successfully`);
