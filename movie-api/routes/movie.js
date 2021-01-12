const express = require('express');
const router = express.Router();

const movieDetails = require('../data/movie-details');

router.param(('movieId'), (req, res, next) => {
    console.log("someone hit a route that used the movieId wildcard");
    next();
});

router.get('/top_rated', (req, res, next) => {
    let page = req.query.page;
    if (!page) { page = 1; }
    const indexToStart = (page - 1) * 20;
    const results = movieDetails.sort((a, b) => {
        return b.vote_average - a.vote_average;
    });
    res.json(results.slice(indexToStart, (indexToStart + 20)));
});

/* GET movie page. */
router.get('/:movieId', (req, res, next) => {
    const movieId = req.params.movieId;
    const results = movieDetails.find(movie => movie.id === (movieId) * 1);
    if (!results) {
        res.json({
            msg: "Movie is not found",
            production_companies: []
        });
        return;
    }
    res.json(results);
});

router.post('/:movieId/rating', (req, res, next) => {
    const movieId = req.params.movieId;
    const userRating = req.body.value;
    if ((userRating < 0.5) || (userRating > 10)) {
        res.json({ msg: "rating must be between 0.5 and 10" });
    } else {
        res.json({ msg: "thanks for your rating" });
    }
    if (!req.is('application/json')) {
        res.json({
            msg: "content type must be application/json",
            status_code: 200
        });
    } else {
        res.json("test");
    }
});

router.delete('/:movieId/rating', (req, res, next) => {

});

module.exports = router;
