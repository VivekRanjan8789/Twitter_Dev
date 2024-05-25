import { LikeRepository, TweetRepository } from "../repository/index.js";

class LikeService {
  constructor() {
    // Instantiate the repositories
    this.LikeRepository = new LikeRepository();
    this.TweetRepository = new TweetRepository();
  }

  async toggleLike(modelId, modelType, userId) {
    if (modelType === 'Tweet') {
      // Ensure that populate is called on a valid Mongoose query
      var likeable = await this.TweetRepository.find(modelId);
    } else if (modelType === 'Comment') {
      // TODO: Handle comments (left as is)
    } else {
      throw new Error('unknown model type');
    }

    // Check if the like already exists
    const exists = await this.LikeRepository.findByUserAndLikable({
      user: userId,
      onModel: modelType,
      likeable: modelId
    });

    if(exists) { // If already liked, then remove
      likeable.likes.pull(exists.id);
      await likeable.save();
      await exists.deleteOne();
      var isAdded = false;
    } else { // If not already liked, then create a like in the like model
      const newLike = await this.LikeRepository.create({
        user: userId,
        onModel: modelType,
        likeable: modelId
      });
      likeable.likes.push(newLike);
      await likeable.save();
      var isAdded = true;
    }
    return isAdded;
  }
}

export default LikeService;
