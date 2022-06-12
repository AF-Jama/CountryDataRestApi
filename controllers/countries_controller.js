const { body } = require('express-validator');
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
        console.log(`Countries query is ${countries}`)
            conn.query(`SELECT * FROM COUNTRYTABLE WHERE name=?`,countries,(error,result,fields)=>{
                conn.release();
                if(error) throw error;
                res.send(result)
            })
        })
}


function requestaRandomCountry(req,res){
    pool.getConnection((err, conn) => {
        if (err) throw err;
        console.log("HERE 1")
        conn.query('SELECT * FROM COUNTRYTABLE ORDER BY RAND() LIMIT 1',(error,result,fields)=>{
            conn.release();
            console.log('HERE 2')
            if(error){
                console.log("There was an error")
            }
            console.log("Here 3")
            res.send(result)

        })
    })
}

const updateCountry = (req,res)=>{
    pool.getConnection((err, conn) => {
        if (err) throw err;
        const countryName = req.params.countryName;
        conn.query('UPDATE COUNTRYTABLE SET ? WHERE NAME = ?',[req.body,countryName],(error,result,fields)=>{
            conn.release();
            if(error){
                return res.status(404).json({
                    msg:"Unable to update country"
                })
            }
            res.send({
                msg:`Succesfully updated country`
            })

        })
    })
}

// const requestARandomCountry = (req,res)=>{
//     pool.getConnection((err, conn) => {
//         if (err) throw err;
//         console.log("HERE 1")
//         conn.query('SELECT * FROM COUNTRYTABLE ORDER BY RAND() LIMIT 1',(error,result,fields)=>{
//             conn.release();
//             console.log('HERE 2')
//             if(error){
//                 console.log("There was an error")
//             }
//             console.log("Here 3")
//             res.send(result)

//         })
//     })
// }

//INSERT INTO COUNTRYTABLE(name,Population,) VALUES(?,?,?,?,?,?,?,?,?,?,?)

const addCountry = (req,res)=>{
    // controller to add a user created country to the database
    pool.getConnection((err, conn) =>{
        if (err) throw err;
        conn.query('INSERT INTO COUNTRYTABLE SET ?',req.body,(error,result,fields)=>{
            conn.release();
            // error handling insertion into database
            if(error){
                res.status(400).send({
                    msg:"Could not add country"
                })
            }else{
                res.send({
                    msg:"Succesfully added country",
                    body:req.body
                })
            }

        })
    })
}

module.exports = {
    getAllCountries,
    getCountriesbyID,
    getSpecifiedCountries,
    requestaRandomCountry,
    addCountry,
    updateCountry
}



