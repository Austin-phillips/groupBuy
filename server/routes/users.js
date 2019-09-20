const { Router } = require('express');
const pool = require('../db');

const router = Router();

router.get('/:email', (request, response, next) => {
  const {email} = request.params
  pool.query(
    `INSERT INTO users(email)
      VALUES($1)
      ON CONFLICT
      DO NOTHING
      RETURNING email;
    `,
    [email],
    (err, res) => {
      if (err) next(err)

      response.redirect(`/api/users/profile/${email}`)
    }
  )
});

router.get('/profile/:email', (request, response, next) => {
  const {email} = request.params;
  pool.query(
    'SELECT * FROM users WHERE email=$1',
    [email],
    (err, res) => {
      if (err) next(err);

      response.json(res.rows[0])
    }
  )
});

router.put('/update', (request, response, next) => {
  const {id, first, last, phone, email, addressOne, addressTwo, city, state, zip, card, complete, company} = request.body;
  pool.query(
    `UPDATE users SET first=($1), last=($2), phone=($3), email=($4), "addressOne"=($5), "addressTwo"=($6), city=($7), state=($8), zip=($9), company=($10) WHERE id=($11) RETURNING *`,
    [first, last, phone, email, addressOne, addressTwo, city, state, zip, company, id],
    (err, res) => {
      if (err) return next(err);

      const user = res.rows[0];
      response.json(user);
    }
  )
})

router.put('/update/company', (request, response, next) => {
  const {company, userId} = request.body;
  pool.query(
    `UPDATE users SET company=($1) WHERE id=($2) RETURNING *`,
    [company, userId],
    (err, res) => {
      if (err) return next(err);

      const user = res.rows[0];
      response.json(user);
    }
  )
})

module.exports = router;