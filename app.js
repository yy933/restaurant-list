const express = require('express')
const mongoose = require('mongoose')
const exhbs = require('express-handlebars')
const bodyParser = require('body-parser')
const methodOverride = require('method-override') 
const routes = require('./routes')

// 僅在非正式環境時, 使用 dotenv
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

// connect to mongoDB
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
// 取得資料庫連線狀態
const db = mongoose.connection
// 連線異常
db.on('error', () => {
  console.log('mongodb error!')
})
// 連線成功
db.once('open', () => {
  console.log('mongodb connected!')
})

// server related variables
const app = express();
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
app.use(methodOverride("_method"));

app.use(routes)  

// launching and listening the server
app.listen(port, () => {
  console.log(`Express is running on http://localhost:${port}`)
})
