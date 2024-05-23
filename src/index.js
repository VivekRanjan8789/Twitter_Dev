const express = require('express');
const app = express();
const PORT = 3000;

const connect = require('./config/database');
const Tweet = require('./models/tweet');

const TweetRepository = require('./repository/tweet-repository');
const Comment = require('./models/comment');

app.listen(PORT, async() => {
        console.log(`Server started at port ${PORT}`);
        await connect();
        console.log("mongoDB connected");

        const tweets =await Tweet.find({
                content : ['updated data', 'First Tweet']
        });
        console.log(tweets);
        
})

