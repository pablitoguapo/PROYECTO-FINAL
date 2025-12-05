const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

// URL base dinámico (Render o local)
const BASE_URL = process.env.BASE_URL || "http://localhost:4000";

const swaggerDefinition = {
  openapi: "3.0.0",
  info: {
    title: "Documentación de la API",
    version: "1.0.0",
    description: "Documentación de la API con Swagger",
  },
  servers: [
    {
      url: BASE_URL,
      description: "Servidor actual",
    },
  ],
};

const options = {
  swaggerDefinition,
  apis: ["./routes/*.js"],
};

const swaggerSpec = swaggerJSDoc(options);

const setupSwagger = (app) => {
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
};

module.exports = setupSwagger;
