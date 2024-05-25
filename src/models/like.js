import mongoose from 'mongoose';

const likeSchema = new mongoose.Schema({
    onModel: {
        type: String,
        required: true,
        enum: ['Tweet', 'Comment']
    },
    likeable: {   //likable is the id of tweet or comment which we are going to like
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        refPath: 'onModel' // refPath is for it will depend on onModal as onModal itself depends on tweet or comment
    },
    user: {        // user is the userid of user
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    }
 }, {timestamps: true});

 const Like = mongoose.model('Like', likeSchema);

 export default Like