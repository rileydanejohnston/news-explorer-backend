const router = require('express').Router();
const { signup, signin } = require('../controllers/users');
const { validateSignup, validateSignin } = require('../middlewares/validateUsers');
const { auth } = require('../middlewares/auth');
const userRouter = require('./users');
const articleRouter = require('./articles');

router.post('/signup', validateSignup, signup);
router.post('/signin', validateSignin, signin);

router.use(auth);
router.use('/users', userRouter);
router.use('/articles', articleRouter);

module.exports = router;
