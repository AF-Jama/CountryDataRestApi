const { body } = require('express-validator');
const pool = require('../config.js')

// caching 
const NodeCache = require( "node-cache" );
const myCache = new NodeCache({
    checkperiod:300    
});

// controller functions for different endpoints

const getAllCountries = (req,res)=>{
    if (myCache.has('all')){
        console.log("FROM CACHE")
        return res.send(myCache.get('all'))
    }; // return cached result

    pool.getConnection((err, conn) => {
        if (err) throw err;
        conn.query('SELECT * FROM COUNTRYTABLE',(error,result,fields)=>{
            conn.release();
            if(error){
                error.status = 404;
                error.message = `Could not get all countries`
                next(error) // triggers error handler middleware
            };
            myCache.set('all',result) // sets cache 
            return res.send(result)

        })
    })
}

const getCountriesbyID = (req,res,next)=>{
    if (myCache.has(req.params.id)) return res.send(myCache.get(req.params.id)) // cache with the key that references id
    pool.getConnection((err, conn) => {
        if (err) throw err;
        const id = req.params.id
        conn.query('SELECT * FROM COUNTRYTABLE WHERE id = ?',id,(error,result,fields)=>{
            conn.release();
            if(error){
                error.status = 404;
                error.message = `Could not get country as id ${id} does not exist`
                next(error) // triggers error handler middleware
            }
            myCache.set(id,result) // sets cache
            res.send(result)

        })
    
    })
}

const getSpecifiedCountries = (req,res,next)=>{
    if (myCache.has(req.query.name)) return res.send(myCache.get(req.query.name))
    pool.getConnection((err, conn) => {
        if (err) throw err;
        const countries = req.query.name // gets query parameter 
        console.log(`Countries query is ${countries}`)
            conn.query(`SELECT * FROM COUNTRYTABLE WHERE name=?`,countries,(error,result,fields)=>{
                conn.release();
                if(error){
                    error.status = 404;
                    error.message = `Could not find resource with country name`
                    next(error)
                }
                myCache.set(req.query.name,result)
                res.send(result)
            })
        })
}


function requestaRandomCountry(req,res,next){
    pool.getConnection((err, conn) => {
        if (err) throw err;
        console.log("HERE 1")
        conn.query('SELECT * FROM COUNTRYTABLE ORDER BY RAND() LIMIT 1',(error,result,fields)=>{
            conn.release();
            if(error){
                error.message = "Error with requesting random country"
                next(error) // triggers error handler middleware
            }
            return res.send(result)

        })
    })
}

const updateCountry = (req,res,next)=>{
    pool.getConnection((err, conn) => {
        if (err) throw err;
        const countryName = req.params.countryName;
        conn.query('UPDATE COUNTRYTABLE SET ? WHERE NAME = ?',[req.body,countryName],(error,result,fields)=>{
            conn.release();
            if(error){
                // return res.status(404).json({
                //     msg:"Unable to update country"
                // })
                error.status = 500;
                error.message = "Could not update country"
                next(error) // triggers error handler middleware
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

const addCountry = (req,res,next)=>{
    // controller to add a user created country to the database
    pool.getConnection((err, conn) =>{
        if (err) throw err;
        conn.query('INSERT INTO COUNTRYTABLE SET ?',req.body,(error,result,fields)=>{
            conn.release();
            // error handling insertion into database
            if(error){
                // res.status(400).send({
                //     msg:"Could not add country"
                // })
                error.status = 404;
                error.message = "Could not add country. Probably due to the country already existing"
                next(error)
            }else{
                return res.send({
                    msg:"Succesfully added country",
                    body:req.body
                })
            }

        })
    })
}

const deleteCountry = (req,res,next)=>{
    pool.getConnection((err, conn) =>{
        if (err) throw err;
        let id = req.params.id;
        id = parseInt(id)
        if(id>202){
            conn.query('DELETE FROM COUNTRYTABLE WHERE id = ?',id,(error,result,fields)=>{
                if(!error){ // triggered when query is succesful
                    return res.send({
                        msg:"Resource succesfully deleted",
                    })
                }
                error.status = 500;
                error.message = "Unable to delete resource as it does not exist"
                next(error)
            })
        }else{
            res.send({
                msg:"Cannot delete preset resources"
            })
        }
    })
}

module.exports = {
    getAllCountries,
    getCountriesbyID,
    getSpecifiedCountries,
    requestaRandomCountry,
    addCountry,
    updateCountry,
    deleteCountry
}



