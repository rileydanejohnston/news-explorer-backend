const validArticle = {
  "article": {
    "date": "January 8, 2022",
    "description": "He composed the title song of the landmark album “Free to Be … You and Me.” He then moved on to Big Bird and friends.",
    "keyword": "music",
    "source": "New York Times",
    "title": "Stephen Lawrence, Whose Music Enriched ‘Sesame Street,’ Dies at 82",
    "url": "https://www.nytimes.com/2022/01/08/arts/music/stephen-lawrence-sesame-street-dead.html",
    "urlToImg": "https://static01.nyt.com/images/2022/01/07/obituaries/07Lawrence1/07Lawrence1-facebookJumbo.jpg"
  }
};

const noDate = {
  "article": {
    "description": "He composed the title song of the landmark album “Free to Be … You and Me.” He then moved on to Big Bird and friends.",
    "keyword": "music",
    "source": "New York Times",
    "title": "Stephen Lawrence, Whose Music Enriched ‘Sesame Street,’ Dies at 82",
    "url": "https://www.nytimes.com/2022/01/08/arts/music/stephen-lawrence-sesame-street-dead.html",
    "urlToImg": "https://static01.nyt.com/images/2022/01/07/obituaries/07Lawrence1/07Lawrence1-facebookJumbo.jpg"
  }
};

const noDescription = {
  "article": {
    "date": "January 8, 2022",
    "keyword": "music",
    "source": "New York Times",
    "title": "Stephen Lawrence, Whose Music Enriched ‘Sesame Street,’ Dies at 82",
    "url": "https://www.nytimes.com/2022/01/08/arts/music/stephen-lawrence-sesame-street-dead.html",
    "urlToImg": "https://static01.nyt.com/images/2022/01/07/obituaries/07Lawrence1/07Lawrence1-facebookJumbo.jpg"
  }
};

const noKeyword = {
  "article": {
    "date": "January 8, 2022",
    "description": "He composed the title song of the landmark album “Free to Be … You and Me.” He then moved on to Big Bird and friends.",
    "source": "New York Times",
    "title": "Stephen Lawrence, Whose Music Enriched ‘Sesame Street,’ Dies at 82",
    "url": "https://www.nytimes.com/2022/01/08/arts/music/stephen-lawrence-sesame-street-dead.html",
    "urlToImg": "https://static01.nyt.com/images/2022/01/07/obituaries/07Lawrence1/07Lawrence1-facebookJumbo.jpg"
  }
};

const noSource = {
  "article": {
    "date": "January 8, 2022",
    "description": "He composed the title song of the landmark album “Free to Be … You and Me.” He then moved on to Big Bird and friends.",
    "keyword": "music",
    "title": "Stephen Lawrence, Whose Music Enriched ‘Sesame Street,’ Dies at 82",
    "url": "https://www.nytimes.com/2022/01/08/arts/music/stephen-lawrence-sesame-street-dead.html",
    "urlToImg": "https://static01.nyt.com/images/2022/01/07/obituaries/07Lawrence1/07Lawrence1-facebookJumbo.jpg"
  }
};

const noTitle = {
  "article": {
    "date": "January 8, 2022",
    "description": "He composed the title song of the landmark album “Free to Be … You and Me.” He then moved on to Big Bird and friends.",
    "keyword": "music",
    "source": "New York Times",
    "url": "https://www.nytimes.com/2022/01/08/arts/music/stephen-lawrence-sesame-street-dead.html",
    "urlToImg": "https://static01.nyt.com/images/2022/01/07/obituaries/07Lawrence1/07Lawrence1-facebookJumbo.jpg"
  }
};

const noUrl = {
  "article": {
    "date": "January 8, 2022",
    "description": "He composed the title song of the landmark album “Free to Be … You and Me.” He then moved on to Big Bird and friends.",
    "keyword": "music",
    "source": "New York Times",
    "title": "Stephen Lawrence, Whose Music Enriched ‘Sesame Street,’ Dies at 82",
    "urlToImg": "https://static01.nyt.com/images/2022/01/07/obituaries/07Lawrence1/07Lawrence1-facebookJumbo.jpg"
  }
};

const noUrlToImg = {
  "article": {
    "date": "January 8, 2022",
    "description": "He composed the title song of the landmark album “Free to Be … You and Me.” He then moved on to Big Bird and friends.",
    "keyword": "music",
    "source": "New York Times",
    "title": "Stephen Lawrence, Whose Music Enriched ‘Sesame Street,’ Dies at 82",
    "url": "https://www.nytimes.com/2022/01/08/arts/music/stephen-lawrence-sesame-street-dead.html",
  }
};

const invalidUrl = {
  "article": {
    "date": "January 8, 2022",
    "description": "He composed the title song of the landmark album “Free to Be … You and Me.” He then moved on to Big Bird and friends.",
    "keyword": "music",
    "source": "New York Times",
    "title": "Stephen Lawrence, Whose Music Enriched ‘Sesame Street,’ Dies at 82",
    "url": "htps://www.nytimes.com/2022/01/08/arts/music/stephen-lawrence-sesame-street-dead.html",
    "urlToImg": "https://static01.nyt.com/images/2022/01/07/obituaries/07Lawrence1/07Lawrence1-facebookJumbo.jpg"
  }
};

const invalidUrlToImg = {
  "article": {
    "date": "January 8, 2022",
    "description": "He composed the title song of the landmark album “Free to Be … You and Me.” He then moved on to Big Bird and friends.",
    "keyword": "music",
    "source": "New York Times",
    "title": "Stephen Lawrence, Whose Music Enriched ‘Sesame Street,’ Dies at 82",
    "url": "https://www.nytimes.com/2022/01/08/arts/music/stephen-lawrence-sesame-street-dead.html",
    "urlToImg": "htps://static01.nyt.com/images/2022/01/07/obituaries/07Lawrence1/07Lawrence1-facebookJumbo.jpg"
  }
};

module.exports = {
  validArticle,
  noDate,
  noDescription,
  noKeyword,
  noSource,
  noTitle,
  noUrl,
  noUrlToImg,
  invalidUrl,
  invalidUrlToImg
}