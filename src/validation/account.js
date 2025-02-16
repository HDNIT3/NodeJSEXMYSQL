const joi = require('joi')

const accountvalidation = joi.object({
    usesname: joi.string().alphanum().min(4).required(),
    password: joi.string().min(4).max(10).required(),
    email: joi.string().email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } } ),
    phone: joi.string().min(10).max(10).required()
})


module.exports = (acc) => accountvalidation.validate(acc)