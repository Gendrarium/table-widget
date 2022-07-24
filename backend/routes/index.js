const router = require('express').Router();
const NotFoundError = require('../errors/not-found-error');
const cities = require('./cities');

router.use(cities);
router.use((req, res, next) => {
  next(new NotFoundError('Неверный адрес запроса!'));
});

module.exports = router;