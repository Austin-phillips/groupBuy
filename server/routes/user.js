const { Router } = require('express');

const router = Router();

router.get('/', (req, res, next) => {
  res.send(JSON.stringify({ message: "THIS IS GOING TO BE THE HOTTEST SITE OUT THERE!!!" }));
});

module.exports = router;
