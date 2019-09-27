const stripe = require('stripe')("sk_test_Tl38YHRI5uR5slYtkT0KfbGA0067XM11mZ")
const uuid = require("uuid/v4");
const pool = require('./db');

autoBill = () => {
  pool.query(
    `SELECT * FROM users`,
    (err, res) => {
      if (err) next(err);

      for (i = 0; i < res.rowCount; i++) {
        async function run() {
          let error;
          let status;
          try {
            const user = res.rows[i];
            const idempotency_key = uuid();
            const charge = await stripe.charges.create(
              {
                amount: (999999 * 100),
                currency: "usd",
                customer: user.card,
                receipt_email: user.email,
                description: 'The Nike Shoes.'
              },
              {
                idempotency_key
              }
            );
            console.log("Charge:", {charge})
            status = "success";
          } catch (error) {
            response.sendStatus(403);
            status = "failure";
          }
        }
        run()
        if (i === res.rowCount) {
          console.log("Finished Billing Cards");
        }
      }
    }
  )
}

module.exports = autoBill;