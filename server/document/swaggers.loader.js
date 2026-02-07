const swaggerUi = require("swagger-ui-express");
const basicAuth = require("basic-auth");
const { DecrypterString } = require("../services/repository/cryptography");

const swaggerDocsAdmin = require("./swaggers/admin.swagger");
const swaggerDocsCustomer = require("./swaggers/customer.swagger");

/* =======================
   SWAGGER AUTH
======================= */
function swaggerAuth(req, res, next) {
  const user = basicAuth(req);
  const username = process.env._SWAGGER_USER;
  const password = DecrypterString(process.env._SWAGGER_PASS);

  if (!user || user.name !== username || user.pass !== password) {
    res.set("WWW-Authenticate", 'Basic realm="Swagger API Docs"');
    return res.status(401).send("Authentication required.");
  }
  next();
}

module.exports = (app) => {
  app.use(
    "/api-admin",
    swaggerAuth,
    swaggerUi.serveFiles(swaggerDocsAdmin, {}),
    swaggerUi.setup(swaggerDocsAdmin),
  );

  app.use(
    "/api-customer",
    swaggerAuth,
    swaggerUi.serveFiles(swaggerDocsCustomer, {}),
    swaggerUi.setup(swaggerDocsCustomer),
  );
};
