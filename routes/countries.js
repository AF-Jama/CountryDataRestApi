const express = require('express')
const {getAllCountries,getCountriesbyID,getSpecifiedCountries,requestaRandomCountry,addCountry,updateCountry,deleteCountry} = require('../controllers/countries_controller.js')
const { Validator } = require("express-json-validator-middleware");
const validator = require('express-joi-validation').createValidator({})
const {countrySchema,patchCountrySchema} = require('../schema.js')

const {validate} = new Validator()
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
    
router.post('/add',validator.body(countrySchema),addCountry) // middleware that validates post payload

//put request

router.put('/update/:countryName',validator.body(patchCountrySchema),updateCountry)

router.delete('/delete/:id',deleteCountry)


module.exports = router;