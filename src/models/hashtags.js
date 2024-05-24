import mongoose from 'mongoose'

const hashtagScema = new mongoose.Schema({
    title:{
        type: String,
        required: true,
        unique: true
    },
    // one hashtag will have multiple tweets. That's why adding tweets here
    tweets: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Tweet'
        }
    ]
}, {timestamps: true})

hashtagScema.pre('save', function(next) {
    console.log(this);
    this.title = this.title.toLowerCase();
    console.log(this);
    next();
});

const Hashtag = mongoose.model('Hashtag', hashtagScema);
export default Hashtag;

