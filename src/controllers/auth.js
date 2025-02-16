const Account = require("../models/account")

const validate = require("../validation/account")

module.exports = {
    login: async(req,res) => {

    }
    ,
    register: async(req,res) => {
        const { body } = req;
        
        const {err , value} = validate(body);

        if (err){
            return res.status(400).json({
                Statuscode: 400,
                message: err.message
            })
        }

        const acc  = await Account.create(value);
        return res.status(201).json(acc);
    }
    
}