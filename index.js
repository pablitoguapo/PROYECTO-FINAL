const express = require('express');
const routerApi = require('./routes/rutas');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');

const app = express();
const port = 4000;
const setupSwagger = require('./swagger');
const { logError, errorHandler } = require('./middleware/errorHandler');

// Middlewares
app.use(express.json());
setupSwagger(app);
app.use(cors());
app.use(bodyParser.json());

// Conexión DB
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('Conexion a MongoDB exitosa'))
  .catch(err => console.error('No se puede conectar a MongoDB', err));

// RUTAS (SIEMPRE VAN ANTES DEL ERROR HANDLER)
routerApi(app);

// MIDDLEWARES DE ERROR (SIEMPRE VAN AL FINAL)
app.use(logError);
app.use(errorHandler);

app.listen(port, () => {
    console.log("My port is working on: " + port);
});

/*
api.example.com/tasks/{id}

api.example.com/people/{id}

api.example.com/users/{id}/tasks/{id}
*/

/* mongodb+srv://pemg2006:Evermore123@smartcitylab.msgi2rb.mongodb.net/*/