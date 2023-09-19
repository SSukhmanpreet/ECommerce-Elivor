import './style.scss';
import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useEffect, useState } from 'react';
import PaginationComponent from '../../components/paginationComponent';
import ProductCard from '../../components/productCard';
import { useParams } from 'react-router-dom';

const Main = () => {
    const { cat } = useParams();
    // console.log(cat)
    cat.toString().toLowerCase();
    const [prodData, setProdData] = useState([]);
    // const [currentPage, setCurrentPage] = useState(1);
    const getProdData = async () => {
        const res = await fetch(`${process.env.REACT_APP_BASE_URL || ""}/product/getProductByCategory/${cat}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        });
        const data = await res.json();
        // console.log(data);
        if (res.status === 404 || !data) {
            // console.log("Error 404: while getting data in home ");
        } else {
            setProdData(data);
            // setResPerPage(data.resPerPage)
        }
    }
    useEffect(() => {
        getProdData();
    }, [])

    // const setCurrentPageNo = (pageNumber) => {
    //     setCurrentPage(pageNumber);
    // }
    return (
        <>
            <section className='productByCategory_page'>
                <div className='product_section_container'>
                    <div className='heading_container'>
                        <h3>
                            Shop All {cat}
                        </h3>
                    </div>
                    <div className='row'>
                        {
                            prodData.map((prod, key) => {
                                return (
                                    <ProductCard
                                        key={key}
                                        {...prod}
                                        btn1="Add to Cart"
                                        btn1Link="/cart"
                                    />
                                )
                            })
                        }
                    </div>
                </div>
            </section>
            <PaginationComponent />

        </>
    );
}

Main.displayName = 'ProductsListByCategory'
//Pre process the container with Redux Plugins
export default Main