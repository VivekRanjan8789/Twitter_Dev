import TweetService from "../services/tweet-service.js";

import upload from "../config/file-upload-config.js";
const singleUploader = upload.single('image');


const tweetService = new TweetService();

export const createTweet = async (req, res) => {
    try {
        singleUploader(req, res, async function(err, data) {
            if(err){
                res.status(500).json({error: err})
            }
            console.log('Image url is', req.file);
            const payload = {...req.body}       // only content is in the payload
            if(req.body.image){                // making sure that image is sent in the req or not. if not, doesn't throw error
                  payload.image = req.file.location  // adding image location in req after content is added in payload
            }
            const response = await tweetService.create(payload);
            return res.status(201).json({
                success: true,
                message: "Successfully created data",
                data: response,
                err: {}
            }); 
        });
      
    } catch (error) {
        console.log("req body is",req.body);
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "something went wrong",
            data: {},
            err: error,
        })
    }
}

export const getTweet = async (req, res) => {
    try {
        const response = await tweetService.get(req.params.id);
        return res.status(201).json({
            success: true,
            message: "Successfully fetched tweet",
            data: response,
            err: {}
        });       
    } catch (error) {
        console.log("req body is",req.body);
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "something went wrong",
            data: {},
            err: error,
        })
    }
}