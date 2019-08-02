const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const path = require('path');
const routes = require('./routes');

const app = express();
const dev = app.get('env') !== 'production';

app.use(bodyParser.json());
app.use(helmet());
app.use(cors());
app.use(morgan('common'));
app.use('/api', routes);
app.use((err, req, res, next) => {
  res.json(err);
});

// Production
if (!dev) {
  app.disable('x-powered-by');
  app.use(express.static(path.resolve(__dirname, '../build')));
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../build', 'index.html'));
  });
};

module.exports = app;