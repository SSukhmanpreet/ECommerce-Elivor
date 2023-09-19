import './style.scss'
import React, { useEffect, useState } from 'react'
import CategoryCard from '../../components/categoryCard';
import HomeProductCard from '../../components/homeProductCard';

const Main = () => {
    const [prodData, setProdData] = useState([]);
    const [arrProd, setArrProd] = useState([]);
    const getProdData = async () => {
        const res = await fetch(`${process.env.REACT_APP_BASE_URL || ""}/product/getAllProduct`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        });

        const data = await res.json();
        // console.log(data);
        // console.log("-----------------");

        if (res.status === 404 || !data) {
            // console.log("Error 404: while getting data in home ");
        } else {
            setProdData(data);
            const randomData = [];
            for (var i = 0; i < data.length; i++) {
                randomData[i] = data[i];
            }
            setArrProd(randomData.sort(() => 0.5 - Math.random()))
        }
    }

    useEffect(() => {
        getProdData();
    }, [])
    return (
        <>
            <section className='product_section'>
                <div className="hero-image1">
                    {/* <Link to='/about'> */}
                    <img className="prod_image" onClick={() => { window.location.href = `/productsList/byCategory/Men Jackets` }} />
                    {/* </Link> */}
                    <div className="hero-text">
                        <h1>
                            Warmth When It Matters
                        </h1>
                        <h4>
                            Our line of insulated jackets covers every kind of cold, so you can keep warm in any condition for any activity.
                        </h4>
                    </div>
                </div>
                <div className='row'>
                    {
                        prodData.filter((value, index, self) =>
                            index === self.findIndex((t) => (
                                t.categoryName === value.categoryName
                            ))
                        ).slice(0, 4).map((prod, key) => (
                            <CategoryCard
                                key={key}
                                {...prod}
                            />
                        ))
                    }
                </div>
                <div className="hero-image2">
                    <div className="prod_image" onClick={() => { window.location.href = `/productsList/byCategory/Bags` }}>
                    </div>
                    <div className="hero-text">
                        <h1>
                            Bag packing has never been easier.
                            {/* Smart ideas, small spends. */}
                        </h1>
                        <h4>
                            Boost yourself for a day to travel solo or to meet your family and friends.
                            It always starts with travelling light.
                            <br />
                            Travel better with our range of timelessvbackpacks, bags, available in cabin, check-in sizes.
                        </h4>
                    </div>
                </div>
                <div className='row'>
                    {
                        arrProd.slice(0, 4).map((prod, key) => (
                            <HomeProductCard
                                key={key}
                                {...prod}
                                btn1="Add to Cart"
                                btn2="Buy Now"
                                btn1Link="/cart"
                                btn2Link="/checkout"
                                wdth='300px'
                                hght='500px'
                            />
                        ))
                    }
                </div>
            </section>
        </>
    );
}

Main.displayName = 'Home'
//Pre process the container with Redux Plugins
export default Main