const db = require('../services/dbConnect.js');
const BadRequestError = require('../errors/bad-request-error');

const getCities = (req, res, next) => {
  db.pool.connect((err, client) => {
    if (err) {
      console.log(err);
      next(new Error(err));
    } else {
      const insertQuery = `SELECT * FROM cities`;
      client
        .query(insertQuery)
        .then((answer) => {
          res.status(200).send(answer.rows);
          client.end();
        })
        .catch((e) => {
          next(new BadRequestError(e));
          client.end();
        });
    }
  });
};

const addCity = (req, res, next) => {
  const { date, name, amount, distance } = req.body;

  db.pool.connect(async (err, client) => {
    if (err) {
      next(new Error(err));
    } else {
      const insertQuery = `INSERT INTO cities (date, name, amount, distance) 
             VALUES($1,$2,$3,$4) RETURNING *`;
      const values = [date, name, amount, distance];

      try {
        const answer = await client.query(insertQuery, values);
        const result = answer.rows[0];

        res.status(201).send(result);
      } catch (e) {
        next(new BadRequestError(e));
      }
    }
  });
};

const deleteCity = (req, res, next) => {
  const { id } = req.body;
  if (typeof id === 'number') {
    db.pool.connect(async (err, client) => {
      if (err) {
        next(new Error(err));
      } else {
        const insertQuery = 'DELETE FROM cities WHERE id = $1';
        const values = [id];

        try {
          const answer = await client.query(insertQuery, values);
          if (answer.rowCount === 0) {
            throw new Error('The row with this ID does not exist.');
          }
          res
            .status(201)
            .send({ result: 'Successfully deleted', data: answer });
        } catch (e) {
          next(new BadRequestError(e));
        }
      }
    });
  } else {
    next(new BadRequestError('ID must be a number!'));
  }
};

module.exports = {
  getCities,
  addCity,
  deleteCity,
};
