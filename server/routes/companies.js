const { Router } = require('express');
const pool = require('../db');

const router = Router();

router.get('/:userId', (request, response, next) => {
  const {userId} = request.params;
  pool.query(
    `SELECT * FROM company_user_relation cur
     INNER JOIN companies c ON c.id = cur."companyId"
     WHERE cur."userId" = $1`,
     [userId],
    (err, res) => {
      if (err) next(err);

      response.json(res.rows[0]);
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