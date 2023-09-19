import './style.scss'
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Link, useParams } from 'react-router-dom';
import { Button, TextField } from '@mui/material';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

const Main = () => {
    const { id } = useParams();
    const [prodData, setProdData] = useState([]);
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
    const getProdData = async () => {
        const res = await fetch(`${process.env.REACT_APP_BASE_URL || ""}/product/getProduct/${id}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        });

        const data = await res.json();

        if (res.status === 404 || !data) {
            // console.log("Error while getting data in prodDetails");
        } else {
            setProdData(data);
            // console.log("data");
            // console.log(data);
            setTitle(data.title);
            setCategoryName(data.categoryName);
            setDescription(data.description);
            setFileName(data.filename);
            setPrice(data.price);
            setStock(data.stock);
        }
    };
    //adding data to database
    const updateProductData = async (e) => {
        e.preventDefault();
        // console.log("filename")
        // console.log(filename)
        // const res2 = await fetch(`${process.env.REACT_APP_BASE_URL || ""}/product/updateProduct/${id}`, {
        //     method: "PATCH",
        //     headers: {
        //         "Content-Type": "application/json"
        //     },
        //     body: JSON.stringify({
        //         title,
        //         categoryName,
        //         description,
        //         image: filename,
        //         price,
        //         stock,
        //     })
        // });
        // const data2 = await res2.json();

        // if (res2.status === 404 || !data2) {
        //     alert(`Error: "` + data2.codeName + `"`)
        // } else {
        //     alert("Product updated");
        // }

        const formData = new FormData();
        formData.append("title", title);
        formData.append("price", price);
        formData.append("stock", stock);
        formData.append("description", description);
        formData.append("categoryName", categoryName);
        formData.append("image", filename);
        // console.log("filename")
        // console.log(filename)
        axios.patch(`${process.env.REACT_APP_BASE_URL || ""}/product/updateProduct/${id}`, formData)
            .then(() => {
                alert('Product Updated in Database')
                window.location.href = `/admin/productsList`;
            })
            .catch((err) => {
                // console.log(err);
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
        getProdData();
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


    return (
        <>
            <section className='addProduct_page'>
                <div className='heading_container'>
                    <h3>Edit the Product: {prodData.title}</h3>
                    <br />
                    <Link to='/admin/addCategory'>
                        <Button className='buttons' variant="contained">Add Category</Button>
                        {/* <button>
                            Add Category
                        </button> */}
                    </Link>
                    <Link to='/admin/addProduct'>
                        <Button className='buttons' variant="contained">Add Product</Button>
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
                            <h4>Update image of product</h4>
                            <input type="file" name="image" onChange={onChangeFile} className='custom-file-input' />
                            <div className='uploadedImage' >
                                <img id="blah" className='upldImg' src={`/uploads/${prodData.image}`} alt="YOUR UPLOADED IMAGE HERE" />
                            </div>
                        </div>
                        <div className="right">
                            <h4>Enter Product Details</h4>
                            <div className="row">
                                <TextField disabled type='text' onChange={(e) => { setTitle(e.target.value) }} value={title} name="title" id="filled-basic" label="Product name" variant="filled" />
                                {/* <input type='text' onChange={(e) => { setTitle(e.target.value) }} value={title} name="title" placeholder='Product name' /> */}
                                <FormControl fullWidth>
                                    <InputLabel id="demo-simple-select-label">Category Name</InputLabel>
                                    <Select
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        label="Category Name"
                                        value={categoryName}
                                        onChange={(e) => { setCategoryName(e.target.value) }}
                                        name="categoryName"
                                        required
                                    >
                                        <MenuItem>Choose Category...</MenuItem>

                                        {
                                            getCatData.map((element, id) => {
                                                return (
                                                    <MenuItem key={element._id} value={element.categoryName}>{element.categoryName}</MenuItem>
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
                                    id="filled-multiline-static"
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
                                    id="filled-number"
                                    label="Price of the product"
                                    type="number"
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    variant="filled"
                                    onChange={(e) => { setPrice(e.target.value) }}
                                    value={price}
                                    name="price"
                                    placeholder='$10.00'
                                />
                                <TextField
                                    id="filled-number"
                                    label="Stock Available for Sale"
                                    type="number"
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    variant="filled"
                                    onChange={(e) => { setStock(e.target.value) }}
                                    value={stock}
                                    name="stock"
                                    placeholder='100'
                                />
                                {/* <input onChange={(e) => { setPrice(e.target.value) }} value={price} type='number' name="price" placeholder='$10.00' /> */}
                                {/* <input onChange={(e) => { setStock(e.target.value) }} value={stock} type='number' name="stock" placeholder='100' /> */}
                            </div>
                            <div className="row">
                                <Button type='submit' onClick={updateProductData} className='buttons' variant="contained">Click to update product in database</Button>
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
