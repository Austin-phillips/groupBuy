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
})

module.exports = router;


// app.get('/user', (request, response, next) => {
//   const email = request.user._json.email
//   pool.query(
//     `INSERT INTO users(email)
//         VALUES($1)
//         ON CONFLICT
//         DO NOTHING
//         RETURNING email;
//         `,
//     [email],
//     (err, res) => {
//       if (err) next(err);

//       response.redirect(`api/user/${email}`);
//     }
//   );
// });