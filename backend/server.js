const express = require('express');
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const path = require('path');
const routes = require('./routes');
const { init } = require('./db');

const app = express();
const port = process.env.PORT || 3001;

init();

app.use(express.json());
app.use('/api', routes);

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'ToolsManager API',
      version: '1.0.0',
    },
  },
  apis: [path.join(__dirname, 'routes.js')],
};

const specs = swaggerJsdoc(options);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
  console.log(`Swagger docs at http://localhost:${port}/api-docs`);
});
