const { Router } = require('express');
const pool = require('../db');

const router = Router();

router.post('/:companyId/:userId', (request, response, next) => {
  const {companyId, userId} = request.params;
  
  pool.query(
    `INSERT INTO company_user_relation("userId", "companyId")
     VALUES($1, $2)
     RETURNING *`,
     [userId, companyId],
     (err, res) => {
       if (err) next(err);

       response.sendStatus(200)
     }
  )
})

module.exports = router;