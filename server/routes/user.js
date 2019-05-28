const router = require('express').Router();
const { authorized, login, logout, signup } = require('./../controllers/user');

router.get('/authorized', authorized);
router.post('/login', login);
router.post('/signup', signup);
router.get('/logout', logout);

module.exports = router;
