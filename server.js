const express = require('express')
const bodyParser = require('body-parser')
const MongoClient = require('mongodb').MongoClient
const connectionString = 'mongodb+srv://jaredgutkin:AuaCJPGcYZ7oN7pj@cluster0.aefjsut.mongodb.net/?retryWrites=true&w=majority'
const app = express()



MongoClient.connect(connectionString, { useUnifiedTopology: true})
    .then(client => {
        console.log('conected to database')
        const db = client.db('star-wars-quotes')
        const quotesCollection = db.collection('quotes')

        app.set('view engine', 'ejs')

        app.use(bodyParser.urlencoded({ extended: true}))
        app.use(express.static('public'))

        app.get('/', (req, res) => {
            db.collection('quotes').find().toArray()
                .then(results => {
                    res.render('index.ejs', { quotes: results })
                })
                .catch()
        })

        app.post('/quotes', (req, res) => {
            quotesCollection.insertOne(req.body)
            .then(result => {
                res.redirect('/')
            })
            .catch(error => console.error(error))
        })
        
        app.listen(3000, function(){
            console.log('listening on 3000')
        })
    })
    .catch(console.error)








