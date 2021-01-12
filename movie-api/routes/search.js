const express = require('express');
const router = express.Router();
const movies = require('../data/movies');
const people = require('../data/people');

const queryRequired = (req, res, next) => {
  const searchTerm = req.query.query;
  if (!searchTerm) {
    res.json({
      msg: "query is required"
    });
    return;
  }
  next();
};

router.use(queryRequired);

/* GET search page. */
router.get('/', (req, res, next) => {
  res.json("test");
});

router.get('/movie', queryRequired, (req, res, next) => {
  const searchTerm = req.query.query;
  const results = movies.filter(movie => {
    let found = movie.overview.includes(searchTerm) || movie.title.includes(searchTerm);
    return found;
  });
  res.json(results);
});

router.get('/person', (req, res, next) => {
  const searchTerm = req.query.query;
  const results = people.filter(person => {
    let found = person.name.includes(searchTerm);
    return found;
  });
  res.json(results);
});

module.exports = router;
