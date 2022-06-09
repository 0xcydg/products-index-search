const elastic = require('./index')
const { Client } = require('@elastic/elasticsearch')

const client = new Client({ node: 'http://localhost:9200' })

const indexName = 'products'

const filterByName = async (name) => {
   const indexSize = await elastic.getIndexCount()

   const result = await client.search({
      index: indexName,
      query: {
         match: {
            name: name
         }
      },
      size: indexSize
   })
   return result.hits.hits
}

const filterBySubcategory = async (queryArray) => {
   const indexSize = await elastic.getIndexCount()

   const matchQuery = queryArray.map(item => (
      { match_phrase: { subcategory: item } }
   ))

   const result = await client.search({
      index: indexName,
      query: {
         bool: {
            should: matchQuery,
            minimum_should_match: 1
         }
      },
      size: indexSize
   })
   return result.hits.hits
}

const filterByPrice = async (min, max) => {
   const indexSize = await elastic.getIndexCount()
   const result = await client.search({
      index: indexName,
      query: {
         bool: {
            must: {
               range: {
                  current_price: {
                     gte: min,
                     lte: max
                  }
               }
            }
         }
      },
      size: indexSize
   })
   return result.hits.hits
}


module.exports = { filterBySubcategory, filterByPrice, filterByName }
