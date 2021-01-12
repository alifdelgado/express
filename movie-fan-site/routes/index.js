const express = require('express');
const router = express.Router();
const request = require('request');

const apiKey = 123456789;
const apiBaseUrl = 'http://localhost:3030';
const nowPlayingUrl = `${apiBaseUrl}/most_popular?api_key=${apiKey}`;
const imageBaseUrl = 'https://image.tmdb.org/t/p/w500';

router.use((req, res, next) => {
  res.setHeader("Content-Security-Policy", "script-src 'self' https://apis.google.com");
  res.locals.imageBaseUrl = imageBaseUrl;
  next();
});

/* GET home page. */
router.get('/', function (req, res, next) {
  request.get(nowPlayingUrl, (error, response, movieData) => {
    const parseData = JSON.parse(movieData);
    res.render('index', {
      parseData: parseData.results
    });
  });
});

router.get('/movie/:id', (req, res, next) => {
  const movieId = req.params.id;
  const thisMovieUrl = `${apiBaseUrl}/movie/${movieId}`;
  request.get(thisMovieUrl, (error, response, movieData) => {
    const parseData = JSON.parse(movieData);
    res.render('movie', {
      parseData: parseData
    });
  });
});

router.post('/search', (req, res, next) => {
  const userSearchTerm = encodeURI(req.body.movieSearch);
  const cat = req.body.cat;
  const movieUrl = `${apiBaseUrl}/search/${cat}?query=${userSearchTerm}&api_key=${apiKey}`;
  request.get(movieUrl, (error, response, movieData) => {
    const parseData = JSON.parse(movieData);
    if (cat == "person") {
      parseData.results = parseData.results[0].known_for;
    }
    res.render('index', {
      parseData: parseData.results
    });
  });
});

module.exports = router;
