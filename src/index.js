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
        // const tweet = await Tweet.create({
        //     content: "Second Tweet Tweet",
        //     userEmail: 'c@b.com'
        // });
        // const tweets = await Tweet.find({userEmail: 'a@b.com'});
        const tweetRepo = new TweetRepository();
        const tweet = await tweetRepo.create({content:'other Tweet with common Schema'});
        console.log(tweet);
        const comment = await Comment.create({content: 'other new comment'});
        tweet.comments.push(comment);
        await tweet.save();
        console.log(tweet);
})

