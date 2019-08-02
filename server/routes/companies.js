const { Router } = require('express');
const pool = require('../db');

const router = Router();

router.get('/', (request, response, next) => {
  pool.query(
    `SELECT * FROM companies;`,
    (err, res) => {
      if (err) next(err);

      response.json(res.rows);
    }
  )
});

module.exports = router;