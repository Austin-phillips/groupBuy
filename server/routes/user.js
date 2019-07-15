const { Router } = require('express');

const router = Router();

router.get('/', (req, res, next) => {
  res.json({data: "Hello GroupBuy"});
});

module.exports = router;
