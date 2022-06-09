const { Client } = require('@elastic/elasticsearch')

const client = new Client({ node: 'http://localhost:9200' })
const indexName = 'products'

// ALL APIs : https://www.elastic.co/guide/en/elasticsearch/reference/current/rest-apis.html

// SEARCH API

// https://www.elastic.co/guide/en/elasticsearch/reference/current/search-count.html

// GET /<target>/_count

const getIndexCount = async () => {
   const { count } = await client.count({
      index: indexName
   })
   return count
}

// https://www.elastic.co/guide/en/elasticsearch/reference/current/search-search.html


const getSubcategories = async () => {
   const result = await client.search({
      index: indexName,
      _source: ['subcategory'],
      size: 1000,
      query: {
         match_all: {}
      }
   })
   return result.hits.hits
}

// GET /<target>/_search <target> c'est l'indice, products dans notre cas.
// Pagination coté backend elasticsearch

const getDataByPage = async (_from) => {
   const result = await client.search({
      index: indexName,
      query: {
         match_all: {}
      },
      from: _from,
      size: 100
   })
   return result.hits.hits
}

const getAllData = async () => {
   const count = await getIndexCount()
   const result = await client.search({
      index: indexName,
      query: {
         match_all: {}
      },
      size: count
   })
   return result.hits.hits
}

const getDataById = async (_id) => {
   const result = await client.search({
      index: indexName,
      query: {
         match: {
            id: _id
         }
      },
   })
   return result.hits.hits
}

module.exports = { getDataByPage, getDataById, getIndexCount, getSubcategories, getAllData }