const { Router } = require('express');
const users = require('./users');
const companies = require('./companies');
const products = require('./products');
const productUser = require('./productUser');

const router = Router();

router.use('/users', users);
router.use('/companies', companies);
router.use('/products', products);
router.use('/product/user', productUser);

module.exports = router;