const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const router = require('./routes');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const errorHandler = require('./middlewares/error-handler');
const {
  PORT,
  FRONTEND_URL,
} = require('./config');

const CORS_WHITELIST = [FRONTEND_URL];

const corsOption = {
  credentials: true,
  origin: function checkCorsList(origin, callback) {
    if (CORS_WHITELIST.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
};
const app = express();
app.use(cors(corsOption));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true,
}));

app.use(requestLogger);

app.use(router);

app.use(errorLogger);
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Сервер запущен на ${PORT}`);
});
