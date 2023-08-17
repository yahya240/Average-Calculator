const express = require('express')
const app = express()

const db = require('./config/db')
const webRouter = require('./routes/web')
const apiRouter = require('./routes/api')

const session = require('express-session')
const methodOverride = require('./middlewares/methodOverride')
const sessionErrors = require('./middlewares/sessionErrors')
const withMiddleware = require('./middlewares/withMiddleware')

app.use(express.urlencoded({ extended: false }))
app.use(express.json())

app.use(express.static('public'))
app.set('view engine', 'ejs')

app.use(session({
    secret: 'yahya',
}))
app.use(methodOverride)
app.use(sessionErrors)
app.use(withMiddleware)

app.use('/', webRouter)
app.use('/api', apiRouter)

app.all('/*', (req, res) => {
    res.status(404).render('errors/error-404')
})

const connectDB = async () => {
    try {
        await db.sync({ force: false })
        console.log('connected to database successfuly...');
        app.listen(5000, () => {
            console.log('server is running on port 5000...');
        })
    } catch (error) {
        console.log(error);
    }
}

connectDB()

