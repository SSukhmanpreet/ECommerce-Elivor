import './style.scss'
import React, { useEffect, useState } from 'react'
import CategoryCard from '../../components/categoryCard';
import PaginationComponent from '../../components/paginationComponent';

const Main = () => {
    const [catData, setCatData] = useState([]);
    const [prodData, setProdData] = useState([]);
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
        }
    };
    useEffect(() => {
        getCatData();
        getProdData();
    }, [])
    return (
        <>
            <section className='allCategories_page'>
                <div className="hero-image">
                    <div className="hero-text">
                        <h1>Shop All Categories</h1>
                    </div>
                </div>
                {/* <div className="heading_container">
                    <h3>
                        All Categories
                    </h3>
                </div> */}
                <div className='categoriesDisplay'>
                    {
                        prodData.filter((value, index, self) =>
                            index === self.findIndex((t) => (
                                t.categoryName === value.categoryName
                            ))
                        ).map((prod, key) => (
                            <div className='catcontainer'>
                                <CategoryCard
                                    key={key}
                                    {...prod}
                                />
                            </div>
                        ))
                    }
                </div>
            </section>
            <PaginationComponent />
        </>
    )
};

Main.displayName = 'AllCategories'
//Pre process the container with Redux Plugins
export default Main