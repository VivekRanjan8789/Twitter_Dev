const TweetRepository = require('../repository/index');

class TweetService {
    constructor(){
        this.TweetService = new TweetRepository()
    }  

    async create(data) {
        const content = data.content;
        const tags = content.match(/#[a-zA-Z0-9_]+/g); // this regex extract hashtags 
        tags = tags.map((tag) => tag.substring(1));
        console.log(tags);
        const tweet = await this.create(data);
        // todo create hashtags and add here
        /***
         * 1. bulcreate in mongoose
         * 2. filter title of hashtag based on multiple tags
         * 3. how to add id inside the hashtags
         */
        return tweet;
    }
}

module.exports = TweetService;
/**
 * this is my #first #tweet. I am reakky excited;
 */