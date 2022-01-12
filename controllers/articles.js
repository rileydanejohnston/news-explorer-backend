const Articles = require('../models/article');

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