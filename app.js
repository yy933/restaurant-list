const express = require('express')
const exhbs = require('express-handlebars')
const bodyParser = require('body-parser')
const methodOverride = require('method-override')
const routes = require('./routes')
require('./config/mongoose')

// server related variables
const app = express()
const port = 3000

// set handlebars configurations
app.engine('handlebars', exhbs({ defaultLayout: 'main' }))
// set the app to use the handlebars engine
app.set('view engine', 'handlebars')
// setting static files
app.use(express.static('public'))
// Use body parser
app.use(bodyParser.urlencoded({ extended: true }))
// Use method override
app.use(methodOverride('_method'))

app.use(routes)

// launching and listening the server
app.listen(port, () => {
  console.log(`Express is running on http://localhost:${port}`)
})
