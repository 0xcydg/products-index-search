import ProductThumbnail from "./ProductThumbnail"
import Pagination from "./Pagination"
import { Fragment, useEffect, useState } from 'react'
import { Link, useParams, useNavigate } from 'react-router-dom'

function Products({ maxPage, products  }) {
   const [currentProducts, setCurrentProducts] = useState(null)
   const [currentPage, setCurrentPage] = useState(1)

   useEffect(() => {
      setCurrentProducts(products.splice((currentPage - 1) * 100, 100))
      console.log(currentProducts)
   }, [products, currentPage])

   return (
      <div>
         <Pagination currentPage={currentPage} totalCount={maxPage} setCurrentPage={setCurrentPage} />
         {
            currentProducts ?
               <div className='products-container'> {
                  currentProducts.map((product) => (
                     <Fragment key={product.id}>
                        <Link
                           className='product-container'
                           to={`/products/product/${product.id}`}

                        >
                           <ProductThumbnail item={product} />
                        </Link>
                     </Fragment>
                  ))
               }
               </div> :
               <div>Loading...</div>
         }
      </div>
   )
}

export default Products