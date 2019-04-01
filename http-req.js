const express = require('express');
const app = express();
const apps = require('./playstore.js');
const morgan = require('morgan');

app.use(morgan('common'));
app.get('/apps', (req, res) => {

    const {genre, sort} = req.query;
    let results = apps;

    if (genre) {
        results = apps.filter(app => app.Genres.toLowerCase().includes(genre));
    }

    if (sort) {
        if (!['App', 'Rating'].includes(sort)) {
            return res
                .status(400)
                .send('Sort must be one of app or rating');
        }
        if (sort === "App") {
            results.sort((a, b) => {
                return a[sort].toLowerCase() > b[sort].toLowerCase()
                    ? 1
                    : a[sort].toLowerCase() < b[sort].toLowerCase()
                        ? -1
                        : 0;
            });
        } else if (sort === "Rating") {
            results.sort((a, b) => {
                return a[sort] < b[sort]
                    ? 1
                    : a[sort] > b[sort]
                        ? -1
                        : 0;
            });
        }
    } 

    res.json(results);
});

app.listen(8080, () => {
    console.log("express is running!");
})
