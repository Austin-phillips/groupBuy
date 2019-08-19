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

// ADDING PRODUCT AND USER TO RELATION TABLE
router.post('/relation', (request, response, next) => {
  const { pid, uid } = request.body;
  pool.query(
    `INSERT INTO product_user_relation("productId", "userId")
     Values($1, $2)
     RETURNING *`,
     [pid, uid],
     (err, res) => {
       if (err) next(err)

       response.json(res.rows[0])
     }
  )
});

// GET ALL PRODUCTS FOR A USER
router.get('/:uid', (request, response, next) => {
  const { uid } = request.params
  pool.query(
    `SELECT * FROM product_user_relation pur
     INNER JOIN products p ON p.id = pur."productId"
     WHERE pur."userId" = $1`,
     [uid],
     (err, res) => {
       if (err) next(err)

       response.json(res.rows)
     }
  )
});

// GET ALL IDS FOR USERS ORDERS
router.get('/orderid/:uid', (request, response, next) => {
  const { uid } = request.params
  pool.query(
    `SELECT "productId" FROM product_user_relation pur
     INNER JOIN products p ON p.id = pur."productId"
     WHERE pur."userId" = $1`,
    [uid],
    (err, res) => {
      if (err) next(err)

      response.json(res.rows)
    }
  )
});

module.exports = router;