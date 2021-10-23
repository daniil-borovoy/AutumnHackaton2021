const {Router} = require('express')
const Operations = require('../models/operations.js')
const router = Router()



// /api/get
router.get('/get', async (req, res) =>{
    try {

        const test = await Operations.find({})

        console.log(test[190]) // W.I.P.

        res.status(201).json({message: 'Успешно'})


    } catch (e) {
        res.status(500).json({message: 'Что-то пошло не так, попробуйте снова'})
        console.log(e)
        console.log(req.body)
    }
})

module.exports = router
