const swaggerJSDoc = require('swagger-jsdoc');
const fs = require('fs');
const yaml = require('js-yaml');

const swaggerDefinition = {
  openapi: '3.0.0',
  info: {
    title: 'Your API Title',
    version: '1.0.0',
  },
};

const options = {
  swaggerDefinition,
  apis: ['./swagger/paths/*.yaml', './swagger/components/*.yaml', './swagger/tags/*.yaml'],
};

const swaggerSpec = swaggerJSDoc(options);

module.exports = swaggerSpec;