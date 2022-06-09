import { Fragment, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import '../style/Pagination.css'
function Pagination({ totalCount, currentPage, setCurrentPage }) {
   const nextPage = currentPage + 1
   const prevPage = currentPage - 1

   const goToPreviousPage = () => {
      setCurrentPage(prevPage)
   }

   const goToNextPage = () => {
      setCurrentPage(nextPage)
   }

   const changePage = (e) => {
      const page = parseInt(e.target.innerText)
      setCurrentPage(page)
   }

   return (
      <div className='pagination-container'>
         {currentPage !== 1 ?
            <button onClick={goToPreviousPage}>← Previous</button> : null
         }
         {
            currentPage <= 2 ?
               <Fragment>
                  {currentPage === 2 ?
                     <Fragment>
                        <button>1</button>
                     </Fragment> : null
                  }
               </Fragment> :
               <Fragment>
                  <button onClick={(e) => changePage(e)}>1</button>
                  <span> ... </span>
                  <button onClick={(e) => changePage(e)}>{prevPage}</button>
               </Fragment>
         }
         <button className='current-page'>{currentPage}</button>
         {
            currentPage >= totalCount - 1 ?
               <Fragment>
                  {currentPage === totalCount - 1 ?
                     <Fragment>
                        <button>{totalCount}</button>
                     </Fragment> : null
                  }
               </Fragment> :
               <Fragment>
                  <button onClick={(e) => changePage(e)}>{nextPage}</button>
                  <span> ... </span>
                  <button onClick={(e) => changePage(e)}>{totalCount}</button>
               </Fragment>
         }
         {currentPage !== totalCount ?
            <button onClick={goToNextPage}>Next →</button> : null
         }
      </div>
   )
}

export default Pagination