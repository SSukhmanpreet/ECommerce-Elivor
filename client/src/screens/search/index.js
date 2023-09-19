import './style.scss'
import React, { useEffect, useState } from 'react'
import ProductCard from '../../components/productCard';
import SearchIcon from '@mui/icons-material/Search';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import PaginationComponent from '../../components/paginationComponent';

const Main = () => {
    const [prodData, setProdData] = useState([]);
    const getProdData = async () => {
        const res = await fetch(`${process.env.REACT_APP_BASE_URL || ""}/product/getAllProduct`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        });
        const data = await res.json();
        // console.log("data");
        // console.log(data);
        if (res.status === 404 || !data) {
            // console.log("Error 404: while getting data in home ");
        } else {
            setProdData(data);
        }
    }
    useEffect(() => {
        getProdData();
    }, [])

    const [srchQuery, setSrchQuery] = useState('');
    const setInpQuery = (e) => {
        setSrchQuery(e.target.value);
    }
    let dataSearch = prodData.filter(item => {
        return (
            Object.keys(item).some(key =>
                item[key].toString().toLowerCase().includes(srchQuery.toString().toLowerCase())
            )
        )
    })
    return (
        <>
            <section className='search_page'>
                <div className="heading_container">
                    <h3>Search</h3>
                </div>
                <div className='searchFieldSection'>
                    <Box sx={{ color: 'black', '& > :not(style)': { m: 1 } }}>
                        <Box className='searchFieldBox' sx={{ display: 'flex', alignItems: 'flex-end', color: 'white', alignItem: 'center' }}>
                            <SearchIcon sx={{ color: 'black', mr: 1, my: 0.5 , paddingBottom:'5px'  }} />
                            <TextField sx={{ color: 'black', width: '420px' , paddingBottom:'5px' }} type="text" label="Search for product, category or details about a product..." value={srchQuery} onChange={setInpQuery.bind(this)} id="input-with-sx" variant="standard" />
                        </Box>
                    </Box>
                    {/* <input type="text" placeholder="Search for category or product" value={srchQuery} onChange={setInpQuery.bind(this)} /> */}
                </div>
                <div className='resultHeading'>
                    <h2>Results:</h2>
                </div>
                <div className='searchResultSection'>
                    {
                        dataSearch && dataSearch.map((prod, key) => {
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
            </section>
            <PaginationComponent />
        </>
    );
};

Main.displayName = 'SearchPage'
//Pre process the container with Redux Plugins
export default Main

//array.filter((item)=>{ return (condition) }) method returns a shallow copy of array of items which pass the given condition
//argument - a function which will iterate through array checking each item for condition
//array = array of items
//e.g.: array.filter((individualItem)=>{ return ( condition you want to check individualItem with and it will return that item )})

//Object.key(object) method returns an array with the name/property names of the object passed into key() method
//argument - an object of which the names are required as an array
//e.g. Object.key(individualItem) will return arrray having all the property names of object individualItem

//array.some((item)=>{ return (condition) }) method return true or false by checking if atleast one item in an array satisfies the given condition
//argument - a function checking for the condition on each item of array
//e.g. array.some((individualItem)=>{ return ( condition you want to check individualItem with and will return true or false )})

//in array.some((key)=>{}) method,
//item[key] returns the value of the property: 'key' of item: 'object'
//e.g. item = {propertyName : propertyValue}
//item[propertyName] will return propertValue

//string1.includes(string2) method return true or false by checking string2 in string1 (case-sensitive)
//argument - a string/sub-string which we want to check in original string
//e.g. worldOfWar.includes(War) will return true

//          METHOD                               RETURNS
//Object.key(item)                  array           - of property names of item object
//Object.key(item).some(key)        true/false      - by checking for condition in array
//item[key]                         value           - of property key
//item[key].includes(string)        true/false      - by checking if string exists or not