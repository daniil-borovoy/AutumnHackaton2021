const {Schema, model} = require('mongoose')

const schema = new Schema({
    type: {type: String},
    date: {type: Number},
    tranDate: {type: Number},
    operationType: {type: String},
    amount: {type: Number},
    comment: {type: String},
    accountNumber: {type: Number},
    currencyCodeNumeric: {type: Number},
    merchantName: {type: String},
    fastPaymentData: {
        foreignName: {type: String},
        foreignPhoneNumber: {type: Number},
        foreignBankBIC: {type: Number},
        foreignBankID: {type: Number},
        foreignBankName: {type: String},
        documentComment: {type: String}
    },
    MCC: {type: Number}
})

module.exports = model('Operations', schema)