const express = require('express');

const leaderboard = require('../controllers/leaderboard');

const authenticate = require('../middlewares/auth');

const router = express.Router();

router.get('/user/showLeaderBoard', authenticate.authenticate,leaderboard.getUserLeaderBoard);


module.exports = router;