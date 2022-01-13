const router = require('express').Router();
const {
  saveArticle,
  getArticles,
  deleteArticle,
} = require('../controllers/articles');
const { validateSave } = require('../middlewares/validateArticles');

router.get('/', getArticles);
router.post('/', validateSave, saveArticle);
router.delete('/:articleId', deleteArticle);

module.exports = router;