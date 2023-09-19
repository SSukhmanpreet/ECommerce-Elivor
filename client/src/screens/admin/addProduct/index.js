import './style.scss'
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom';
import { Button, FormControl, TextField } from '@mui/material';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';

const Main = () => {
    const [title, setTitle] = useState("");
    const [categoryName, setCategoryName] = useState("");
    const [description, setDescription] = useState("");
    const [filename, setFileName] = useState("");
    const [price, setPrice] = useState("");
    const [stock, setStock] = useState("");

    const [getCatData, setCatData] = useState([]);

    const onChangeFile = (e) => {
        // console.log(e.target.files);
        setFileName(e.target.files[0]);
        readURL(e.target);
    };

    //adding data to database
    const addInpData = async (e) => {
        e.preventDefault();
        if (!filename || filename == null) {
            alert('Please select an image of your product');
            return;
        }
        if (categoryName == null) {
            alert('Please input category');
            return;
        }
        if (!filename || !title || !description || !price || !stock) {
            alert('Please input all details about the product');
            return;
        }
        const formData = new FormData();
        formData.append("title", title);
        formData.append("price", price);
        formData.append("stock", stock);
        formData.append("description", description);
        formData.append("categoryName", categoryName);
        formData.append("image", filename);
        // console.log("filename")
        // console.log(filename)
        axios.post(`${process.env.REACT_APP_BASE_URL || ""}/product/addProduct`, formData)
            .then(() => {
                alert('Product Added to Database')
                window.location.href = '/admin/addProduct'
            })
            .catch((err) => {
                // console.log(err);
                alert("Error");
            })
    };

    const getData = async () => {
        const res = await fetch(`${process.env.REACT_APP_BASE_URL || ""}/category/getAllCategory`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        });
        const data = await res.json();

        if (res.status === 404 || !data) {
            // console.log("Error while getting data in home ");

        } else {
            setCatData(data);
        }
    };
    useEffect(async () => {
        getData();
        if (localStorage.getItem('token') === "undefined") {
            alert("Please Sign In to continue")
            window.location.href = '/admin/signIn'
        }
        else {
            const givingToken = localStorage.getItem('token');
            // console.log(givingToken)
            const response = await fetch(`${process.env.REACT_APP_BASE_URL || ""}/auth/admin`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    token: givingToken,
                })
            })
            const data = await response.json()
            // console.log(data.message)
            if (response.status !== 200) {
                alert(data.message)
                window.location.href = '/admin/signIn'
            }
        }
    }, []);

    function readURL(input) {
        if (input.files && input.files[0]) {
            var reader = new FileReader();

            reader.onload = function (e) {
                const ele = document.getElementById('blah');
                ele.setAttribute('src', e.target.result);
                ele.setAttribute('width', '380px');
                ele.setAttribute('height', '380px');
            };

            reader.readAsDataURL(input.files[0]);
        }
    }
    const selectHandleChange = (event) => {
        setCategoryName(event.target.value);
    };

    return (
        <>
            <section className='addProduct_page'>
                <div className='heading_container'>
                    <h3>Add a New Product</h3>
                    <br />
                    <Link to='/admin/addCategory'>
                        <Button className='buttons' variant="contained">Add Category</Button>
                        {/* <button>
                            Add Category
                        </button> */}
                    </Link>
                    <Link to='/admin/addProduct'>
                        <Button disabled={true} className='buttons' variant="contained">Add Product</Button>
                        {/* <button>
                            Add Product
                        </button> */}
                    </Link>
                    <Link to='/admin/productsList'>
                        <Button className='buttons' variant="contained">Added Products</Button>
                        {/* <button>
                            Added Products
                        </button> */}
                    </Link>
                    <Link to='/admin/registeredUsers'>
                        <Button className='buttons' variant="contained">Regitered Users</Button>
                        {/* <button>
                            Regitered Users
                        </button> */}
                    </Link>
                    <Link to='/admin/profile'>
                        <Button className='buttons' variant="contained">Profile</Button>
                        {/* <button>
                            Profile
                        </button> */}
                    </Link>
                </div>
                <form encType='multipart/form-data'>
                    <div className='form_section'>
                        <div className="left">
                            <h4>Add an image of product</h4>
                            <input type="file" name="image" onChange={onChangeFile} className='custom-file-input' />
                            <div className='uploadedImage' >
                                <img className='upldImg' id="blah" src="#" alt="YOUR UPLOADED IMAGE HERE" />
                            </div>
                        </div>
                        <div className="right">
                            <h4>Enter Product Details</h4>
                            <div className="row">
                                {/* <input type='text' onChange={(e) => { setTitle(e.target.value) }} value={title} name="title" placeholder='Product name' /> */}
                                <TextField id="filled-basic" label="Product name" variant="filled" type='text' onChange={(e) => { setTitle(e.target.value) }} value={title} name="title" />
                                <FormControl>
                                    <InputLabel id="test-select-label">Category Name</InputLabel>
                                    <Select
                                        // value={value}
                                        // onChange={(e) => setValue(e.target.value)}
                                        labelId="test-select-label"
                                        label="Category Name"
                                        value={categoryName}
                                        onChange={selectHandleChange}
                                        // onChange={(e) => { setCategoryName(e.target.value) }}
                                        name="categoryName"
                                        required
                                    >
                                        <MenuItem value={null}>Choose Category...</MenuItem>
                                        {
                                            getCatData.map((element, id) => {
                                                return (
                                                    <MenuItem value={element.categoryName} key={element._id}>{element.categoryName}</MenuItem>
                                                )
                                            })
                                        }
                                    </Select>
                                </FormControl>
                                {/* <select value={categoryName} onChange={(e) => { setCategoryName(e.target.value) }} name="categoryName" required>
                                    <option>Choose Category...</option>
                                    {
                                        getCatData.map((element, id) => {
                                            return (
                                                <option key={element._id}>{element.categoryName}</option>
                                            )
                                        })
                                    }
                                </select> */}
                            </div>
                            <div className="row">

                                <TextField
                                    id="filled-multiline-flexible"
                                    label="Product description"
                                    multiline
                                    rows={4}
                                    variant="filled"
                                    onChange={(e) => { setDescription(e.target.value) }}
                                    value={description}
                                    type='text'
                                    name="description"
                                />
                                {/* <textarea onChange={(e) => { setDescription(e.target.value) }} value={description} type='text' name="description" placeholder='Product description' /> */}
                            </div>

                            <div className="row">
                                <TextField
                                    id="outlined-number"
                                    label="Price of Product"
                                    type="number"
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    onChange={(e) => { setPrice(e.target.value) }}
                                    value={price}
                                    name="price"
                                    placeholder='$10.00'
                                />

                                <TextField
                                    id="outlined-number"
                                    label="Stock Available"
                                    type="number"
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    onChange={(e) => { setStock(e.target.value) }}
                                    value={stock}
                                    name="stock"
                                    placeholder='100'
                                />
                                {/* <input onChange={(e) => { setPrice(e.target.value) }} value={price} type='number' name="price" placeholder='$10.00' /> */}
                                {/* <input onChange={(e) => { setStock(e.target.value) }} value={stock} type='number' name="stock" placeholder='100' /> */}
                            </div>
                            <div className="row">
                                <Button type='submit' className='buttons' variant="contained" onClick={addInpData} >Click to submit and add product to the store</Button>
                                {/* <button type='submit' onClick={addInpData}>Click to submit and add product to the store</button> */}
                            </div>
                        </div>
                    </div>
                </form>
            </section>
        </>
    );
}

Main.displayName = 'AddProduct'
//Pre process the container with Redux Plugins
export default Main
