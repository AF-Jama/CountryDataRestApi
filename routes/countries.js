const express = require('express')
const {getAllCountries,getCountriesbyID,getSpecifiedCountries,requestaRandomCountry,addCountry,updateCountry,deleteCountry} = require('../controllers/countries_controller.js')
const { Validator } = require("express-json-validator-middleware");

const {validate} = new Validator()
const {countrySchema,patchCountrySchema} = require('../middleware/json_validator.js');
const { valid } = require('joi');

const router = express.Router()

router.get('/',(req,res)=>{
    res.send({
        msg:"Hello"
    })
    
})

router.get('/all',getAllCountries) // returns all countries 

router.get('/name',getSpecifiedCountries)

router.get('/:id',getCountriesbyID) // returns country by id

router.get('/rands',requestaRandomCountry)

// post request 
    
router.post('/add',validate({body:countrySchema}),addCountry) // middleware that validates post 

//put request

router.put('/update/:countryName',validate({body:patchCountrySchema}),updateCountry)

router.delete('/delete/:id',deleteCountry)


module.exports = router;