const express = require('express')
const logger = require('morgan')

const session = require("express-session");
const flash = require("connect-flash-plus");
const usePassport = require('./config/passport')
const exhbs = require('express-handlebars')
const bodyParser = require('body-parser')

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}
const methodOverride = require('method-override')
const routes = require('./routes')
require('./config/mongoose')

// server related variables
const app = express()
const port = process.env.PORT

// set handlebars configurations
app.engine('handlebars', exhbs({ defaultLayout: 'main' }))
// set the app to use the handlebars engine
app.set('view engine', 'handlebars')
app.use(logger('dev'))
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    
  })
);
// setting static files
app.use(express.static('public'))
// Use body parser
app.use(bodyParser.urlencoded({ extended: true }))
// Use method override
app.use(methodOverride('_method'))
usePassport(app)
app.use(flash())
app.use((req, res, next) => {
  res.locals.isAuthenticated = req.isAuthenticated()
  res.locals.user = req.user
  res.locals.success_msg = req.flash('success_msg')
  res.locals.warning_msg = req.flash('warning_msg')
  next()
})

app.use(routes)

// launching and listening the server
app.listen(port, () => {
  console.log(`Express is running on http://localhost:${port}`)
})
