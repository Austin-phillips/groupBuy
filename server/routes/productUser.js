const { Router } = require('express');
const pool = require('../db');

const router = Router();

// ADD PRODUCT AND USER TO RELATION TABLE
router.post('/', (request, response, next) => {
  const { uid, pid } = request.body;
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
router.get('/order/:uid', (request, response, next) => {
  const { uid } = request.params
  pool.query(
    `SELECT "productId" FROM product_user_relation pur
     INNER JOIN products p ON p.id = pur."productId"
     WHERE pur."userId" = $1`,
    [uid],
    (err, res) => {
      if (err) next(err)

      const arr = [];

      for (i = 0; i < res.rowCount; i++) {
        const product = res.rows[i];
        arr.push(product.productId)

        if (arr.length === res.rowCount) {
          response.json(arr)
        }
      }
      // response.json(res.rows)
    }
  )
});

module.exports = router;