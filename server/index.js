require('dotenv').config({ path: __dirname + '/../.env' })
const express = require('express')
const session = require('express-session')
const massive = require('massive')
const authCtrl = require('./controllers/authController')
const treasureCtrl = require('./controllers/treasureController')
const auth = require('./middleware/authMiddleware')
const { 
    PORT,
    CONNECTION_STRING,
    SESSION_SECRET    
} = process.env

const app = express()

app.use(express.json())

massive(CONNECTION_STRING)
    .then(db => {
        app.set('db', db)
        console.log('db connected')
    })

app.use(
    session({
        resave: true,
        saveUninitialized: false,
        secret: SESSION_SECRET
    })
)

app.post('/auth/register', authCtrl.register)
app.post('/auth/login', authCtrl.login)
app.get('/auth/logout', authCtrl.logout)
app.get('/api/treasure/dragon', treasureCtrl.dragonTreasure)
app.get('/api/treasure/user', auth.usersOnly, treasureCtrl.getUserTreasure)

app.listen(PORT, () => {
    console.log(`Listening on Port ${PORT}`)
})