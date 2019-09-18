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
  const {id, first, last, phone, email, addressOne, addressTwo, city, state, zip, card, complete} = request.body;
  pool.query(
    `UPDATE users SET first=($1), last=($2), phone=($3), email=($4), "addressOne"=($5), "addressTwo"=($6), city=($7), state=($8), zip=($9) WHERE id=($10) RETURNING *`,
    [first, last, phone, email, addressOne, addressTwo, city, state, zip, id],
    (err, res) => {
      if (err) return next(err);

      const user = res.rows[0];
      response.json(user);
    }
  )
})

module.exports = router;