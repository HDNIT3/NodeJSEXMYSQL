const Account = require("../models/account")
const bcryptjs = require("bcryptjs")
const validate = require("../validation/account");
const ErrorResponse = require("../helpers/ErrorResponse")
const jwt = require("jsonwebtoken")
require("dotenv").config()

module.exports = {
    login: async(req,res) => {
        const {username , password} = req.body;

        const usersEnter = await Account.findOne({where: { username } })

        if(!usersEnter){
            throw new ErrorResponse(400,"Tài khoản hoặc mật khẩu không đúng")
        }

        const checkpass = bcryptjs.compareSync(password,usersEnter.password)

        if(!checkpass){
            throw new ErrorResponse(400,"Tài khoản hoặc mật khẩu không đúng")
        }

        try {
            const payload = {
                username,
                email: usersEnter.email,
                phone: usersEnter.phone
            }
    
            const Webtoken = jwt.sign(
                payload,
                process.env.JWT,
                {
                    expiresIn: "30s"
                }
            )

            return res.status(200).json({
                StatusCode: 200,
                AccessToken: Webtoken,
                message: "Đăng nhập thành công",
                user :{
                    user: username,
                    email: usersEnter.email
                }
            })

        } catch (error) {
            throw new ErrorResponse("400","Lỗi Jwt")
        }
    }
    ,
    register: async(req,res) => {
        const { body } = req;
        
        const {error , value} = validate(body);
        
        const usersEnter = await Account.findOne({where: { username: body.username } })
        const usersEnter1 = await Account.findOne({where: { email: body.email } })

        if (usersEnter){
            throw new ErrorResponse(400, "User đã tồn tại");
        }
        
        if (usersEnter1){
            throw new ErrorResponse(400, "Email đã tồn tại");
        }

        if (error){
            throw new ErrorResponse(400,error.message)
        }
        
        const acc  = await Account.create(value);
        return res.Status(201).json(acc);
    }
    
}