import User from '../models/user.js';
import CrudRepository from './crud-repository.js';

class UserRepository extends CrudRepository {
    constructor(){
        super(User);
    }

    async  findBy(data) {
        try {
            const response = await User.findOne(data);
            console.log("user in repository is ", response);
            return response;
        } catch (error) {
            console.log(error);
        }
    }
}

export default UserRepository;