const express = require('express')
require('dotenv').config()
const app = express()
const bodyParser = require('body-parser')

// middleware 

app.use(bodyParser.json())

app.use('/v0/country',require('./routes/countries.js')) // API base

app.get('/',(req,res)=>{
    res.send('Base index')
})







app.listen(process.env.PORT,()=>{
    console.log(`Server is listening on port ${process.env.PORT}`)
})



