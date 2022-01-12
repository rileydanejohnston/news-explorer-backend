const router = require('express').Router();
const {
  saveArticle,
  getArticles,
} = require('../controllers/articles');
const { validateSave } = require('../middlewares/validateArticles');

router.get('/', getArticles);
router.post('/', validateSave, saveArticle);

module.exports = router;