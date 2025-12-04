const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

//Configuración del Swagger
const swaggerDefinition = {
  openapi: '3.0.0',
  info: {
    title: 'Documentación de la API',
    version: '1.0.0',
    description: 'Documentación de la API con Swagger'
  },
  servers: [
    {
      url: 'http://localhost:4000',
      description: 'Servidor de desarrollo'
    },
  ],
};

const options = {
    swaggerDefinition,
    apis: ['./routes/*.js'], // Rutas donde se encuentran los endpoints
}

const swaggerSpec = swaggerJSDoc(options);

const setupSwagger = (app) => {
    app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
}

module.exports = setupSwagger;