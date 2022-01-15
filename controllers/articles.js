const Articles = require('../models/article');
const ErrorManager = require('../errors/ErrorManager');

module.exports.getArticles = (req, res, next) => {
  const { _id } = req.user;

  Articles.find({ owner: _id }).select('+owner')
    .then((articles) => {
      res.status(200).send(articles);
    })
    .catch(next);
    //new ErrorManager(404, 'Failed to return articles. No articles have been saved.')
}

module.exports.saveArticle = (req, res, next) => {
  const { article } = req.body;

  Articles.create({
    keyword: article.keyword,
    title: article.title,
    text: article.description,
    date: article.date,
    source: article.source,
    link: article.url,
    image: article.urlToImg,
    owner: req.user._id,
   })
    .then(({ _id, keyword, title, text, date, source, link, image, owner }) => res.status(201).send({
      _id,
      keyword,
      title,
      text,
      date,
      source,
      link,
      image,
      owner
    }))
    .catch(next);
}

module.exports.deleteArticle = (req, res, next) => {
  const { articleId } = req.params;
  const { _id } = req.user;

  Articles.findById(articleId).select('+owner')
    .orFail(new ErrorManager(404, 'Delete article failed. The article was not found or the ID is invalid.'))
    .then((article) => {
      if (article.owner.toString() !== _id) {
        return Promise.reject(new ErrorManager(403, 'Delete article failed. The article is not yours to delete.'));
      }

      return Articles.findByIdAndDelete(article._id);
    })
    // send only the id of deleted card?
    // frontend matches id and removes it from saved
    .then((article) => res.status(200).send({ _id: article._id }))
    .catch(next);
}