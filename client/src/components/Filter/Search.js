import { useState } from "react"

function Search({ setMaxPage, setProducts, getAllProducts }) {
   const [searchInput, setSearchInput] = useState('')

   const onClickSearch = () => {
      if (searchInput !== '') {
         fetch(`/api/products/search?name=${searchInput}`)
            .then(response => response.json())
            .then(data => {
               if (data.length !== 0) {
                  setMaxPage(Math.ceil(data.length / 100) - 2)
                  setProducts(data)
               }
               else {
                  getAllProducts()
               }
            })
      } else {
         getAllProducts()

      }

   }

   return (
      <div className='search-container'>
         <input onInput={(e) => setSearchInput(e.target.value)} className='search-bar' placeholder='Type anything...' />
         <button onClick={onClickSearch} className='search-button'>SEARCH</button>
      </div>
   )
}

export default Search