import { useEffect, useState } from "react"
import { useNavigate } from 'react-router-dom'

function SubcategoryFilter({ setMaxPage, setProducts, getAllProducts }) {
   const [subcategories, setSubcategories] = useState(null)
   const [selectedSubcategories, setSelectedSubcategories] = useState([])

   useEffect(() => {
      getSubcategories()
   }, [])

   const getSubcategories = () => {
      fetch('/api/products/info/subcategories')
         .then(response => response.json())
         .then(subcategories => setSubcategories(subcategories))
   }

   const handleClick = (e) => {
      const { name } = e.target
      if (selectedSubcategories.length > 0) {
         selectedSubcategories.forEach(item => {
            if (item == name) {
               setSelectedSubcategories(selectedSubcategories.filter(item => item !== name))
            } else {
               setSelectedSubcategories([...selectedSubcategories, name])
            }
         })
      } else {
         setSelectedSubcategories([name])
      }
   }

   const onClickApply = () => {
      const queryArray = selectedSubcategories.map(item => item.replaceAll('&', 'and').replaceAll(' ', '_'))
      const queryString = queryArray.join(',')
      fetch(`/api/products/filter?subcategory=${queryString}`)
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
         <legend>Subcategories</legend>
         {
            subcategories ?
               subcategories.map((item) => (
                  <div key={item}>
                     <input type="checkbox" id={item} name={item} onChange={handleClick} />
                     <label htmlFor={item}>{item}</label>
                  </div>
               )) :
               null
         }
         <button className="filter-button" onClick={onClickApply}>Apply</button>
      </fieldset>
   )
}

export default SubcategoryFilter