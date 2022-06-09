import '../style/ProductThumbnail.css'
import { Fragment } from 'react'

function ProductThumbnail({ item }) {
   return (
      <Fragment>
         <h4 className='product-title'>{item.name}</h4>
         <img className='product-image' src={item.variation_0_thumbnail} alt='PRODUCT IMAGE' />
         <div className='product-price'>${item.current_price}</div>
      </Fragment>
   )
}

export default ProductThumbnail