import express from 'express';
import {connect} from './config/database.js'
const app = express();
const PORT = 3000;

import passport from 'passport';
import { passwordAuth } from './config/jwt-middleware.js';

import apiRoutes from './routes/index.js';

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api', apiRoutes);

app.use(passport.initialize());
passwordAuth(passport);

app.listen(PORT, async() => {
        console.log(`Server started at port ${PORT}`);
        await connect();
        console.log("mongoDB connected");


})

