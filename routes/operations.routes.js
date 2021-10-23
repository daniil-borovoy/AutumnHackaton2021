const {Router} = require('express')
const Operations = require('../models/operations.js')
const router = Router()

router.get('/get', async (req, res) => {
    try {
      const data = await Operations.find({})
      res.json(data)
    } catch (e) {
      res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова' })
    }
  })

module.exports = router
