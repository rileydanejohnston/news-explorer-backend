const router = require('express').Router();
const { saveArticle } = require('../controllers/articles');

router.post('/', saveArticle);

module.exports = router;