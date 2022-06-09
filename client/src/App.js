import Products from './components/Products'
import Filter from './components/Filter/Filter'
import Search from './components/Filter/Search'

import './style/App.css'
import { useEffect, useState } from 'react'

function App() {
  const [products, setProducts] = useState([])
  const [maxPage, setMaxPage] = useState(null)

  useEffect(() => {
    console.log('test')
    getAllProducts()
  }, [])

  const getAllProducts = () => {
    fetch(`/api/products`)
      .then(response => response.json())
      .then(products => {
        setProducts(products)
        setMaxPage(Math.ceil(products.length / 100) - 2)
      })
  }

  return (
    <div>
      <h1>PRODUCTS LIST</h1>
      <Search setMaxPage={setMaxPage} setProducts={setProducts} getAllProducts={getAllProducts}/>
      <div className='flex-container'>
        <Filter getAllProducts={getAllProducts} setMaxPage={setMaxPage} setProducts={setProducts} />
        <Products maxPage={maxPage} products={products} setProducts={setProducts} />
      </div>
    </div>
  );
}

export default App;
