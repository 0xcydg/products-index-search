import { Fragment, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import '../style/Product.css'

function Product() {
   const { productId } = useParams()
   const [product, setProduct] = useState(null)

   useEffect(() => {
      getProductById(productId)
   }, [])

   function getProductById(id) {
      fetch(`/api/products/product/${id}`)
         .then(response => response.json())
         .then(product => setProduct(product))
   }

   return (
      <div>
         {product === null ?
            <p>Loading...</p> :
            <div className='container'>
               <img
                  className='product-image'
                  src={product.variation_0_thumbnail}
                  alt='PRODUCT IMAGE' />
               <div className='product-info'>
                  <div className='product-subcategory'>{product.subcategory}</div>
                  <div className='product-name'>{product.name}</div>
                  <div className='product-model'>{product.model}</div>
                  <hr className='divider' />
                  <div className='product-likes'>
                     <img className='like-icon' src={require('../assets/like.png')} />
                     <div>{product.likes_count}</div>
                  </div>
                  <hr className='divider' />
                  <div className='price-container'>
                     <div className='product-current-price'>${product.current_price}</div>
                     <div className='product-raw-price'>${product.raw_price}</div>
                     <div className='product-discount'>-{product.discount}%</div>
                  </div>
               </div>
            </div>
         }
      </div>
   )
}

export default Product;