import './style.scss';
import React, { useState } from 'react';
import Pagination from "react-js-pagination";

const Main = (props) => {
    const [currentPage, setCurrentPage] = useState(1);
    const setCurrentPageNo = (pageNumber) => {
        setCurrentPage(pageNumber);
    }
    return (
        <div className="pagination">
            <Pagination
                activePage={currentPage}
                itemsCountPerPage={4}
                totalItemsCount={4}
                onChange={setCurrentPageNo}
                firstPageText={'First'}
                prevPageText={'Prev'}
                nextPageText={'Next'}
                lastPageText={'Last'}
                itemClass='page-item'
                linkClass='page-link'
            >
            </Pagination>
        </div>
    )
}

Main.displayName = 'PaginationComponent'
//Pre process the container with Redux Plugins
export default Main;