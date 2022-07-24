const router = require('express').Router();
const { getCities, addCity, deleteCity } = require('../controllers/cities');

router.get('/get-cities', getCities);
router.post('/add-city', addCity);
router.delete('/delete-city', deleteCity);

module.exports = router;
