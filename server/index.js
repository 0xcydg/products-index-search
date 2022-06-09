const express = require('express')
const bodyParser = require('body-parser')
const elastic = require('./elasticsearch/index')
const filter = require('./elasticsearch/filter')

const PORT = 3001
const app = express()

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

const getPageNumber = async () => {
   const count = await elastic.getIndexCount()
   const lastPage = Math.ceil(count / 100)
   return lastPage
}

app.get('/api/products/count', async (req, res) => {
   const count = await elastic.getIndexCount()
   res.json(count)
})

// EXPLAIN THIS IN PRESENTATION ON HOW WE RETRIEVE FROM AND SIZE FOR EACH PAGE
app.get('/api/products', async (req, res) => {
   const result = await elastic.getAllData()
   const products = result.map(product => product._source)
   res.json(products)
})

app.get('/api/products/page/:number', async (req, res) => {
   const pageNumber = parseInt(req.params.number)

   if (pageNumber > await getPageNumber()) {
      res.redirect('/products/page/1')
   } else {
      const from = (pageNumber - 1) * 100
      const result = await elastic.getDataByPage(from)
      const products = result.map(product => product._source)
      res.json(products)
   }
})

app.get('/api/products/product/:id', async (req, res) => {
   const id = req.params.id
   const result = await elastic.getDataById(id)
   const product = result[0]._source
   res.json(product)
})

app.get('/api/products/info/subcategories', async (req, res) => {
   const result = await elastic.getSubcategories()
   const allSubcategories = result.map((hit) => hit._source.subcategory)
   const uniqueSubcategories = [... new Set(allSubcategories)]
   res.json(uniqueSubcategories)
})

app.get('/api/products/filter', async (req, res) => {
   if (req.query.subcategory !== undefined) {
      const query = req.query.subcategory
      const splitQuery = query.split(',')
      const subcategories = splitQuery.map((item) =>
         item.replaceAll('_', ' ').replaceAll('and', '&')
      )
      const result = await filter.filterBySubcategory(subcategories)
      const products = result.map(product => product._source)
      res.json(products)
   } else {
      const minPrice = req.query.min_price
      const maxPrice = req.query.max_price
      const result = await filter.filterByPrice(minPrice, maxPrice)
      const products = result.map(product => product._source)
      res.json(products)
   }

})

app.get('/api/products/search', async (req, res) => {
   const query = req.query.name
   const result = await filter.filterByName(query)
   const products = result.map(product => product._source)
   res.json(products)
})

app.listen(PORT, () => console.log('listening on port', PORT))