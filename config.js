// config database connection
const {createPool} = require('mysql')
require('dotenv').config()


const pool = createPool({
    database:'countriesdb',
    user:'root',
    password:process.env.PASSWORD,
})

// pool.getConnection((err, conn) => {
//     if (err) throw err;
//     console.log("No error",conn)
// })

module.exports = pool; 