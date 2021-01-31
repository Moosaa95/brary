if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config({ path: '.env' })
}
const express = require('express')
const path = require('path')
const indexRouter = require('./routes/index')
const authorRouter = require('./routes/authors')
const mongoose = require('mongoose')
const app = express()

app.use(express.json())



mongoose.connect(process.env.DATABASE_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true

})
const db = mongoose.connection
db.on('error', error => console.log(error))
db.once('open', () => console.log('connected to mongoose'))
    //set engine 

app.set('views', path.join(__dirname, 'views'));
//app.set("views", __dirname + '/views')
app.engine('pug', require('pug').__express)
app.set("view engine", 'pug')
app.set("layout", "layouts/layout")
app.use(express.static('public'))

//extended: false
app.use(express.urlencoded({ limit: '10mb', extended: false }))
app.use(express.json())


//index rrouter 
app.use('/', indexRouter)
app.use('/authors', authorRouter)




const PORT = process.env.PORT || 3000
app.listen(PORT, () => console.log(`you are connectec to ${PORT}`))