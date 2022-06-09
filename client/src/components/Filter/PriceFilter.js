import { useState } from "react"

function PriceFilter({ setMaxPage, setProducts, getAllProducts  }) {
   const [minInput, setMinInput] = useState('')
   const [maxInput, setMaxInput] = useState('')

   const onClickApply = () => {
      fetch(`/api/products/filter?min_price=${minInput}&max_price=${maxInput}`)
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
   }

   return (
         <fieldset>
            <legend>Price</legend>
            <div>
               <label htmlFor='min-price'>Min Price</label>
               <input className="price-input" id='min-price' name='min-price' onInput={(e) => setMinInput(e.target.value)} />
            </div>
            <div>
               <label htmlFor='max-price'>Max Price</label>
               <input className="price-input" id='max-price' name='max-price' onInput={(e) => setMaxInput(e.target.value)} />
            </div>
            <button className="filter-button" onClick={onClickApply}>Apply</button>
         </fieldset>
   )
}

export default PriceFilter