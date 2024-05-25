import UserService from "../services/user-service.js";

const userService  = new UserService();

export const signup = async (req, res) => {
    try {
        const response = await userService.signup({
            email: req.body.email,
            password: req.body.password,
            name: req.body.name
        })
        console.log("inside controller ", response);
        return res.status(200).json({
            success: true,
            message: "created a new user successfull",
            data: response,
            err: {},

       });
    } catch (error) {
        return res.status(500).json({
            message: 'something went wrong',
            data: {},
            success: false,
            err: error
        })
    }         
}