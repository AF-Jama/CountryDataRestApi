const pool = require('../config.js')


// controller functions for different endpoints

const getAllCountries = (req,res)=>{
    pool.getConnection((err, conn) => {
        if (err) throw err;
        conn.query('SELECT * FROM COUNTRYTABLE',(error,result,fields)=>{
            conn.release();
            if(error) throw error;
            res.send(result)

        })
    })
}

const getCountriesbyID = (req,res)=>{
    pool.getConnection((err, conn) => {
        if (err) throw err;
        const id = req.params.id
        conn.query('SELECT * FROM COUNTRYTABLE WHERE id = ?',id,(error,result,fields)=>{
            conn.release();
            if(error) throw error;
            res.send(result)

        })
    
    })
}

const getSpecifiedCountries = (req,res)=>{
    pool.getConnection((err, conn) => {
        if (err) throw err;
        const countries = req.query.name // gets query parameter 
        conn.query('SELECT * FROM COUNTRYTABLE WHERE name = ?',countries,(error,result,fields)=>{
            conn.release();
            if(error) throw error;
            res.send(result)

        })
    
    })
}

const requestARandomCountry = (req,res)=>{
    pool.getConnection((err, conn) => {
        if (err) throw err;
        console.log("HERE 1")
        conn.query('SELECT * FROM COUNTRYTABLE ORDER BY RAND() LIMIT 1',(error,result,fields)=>{
            conn.release();
            console.log('HERE 2')
            if(error) throw error;
            console.log("Here 3")
            res.send(result)

        })
    })
}

const addCountry = (req,res)=>{
    // controller to add a user created country to the database
}

module.exports = {
    getAllCountries,
    getCountriesbyID,
    getSpecifiedCountries,
    requestARandomCountry,
    addCountry
}


