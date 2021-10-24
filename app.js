const express = require('express')
const config = require('config')
const path = require('path')
const mongoose = require('mongoose')

const app = express()


app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.use('/api', require('./routes/operations.routes'))

if (process.env.NODE_ENV === 'production') {
    app.use('/', express.static(path.join(__dirname, 'frontend', 'build')))

    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html'))
    })
}

const PORT = config.get('port') || 5000

async function start(){
    try {
        await mongoose.connect(config.get('mongoUri'), {
            useNewUrlParser: true,
        })
        app.listen(PORT, () => console.log(`Приложение запущено. Порт:  ${PORT}...`))
    } catch (e) {
        console.log('Server Error', e.message)
        process.exit(1)
    }
}

start()