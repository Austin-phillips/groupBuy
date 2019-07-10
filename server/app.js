const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const routes = require('./routes');
const path = require('path');

const app = express();
const dev = app.get('env') !== 'production'

// Production
if (!dev) {
  app.disable('x-powered-by');
  app.use(bodyParser.json());
  app.use(helmet());
  app.use(cors());
  app.use(morgan('common'));
  app.use(express.static(path.resolve(__dirname, '../build')));
  app.use('/', routes);
  app.get('/', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../build', 'index.html'));
  });
}

// Development
if (dev) {
  app.use(bodyParser.json());
  app.use(helmet());
  app.use(cors());
  app.use(morgan('dev'));
  app.use('/', routes);
}

app.use((err, req, res, next) => {
  res.json(err);
});

module.exports = app;