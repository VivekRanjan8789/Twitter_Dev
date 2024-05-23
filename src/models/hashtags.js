import mongoose from 'mongoose'

const hashtagScema = new mongoose.Schema({
    title:{
        type: String,
        required: true
    },
    // one hashtag will have multiple tweets. That's why adding tweets here
    tweets: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Tweet'
        }
    ]
}, {timestamps: true})

const Hashtag = mongoose.model('Hashtag', hashtagScema);
export default Hashtag;

