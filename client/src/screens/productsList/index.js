import './style.scss';
import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useEffect, useState } from 'react';
import ProductCard from '../../components/productCard';
import { Button } from '@mui/material';
import { Link } from 'react-router-dom';
import PaginationComponent from '../../components/paginationComponent';

const Main = () => {
    const [catData, setCatData] = useState([]);
    const [prodData, setProdData] = useState([]);
    const getProdData = async () => {
        const res = await fetch(`${process.env.REACT_APP_BASE_URL || ""}/product/getAllProduct`, {
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
    };
    const getCatData = async () => {
        const res = await fetch(`${process.env.REACT_APP_BASE_URL || ""}/category/getAllCategory`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        });

        const data = await res.json();
        if (res.status === 404 || !data) {
            alert(`Error in fetching data from database`);
            // console.log(`Error in fetching data from database`);
        } else {
            setCatData(data);
        }
    };
    useEffect(() => {
        getCatData();
        getProdData();
    }, [])


    return (
        <>
            <section className='product_section'>
                <div className="hero-image">
                    <div className="hero-text">
                        <h1>Shop All Products</h1>
                    </div>
                </div>

                <div className="categories">
                    {/* <div className="categories_heading">
                        <h3>Categories</h3>
                    </div> */}
                    <h3 className='categories_heading'>Categories:</h3>

                    {
                        catData.map((cat, key) => {
                            return (
                                <Link key={cat._id} to={`/productsList/byCategory/${cat.categoryName}`}>
                                    <Button className='catButton' variant="contained">
                                        {cat.categoryName}
                                    </Button>
                                </Link>
                            )
                        })
                    }
                </div>
                <div className='product_section_container'>
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

Main.displayName = 'ProductsList'
//Pre process the container with Redux Plugins
export default Main