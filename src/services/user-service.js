import { UserRepository } from "../repository/index.js";

class UserService {
    constructor() {
        this.UserRepository = new UserRepository();
    }

    async signup(data) {
        try {
            const user = await this.UserRepository.create(data);
            console.log("inside service", data);
            return user;           
        } catch (error) {
            throw(error)
        }
    }
}

export default UserService;