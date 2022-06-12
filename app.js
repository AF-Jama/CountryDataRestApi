const express = require('express')
require('dotenv').config()
const app = express()
// const bodyParser = require('body-parser')

// middleware 

// app.use(bodyParser.json())
app.use(express.urlencoded({extended:false}))
app.use(express.json()) // to parse incoming json payload

// custom middleware

// app.use((req,res,next)=>{
//     console.log("Logger 1")
//     next()
// })

// app.use((req,res,next)=>{
//     console.log("Logger 2")
//     next()
// })




// app.use((req,res,next)=>{
//     console.log("Logger 3")
//     next()
// })


app.use('/v0/country',require('./routes/countries.js')) // API base

app.get('/',(req,res)=>{
    console.log("HERE")
    res.status(200).send({
        msg:"Base url"
    })
})


// // error handler 
// app.use((err,req,res,next)=>{
//     res.status(err.status).send('Something broke!')
// })



app.listen(process.env.PORT,()=>{
    console.log(`Server is listening on port ${process.env.PORT}`)
})



