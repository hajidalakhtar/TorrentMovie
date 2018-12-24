const express = require('express');
const app = express();
const axios = require('axios');
const cons = require('consolidate');
const magnet2torrent = require('magnetorrent')
app.engine('hbs', cons.handlebars);
app.set('view engine', 'hbs');
app.set('views', './views')

axios.get(`https://tv-v2.api-fetch.website/movies`)
    .then(function (response) {
        var data = response.data
        global.datalength = 4
    })
    .catch(function (error) {
        console.log(error);
    });


// ------------------------------------------------ \\
// |                                              | \\
// |                     Routes                   | \\ 
// |             By hajid al akhtar               | \\
// |                                              | \\
// ------------------------------------------------ \\
// ==================================== Routes ====================================== \\

global.page = 1;


app.get('/', (req, res) => {
    res.redirect('/browse-movies')
})

app.get('/next', (req, res) => {
    var page1 = page + 1
    res.redirect(`/trending/${page1}`)
})

app.get('/previous', (req, res) => {

    var page1 = page - 1
    res.redirect(`/trending/${page1}`)
})


app.get('/browse-movies', (req, res) => {

    axios.get(`https://tv-v2.api-fetch.website/movies/1?sort=trending&order=-1`)
        .then(function (response) {
            function data(data) {
                trending1 = data;
                trending1.length = 10
            }
            data(response.data)
        })
        .catch(function (error) {
            console.log(error);
        });

    axios.get(`https://tv-v2.api-fetch.website/movies/1?sort=year&order=-1`)
        .then(function (response) {
            function data(data) {
                year = data;
                year.length = 10
            }
            data(response.data)
        })
        .catch(function (error) {
            console.log(error);
        });

    axios.get(`https://tv-v2.api-fetch.website/movies/1?sort=rating&order=1`)
        .then(function (response) {
            function data(data) {
                rating = data;
                rating.length = 10
            }
            data(response.data)
        })
        .catch(function (error) {
            console.log(error);
        });

    res.render('home', { trending: trending1, year: year, rating: rating })

})




app.get('/trending/:page', (req, res) => {

    var page2 = Number(req.params.page)
    global.page = page2;

    axios.get(`https://tv-v2.api-fetch.website/movies/${req.params.page}?sort=trending&order=-1`)
        .then(function (response) {
            res.render('trending', { trending: response.data, page: global.page })
        })
        .catch(function (error) {
            console.log(error);
        });



})





app.get('/details/movie/:id', (req, res) => {
    axios.get(`https://tv-v2.api-fetch.website/movie/${req.params.id}`)
        .then(function (response) {
            console.log(response.data);
            res.render('details', { data: response.data })
        })
        .catch(function (error) {
            console.log(error);
        });
})
// ==================================== Close ====================================== \\

// ------------------------------------------------ \\
// |                                              | \\
// |                     Api                      | \\ 
// |             By hajid al akhtar               | \\
// |                                              | \\
// ------------------------------------------------ \\
// ==================================== Pag ====================================== \\

app.get("/api", (req, res) => {
    res.send('<h1>Movies Papaya </h1><p>by hajid al akhtar</p> <a href="/api/trending/page/1">Trending<a> <br><a href="/api/lastadded/page/1">lastadded<a> <br><a href="/api/rating/page/1">rating<a> <br><a href="/api/title/page/1">title<a> <br><a href="/api/year/page/1">year<a> ')

})
// ==================================== Page ====================================== \\
app.get('/api/trending/page/:page', (req, res) => {
    axios.get(`https://tv-v2.api-fetch.website/movies/${req.params.page}?sort=trending&order=-1`)
        .then(function (response) {
            res.send(JSON.stringify({ "status": 200, "error": null, "response": response.data }));
        })
        .catch(function (error) {
            console.log(error);
        });
})
app.get('/api/lastadded/page/:page', (req, res) => {
    axios.get(`https://tv-v2.api-fetch.website/movies/${req.params.page}?sort=last%20added&order=-1`)
        .then(function (response) {
            res.send(JSON.stringify({ "status": 200, "error": null, "response": response.data }));

        })
        .catch(function (error) {
            console.log(error);
        });
})
app.get('/api/rating/page/:page', (req, res) => {
    axios.get(`https://tv-v2.api-fetch.website/movies/${req.params.page}?sort=rating&order=-1`)
        .then(function (response) {
            res.send(JSON.stringify({ "status": 200, "error": null, "response": response.data }));
        })
        .catch(function (error) {
            console.log(error);
        });
})
app.get('/api/title/page/:page', (req, res) => {
    axios.get(`https://tv-v2.api-fetch.website/movies/${req.params.page}?sort=title&order=-1`)
        .then(function (response) {
            // console.log(response.data);
            // res.send(response.title)
            res.send(JSON.stringify({ "status": 200, "error": null, "response": response.data }));

        })
        .catch(function (error) {
            console.log(error);
        });
})
app.get('/api/year/page/:page', (req, res) => {
    axios.get(`https://tv-v2.api-fetch.website/movies/${req.params.page}?sort=year&order=-1`)
        .then(function (response) {
            // console.log(response.data);
            // res.send(response.title)
            res.send(JSON.stringify({ "status": 200, "error": null, "response": response.data }));

        })
        .catch(function (error) {
            console.log(error);
        });
})

// ==================================== Close ====================================== \\
// ||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||| \\
// ||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||| \\
// ==================================== Details Movie ====================================== \\
app.get('/api/details/movies/:id', (req, res) => {
    axios.get(`https://tv-v2.api-fetch.website/movie/${req.params.id}`)
        .then(function (response) {
            // console.log(response.data);
            // res.send(response.title)
            res.send(JSON.stringify({ "status": 200, "error": null, "response": response.data }));

        })
        .catch(function (error) {
            console.log(error);
        });
})

// ==================================== Close ====================================== \\










const port = process.env.PORT || 8080

app.listen(port, () => console.log(`server jalan di ${port}`));