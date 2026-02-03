const express = require('express');
const router = express.Router();

const storageRouter = require('./storage');
const health = require('./health');
const authRouter = require('./auth');
const usersRouter = require('./users');

router.use('/storage', storageRouter);
router.use('/_health', health);
router.use('/auth', authRouter);
router.use('/users', usersRouter);
const adminRouter = require('./admin');
const ordersRouter = require('./orders');
const prescriptionsRouter = require('./prescriptions');
router.use('/admin', adminRouter);
router.use('/orders', ordersRouter);
router.use('/prescriptions', prescriptionsRouter);

module.exports = router;
