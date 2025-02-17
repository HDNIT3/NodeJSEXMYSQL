const Account = require("../models/account")
const ErrorResponse = require("../helpers/ErrorResponse")
const bcryptjs = require("bcryptjs")
const account = require("../validation/account")

module.exports = {
    GetALL: async (req,res) => {
        const [row , meta] = await Account.sequelize.query("SELECT * FROM account")

        if (!row){
            throw new ErrorResponse(400,"Lỗi kết nói dc dữ liệu")
        }

        res.send(row)
    }
    ,
    GetUserById: async (req,res) => {
        const {id} = req.params;

        const [row] = await Account.sequelize.query("SELECT * FROM account WHERE id = ?", {
            replacements: [id],
            type: Account.sequelize.QueryTypes.SELECT
        });

        if (!row){
            throw new ErrorResponse(400,"Không tìm thấy")
        }

        res.send(row)
    }
    ,
    DeleteUser: async (req,res) => {
        const {id} = req.params;

        const [row] = await Account.sequelize.query("SELECT * FROM account WHERE id = ?",{
            replacements: [id],
            type: Account.sequelize.QueryTypes.SELECT
        })

        if (!row){
            throw new ErrorResponse(400,"Không tìm thấy")
        }

        await Account.sequelize.query("DELETE FROM account WHERE id = ?",{
            replacements: [id],
            type: Account.sequelize.QueryTypes.DELETE
        })

        res.send({row,mes: "Xóa thành công"})

    }
    ,
    UpdateUser: async (req,res) =>{
        const {id} = req.params;

        const { username, email, password } = req.body

        const accusername = await Account.findOne({where: {username}})
        const accemail = await Account.findOne({where: {email}})

        if(accusername){
            throw new ErrorResponse("202","Đã tồn tại username")
        }

        if(accemail){
            throw new ErrorResponse("202","Đã tồn tại email")
        }

        passwords = await bcryptjs.hashSync(password, 10);

        try {
            await Account.sequelize.query(
                "UPDATE account SET username = ?, email = ?, password = ? WHERE id = ?",{
                replacements: [username,email,passwords,id],
                type: Account.sequelize.QueryTypes.UPDATE
            })
        } catch (error) {
            throw new ErrorResponse("400",error)
        }

        res.send({id, username, email, passwords})
    }

}