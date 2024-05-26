import { TweetRepository, HashtagRepository } from '../repository/index.js';
class TweetService {
    constructor(){
        this.TweetRepository = new TweetRepository();
        this.HashtagRepository = new HashtagRepository();
    }  

    async create(data) {
        const content = data.content; // content of data is taken
        const tweet = await this.TweetRepository.create(data);  // tweet created but i have to create hashtag also if not present in the db
        let tags = content.match(/#[a-zA-Z0-9_]+/g) // this regex extract hashtags 
            if(tags){
                tags.map((tag) => tag.substring(1))    // removed the '#' from all hashtags in from starting
                .map(tag => tag.toLowerCase());    // in db-> we will store our hashtags only in lowerCase
            

                let alreadyPresentTags = await this.HashtagRepository.findByName(tags) // will give whole object in which tags are already present
                let titleOfPresenttags = alreadyPresentTags.map(tags => tags.title);  // will give an array of already present tag
                
                let newTags = tags.filter(tag => !titleOfPresenttags.includes(tag)); // will give array of tags that are not present in db
                // converting the array of hashtags to object so that we can create the new hashtags
                newTags = newTags.map(tag => {
                    return {title: tag, tweets: [tweet.id]};
                })

                await this.HashtagRepository.bulkCreate(newTags);  // new hashtags are being created
                // adding tweets to already present hashtags 
                alreadyPresentTags.forEach((tag) => {
                    tag.tweets.push(tweet.id);
                    tag.save();
                });
            }
  
        return tweet;
    }

    async get(tweetId){
        const tweet = await this.TweetRepository.getWithComments(tweetId);
        return tweet;
    }
}

export default TweetService;
/**
 * this is my #first #tweet. I am reakky excited;
 */