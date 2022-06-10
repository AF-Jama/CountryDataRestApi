const express = require('express')
const {getAllCountries,getCountriesbyID,getSpecifiedCountries,requestARandomCountry,addCountry} = require('../controllers/countries_controller.js')

const router = express.Router()

router.get('/',(req,res)=>{
    
})

router.get('/all',getAllCountries) // returns all countries 

router.get('/name',getSpecifiedCountries)

router.get('/:id',getCountriesbyID) // returns country by id

router.get('/random',requestARandomCountry)

// post request 

router.post('/add',addCountry)

//put request

router.patch('/:id/update')


module.exports = router;