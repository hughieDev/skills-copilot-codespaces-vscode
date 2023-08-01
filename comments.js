//Create web server

const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;

//Setup body parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//Setup mongoose
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/comments', { useNewUrlParser: true });
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error: '));

//Setup schema
const Schema = mongoose.Schema;
const commentSchema = new Schema({
    name: String,
    comment: String,
    date: Date
});
const Comment = mongoose.model('Comment', commentSchema);

//Setup route
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

app.get('/comments', (req, res) => {
    Comment.find({}, (err, comments) => {
        res.json(comments);
    });
});

app.post('/comments', (req, res) => {
    const comment = new Comment({
        name: req.body.name,
        comment: req.body.comment,
        date: Date.now()
    });
    comment.save((err) => {
        if (err) console.log(err);
        res.redirect('/');
    });
});

app.listen(port, () => console.log(`Web server is listening at localhost:${port}`));
