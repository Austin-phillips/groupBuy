const { Router } = require('express');
const pool = require('../db');

const router = Router();

// GET ALL PRODUCTS
router.get('/', (request, response, next) => {
  pool.query(
    `SELECT * FROM products ORDER BY id ASC;`,
    (err, res) => {
      if (err) next(err);

      response.json(res.rows);
    }
  )
});

// GET INDIVIDUAL PRODUCT
router.get('/:id', (request, response, next) => {
  const {id} = request.params;
  pool.query(
    `SELECT * FROM products WHERE id = $1`,
    [id],
    (err, res) => {
      if (err) next(err);

      response.json(res.rows)
    }
  )
})

// PURCHASE PRODUCT
router.put('/buy/:id', (request, response, next) => {
  const { id } = request.params;
  pool.query(
    `UPDATE products SET count = count + 1 WHERE id=($1) RETURNING *`,
    [id],
    (err, res) => {
      if (err) next(err)

      response.json(res.rows[0]);
    }
  )
});

module.exports = router;