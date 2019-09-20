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

router.post('/', (request, response, next) => {
  const {companyName, userId} = request.body;

  pool.query(
    `INSERT INTO companies(name)
     VALUES($1)
     RETURNING id`,
     [companyName],
     (err, res) => {
       if (err) next(err);

       const companyId = res.rows[0].id;
       response.redirect(307, `/api/company/user/${companyId}/${userId}`);
     }
  )
})

module.exports = router;