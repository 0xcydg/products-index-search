import SubcategoryFilter from "./SubcategoryFilter";
import PriceFilter from "./PriceFilter";
import '../../style/Filter.css'

function Filter({setMaxPage, setProducts, getAllProducts }) {
   
   return (
      <div className="filter-container">
         <SubcategoryFilter getAllProducts={getAllProducts} setProducts={setProducts} setMaxPage={setMaxPage} />
         <PriceFilter getAllProducts={getAllProducts} setProducts={setProducts} setMaxPage={setMaxPage} />
      </div>
   )
}

export default Filter