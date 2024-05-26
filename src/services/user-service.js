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

    async getUserByEmail(email){
        try {
            const user = await this.UserRepository.findBy({email});
            return user
        } catch (error) {
            throw error;
        }
    }

    async signin(data){
        try {
            const user = await  this.getUserByEmail(data.email);
            if(!user){
                throw {
                    message: 'no user found'
                }
            }
            if(!user.comparePassword(data.password)){
                throw {
                    messaage: 'incorrect password'
                }
            }
            const token = user.genJWT();
            return token
            
        } catch (error) {
            throw error;
        }
    }
}
    
export default UserService;