import express from 'express';
import {connect} from './config/database.js'
const app = express();
const PORT = 3000;

import { UserRepository } from './repository/index.js';
import LikeService from './services/like-service.js';
import { TweetRepository } from './repository/index.js';

import apiRoutes from './routes/index.js';

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api', apiRoutes);

app.listen(PORT, async() => {
        console.log(`Server started at port ${PORT}`);
        await connect();
        console.log("mongoDB connected");

        const userRepo = new UserRepository();
        const tweetRepo = new TweetRepository();
        const tweets =await  tweetRepo.getAll(0,10);
        console.log("tweet 0 is",tweets[0]);
        // const user = await userRepo.create({
        //         email: "vivek@gmail.com",
        //         password: '123456',
        //         name: 'vivek'
        // });
        const users = await userRepo.getAll();
        const likeService = new LikeService();
        likeService.toggleLike(tweets[0].id, 'Tweet', users[0].id);
})

