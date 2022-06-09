const mysql = require('mysql')
const util = require("util")

const connection = mysql.createConnection({
   host: 'localhost',
   user: 'root',
   password: 'root',
   database: 'men-products'
})

connection.query = util.promisify(connection.query).bind(connection)

async function getAllProducts() {
   let products = null
   await connection.query('SELECT * FROM `men` LIMIT 200')
      .then(result => products = result)
      .catch(err => { throw err })
   return products
}

async function getProductById(id) {
   let product = null
   await connection.query('SELECT * FROM `men` WHERE `id` = ?', [id])
      .then(result => product = result)
      .catch(err => { throw err })
   return product
}

module.exports = { getAllProducts, getProductById }

