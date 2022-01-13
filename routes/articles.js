const router = require('express').Router();
const {
  saveArticle,
  getArticles,
  deleteArticle,
} = require('../controllers/articles');
const {
  validateSave,
  validateDelete,
} = require('../middlewares/validateArticles');

router.get('/', getArticles);
router.post('/', validateSave, saveArticle);
router.delete('/:articleId', validateDelete, deleteArticle);

module.exports = router;