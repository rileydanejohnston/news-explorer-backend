const router = require('express').Router();
const { saveArticle } = require('../controllers/articles');
const { validateSave } = require('../middlewares/validateArticles');

router.post('/', validateSave, saveArticle);

module.exports = router;