const express = require('express');

const purchase= require('../controllers/purchase');

const userauthentication = require('../middlewares/auth');

const router = express.Router();

router.get('expense/premiummembership', userauthentication.authenticate,purchase.purchasepremium);

router.post('expense/updatetransactionstatus', userauthentication.authenticate, purchase.updateTransactionStatus)

module.exports = router;