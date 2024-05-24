import TweetService from "../services/tweet-service.js";

const tweetService = new TweetService();

export const createTweet = async (req, res) => {
    try {
        const response = await tweetService.create(req.body);
        console.log("req body is", req.body);
        console.log("response is", response); 
        return res.status(201).json({
            success: true,
            message: "Successfully created data",
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