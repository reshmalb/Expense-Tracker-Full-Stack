const express = require('express');

const purchase= require('../controllers/purchase');

const userauthentication = require('../middlewares/auth');

const router = express.Router();

router.get('/purchase/premiummembership', userauthentication.authenticate,purchase.purchasepremium);

router.post('/purchase/updatetransactionstatus', userauthentication.authenticate, purchase.updateTransactionStatus)

module.exports = router;