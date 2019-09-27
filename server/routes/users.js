const { Router } = require('express');
const stripe = require('stripe')("sk_test_Tl38YHRI5uR5slYtkT0KfbGA0067XM11mZ")
const uuid = require("uuid/v4");
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
});

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
});

// add the card
router.post('/addcard', async (request, response, next) => {
  let error;
  let status;
  try {
    const { userId, token } = request.body;

    const customer = await
    stripe.customers.create({
      email: token.email,
      source: token.id
    });

    pool.query(
      `UPDATE users SET card=($1), "lastFour"=($2) WHERE id=($3) RETURNING *`,
      [customer.id, token.card.last4, userId],
      (err, res) => {
        if (err) return next(err);

        response.json(res.rows[0]);
      }
    )
    status = "success";

  } catch (error) {
    console.error("Error:", error);
    status = "failure";
  }
});

router.post('/updatecard', async (request, response, next) => {
  let error;
  let status;
  try {
    const { userId, token, customerId } = request.body;

    const customer = await
    stripe.customers.update(
      customerId,
      {
      source: token.id
      }
    );

    pool.query(
      `UPDATE users SET card=($1), "lastFour"=($2) WHERE id=($3) RETURNING *`,
      [customer.id, token.card.last4, userId],
      (err, res) => {
        if (err) return next(err);

        response.json(res.rows[0]);
      }
    )
    status = "success";

  } catch (error) {
    console.error("Error:", error);
    status = "failure";
  }
});

module.exports = router;