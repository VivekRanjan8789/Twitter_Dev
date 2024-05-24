import express from 'express';
import {connect} from './config/database.js'
const app = express();
const PORT = 3000;

import TweetService from './services/tweet-service.js';

app.listen(PORT, async() => {
        console.log(`Server started at port ${PORT}`);
        await connect();
        console.log("mongoDB connected");

        let service = new TweetService();
        // const tweet  = await service.create({
        //         content: "my other #CoDE #works or #NOT, #FUN"
        // })
        // console.log(tweet);
        
})

