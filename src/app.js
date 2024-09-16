const express = require('express');
const cors = require("cors");
const morgan = require("morgan");
const productRoutes = require('./routes/productRoutes');
const clientRoutes = require('./routes/clientRoutes');
const orderRoutes = require('./routes/orderRoutes');
const categoryProductsRoutes = require('./routes/categoryProductRoutes');
const courtesyRoutes = require('./routes/courtesyRoutes');
//const authRoutes = require('./routes/auth');
const swaggerUi = require('swagger-ui-express');
const YAML = require('yamljs');
const config = require("./config/config");
const app = express();
app.use(cors());
app.use(express.json());

// Rutas
app.use('/product', productRoutes);
app.use('/order', orderRoutes);
app.use('/client', clientRoutes);
app.use('/categoryProduct', categoryProductsRoutes);
app.use('/courtesy', courtesyRoutes);
//app.use('/auth', authRoutes);

if (config.NODE_ENV !== 'production') {
    app.use(morgan("dev"));
    // rutas
    const swaggerDocument = YAML.load("./src/docs/swagger.yaml");
    app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
  }

  app.get("/", (req, res) => {
    res.status(200).send({
      message: "Welcome to panaderia",
      environment: config.NODE_ENV,
    });
  });
  module.exports = app;