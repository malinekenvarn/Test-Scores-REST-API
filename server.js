require('dotenv').config()

//create server with express
const express = require('express')
const app = express()


//connect database
const mongoose = require('mongoose')
mongoose.connect(process.env.DATABASE_URL,  { useNewUrlParser: true, useUnifiedTopology: true })
const db = mongoose.connection

db.on('error', (err)=>{
    console.log(err)
});
db.once('open',()=>{
    console.log('Connected to Mongoose')
})

app.use(express.json())

//set upp routes
const studentRouter = require('./routes/students')
app.use('/students', studentRouter)


//listen to port
app.listen(3000, ()=>{
    console.log('Server listens on port 3000')
})