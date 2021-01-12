const express = require('express');
const router = express.Router();
const movies = require('../data/movies');

/* GET home page. */
router.get('/', (req, res, next) => {
  res.render('index', { title: 'Express' });
});

router.get('/most_popular', (req, res, next) => {
  let page = req.query.page;
  if (page === undefined) {
    page = 1;
  }
  const indexToStart = (page - 1) * 20;
  let results = movies.filter(movie => {
    return movie.most_popular;
  });
  results = results.slice(indexToStart, (indexToStart+19));
  res.json({results});
});

module.exports = router;
