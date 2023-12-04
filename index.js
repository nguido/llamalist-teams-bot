require('dotenv').config()

const express = require('express')
const app = express()
const server = require('http').createServer(app)
const port = process.env.PORT || 3333
const bodyParser = require('body-parser')
const { adapter } = require('./adapter.js')
const { MessageExtension } = require('./message-extension.js')
const errorHandler = require('./error.js')

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

const messageExtension = new MessageExtension()

app.post('/api/messages', (req, res) => {
    try {
        adapter.processActivity(req, res, async (context) => {
            await messageExtension.run(context)
        })
    } catch (error) {
        console.log('Error occured in the adapter: ')
        console.log(error)
    }
})

app.use((req, res, next) => {
    let err = new Error('Not Found')
    err.status = 404
    next(err)
})

app.use(errorHandler)

server.listen(port, () => {
    console.log('App is running on port ' + port)
})
