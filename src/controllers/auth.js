const Account = require("../models/account")
const bcryptjs = require("bcryptjs")
const validate = require("../validation/account");
const ErrorResponse = require("../helpers/ErrorResponse")

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

        return res.status(200).json({
            StatusCode: 200,
            message: "Đăng nhập thành công"
        })
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