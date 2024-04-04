const express=require('express')
const path=require('path')
const cookieParser=require('cookie-parser')
const {connectToMongoDb}=require('./connect')
const {restrictToLoggedInUserOnly,checkAuth}=require('./middleware/auth')

const URL=require('./models/url')


const urlRoute=require('./routes/url')
const staticRoute=require('./routes/staticRouter')
const userRoute=require('./routes/users')

const app=express()
const port=8000

connectToMongoDb("mongodb://127.0.0.1:27017/short-url")
.then(()=>console.log("MongoDb Connected"))

app.set("view engine",'ejs')
app.set('views',path.resolve('./views'))

app.use(express.json())
app.use(express.urlencoded({extended:false}))
app.use(cookieParser())

app.use('/url',restrictToLoggedInUserOnly,urlRoute)
app.use('/',staticRoute)
app.use('/user',checkAuth,userRoute)

app.listen(port,()=>console.log(`Server started at PORT: ${port}`))