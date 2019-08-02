const { Router } = require('express');
const users = require('./users');
const companies = require('./companies');
const products = require('./products');

const router = Router();

router.use('/users', users);
router.use('/companies', companies);
router.use('/products', products);

module.exports = router;