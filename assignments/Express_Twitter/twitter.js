/*jshint esversion: 6*/

const express = require('express');
const app = express();
const session = require('express-session');
const bodyParser = require('body-parser');
PORT = 8080;

var tweets = [
    {
        name: "digitizer",
        tweet: "This is a cool piece of information."
    },
    {
        name: "M0SH",
        tweet: "@digitizer I agree."
    }
];

app.use(session({
    secret: "This is the twitter secret."
}));

app.use(bodyParser.urlencoded());

app.get('/', (req, res) => {
  res.sendfile('./public/submit.html');
});

app.get('/gettweets', (req, res) => {
  res.json(tweets);
});

app.post('/myTweet', (req, res) => {
    tweets.push({"name": req.body.name, "tweet": req.body.tweet});
    res.redirect('/');
});


app.listen(PORT, () => {
    var time = new Date();
    console.log(`Server `+__filename.split('/').pop()+` is Running on PORT ${PORT} at `+ time.toTimeString());
});
