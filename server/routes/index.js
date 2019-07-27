const { Router } = require('express');
const user = require('./user');
const company = require('./company');
const products = require('./products');

const router = Router();

router.use('/api/user', user);
router.use('/api/company', company);
router.use('/api/products', products);

module.exports = router;