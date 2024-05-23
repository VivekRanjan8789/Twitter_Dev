const express = require('express');
const app = express();
const PORT = 3000;

const connect = require('./config/database');
const { TweetRepository } = require('./repository/tweet-repository');
const  TweetService  = require('./services/tweet-service');

app.listen(PORT, async() => {
        console.log(`Server started at port ${PORT}`);
        await connect();
        console.log("mongoDB connected");
        
})

