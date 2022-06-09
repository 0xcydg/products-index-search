import { useState, useEffect } from "react";
import SweetPagination from "sweetpagination";

function Items() {
  const [currentPageData, setCurrentPageData] = useState(new Array(2).fill());
  // Example items, to simulate fetching from another resources.
  useEffect(() => {
    // getProductsByPage()
    // fetch('/api/products/count')
    //   .then(response => response.json())
    //   .then(count => {
    //     const _maxPage = Math.ceil(count / 100)
    //     if (_maxPage < maxPage) {
    //       navigate('/products', { replace: true })
    //     } else {
    //       setMaxPage(maxPage)
    //     }
    //   })
    fetch(`/api/products/products`)
      .then(response => response.json())
      .then(products => console.log(products))
  }, [])
  return (
    <div>
      {currentPageData.map((item) => (
        <div>
          <h3>Item #{item}</h3>
        </div>
      ))}

      <SweetPagination
        currentPageData={setCurrentPageData}
        dataPerPage={10}
        getData={items}
        navigation={true}
      />
    </div>
  );
}