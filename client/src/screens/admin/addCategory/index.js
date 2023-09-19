import './style.scss'
import React, { useContext, useEffect, useState } from 'react'
import { adddata, deldata } from '../../../components/context/ContextProvider';
import { Link, useHistory } from 'react-router-dom'
import { updatedata } from '../../../components/context/ContextProvider'
import { Button, TextField } from '@mui/material';

const Main = () => {
    const { updata, setUPdata } = useContext(updatedata)
    const history = useHistory("");
    const { udata, setUdata } = useContext(adddata);
    const [inpVal, setInpVal] = useState({
        categoryName: ""
    })
    const [editToggle, setEditToggle] = useState(false);
    const [editId, setEditId] = useState('');
    const setData = (e) => {
        const { name, value } = e.target;
        // console.log(e.target);
        setInpVal({
            ...inpVal,
            [name]: value
        })
    }

    //adding data to database
    const addInpData = async (e) => {
        e.preventDefault();
        const { categoryName } = inpVal;
        const res = await fetch(`${process.env.REACT_APP_BASE_URL || ""}/category/addCategory`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                categoryName
            })
        });

        const data = await res.json();
        if (res.status === 404 || !data) {
            // console.log("error 404: while adding data ");
            alert(`Error in adding category to database`);
        } else {
            alert(`Added "` + data.categoryName.toUpperCase() + `" category to database`);
            setUdata(data)
            inpVal.categoryName = ''
        }
        setEditToggle(false);
        setInpVal({ categoryName: '' })
        // setEditItemID(null)
        getCatData();

    }


    //------------------- Table ------------------- //

    //getting data
    const [catData, setCatData] = useState([]);
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
    }

    //useeffect to only get data once when page opens
    useEffect(() => {
        getCatData();
    }, [])

    //for deleting data from database
    const { dltdata, setDLTdata } = useContext(deldata);
    const deleteCategory = async (id) => {
        const res2 = await fetch(`${process.env.REACT_APP_BASE_URL || ""}/category/deleteCategory/${id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json"
            }
        });

        const deleteData = await res2.json();

        if (res2.status === 404 || !deleteData) {
            // console.log("error 404: while deleting data in edit");
        } else {
            setDLTdata(deleteData)
            alert("Category DELETED from the database");
            getCatData();
        }

    }

    const editTodo = (id) => {
        setEditToggle(true);
        setEditId(id);
        document.getElementById("categoryName").focus();
        // console.log(id);
        const updatingCat = catData.find((ele) => {
            return (
                ele._id === id
            )
        })
        // console.log("updatingCat");
        // console.log(updatingCat);
        const sending = {
            target: {
                name: 'categoryName',
                value: updatingCat.categoryName
            }
        }
        setData(sending)
    };
    const updateuser = async (e) => {
        e.preventDefault();

        const { categoryName } = inpVal;

        const res2 = await fetch(`${process.env.REACT_APP_BASE_URL || ""}/category/updateCategory/${editId}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                categoryName
            })
        });

        const data2 = await res2.json();

        if (res2.status === 404 || !data2) {
            alert(`Error: "` + data2.codeName + `"`)
        } else {
            history.push("/admin/addCategory");
            alert("Category updated");
            setUPdata(data2);
            setEditToggle(false);
            getCatData();
            setInpVal({ categoryName: '' })
        }
    }
    useEffect(async () => {
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
    }, [])
    return (
        <>
            <section className='addCategory_page'>
                <div className='heading_container'>
                    <h3>Add New Category</h3>
                    <br />
                    <Link to='/admin/addCategory'>
                        <Button disabled={true} className='buttons' variant="contained">Add Category</Button>
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
                <div className="addCategory_page_content">
                    <div className='addCategory_container'>
                        <form>
                            <div className='form_section'>
                                <h4>Enter the name of category</h4>
                                <TextField
                                    value={inpVal.categoryName}
                                    onChange={setData}
                                    id='categoryName'
                                    name="categoryName"
                                    label="Category Name"
                                    variant="filled"
                                    type='text'
                                />

                                {/* <input type="text" value={inpVal.categoryName} onChange={setData} id='categoryName' name="categoryName" placeholder='Category Name' /> */}
                                {
                                    editToggle ?
                                        <Button
                                            id="submit-bttn"
                                            type="submit"
                                            onClick={updateuser}
                                            variant="contained">Update Category</Button>
                                        // <input
                                        //     id="submit-bttn"
                                        //     type="submit"
                                        //     value="Update Category"
                                        //     onClick={updateuser}
                                        // /> 
                                        :
                                        <Button
                                            id="submit-bttn"
                                            type="submit"
                                            onClick={addInpData}
                                            variant="contained">Submit Category</Button>
                                    // <input
                                    //     id="submit-bttn"
                                    //     type="submit"
                                    //     value="Submit Category"
                                    //     onClick={addInpData}
                                    // />
                                }
                            </div>
                        </form>
                    </div>
                    <div className="displayCategory_container">
                        <h4>Added categories</h4>
                        <table className="table">
                            <thead className="table_head">
                                <tr>
                                    <th scope="col">S. No.</th>
                                    <th scope="col">Category</th>
                                    <th scope="col">Added on</th>
                                    <th scope="col"></th>
                                    <th scope="col"></th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    catData.map((element, id) => {
                                        const crtdAtY = element.createdAt.substr(0, 4);
                                        const crtdAtM = element.createdAt.substr(4, 4);
                                        const crtdAtD = element.createdAt.substr(8, 2);
                                        const crtdAtT = element.createdAt.substr(11, 8);
                                        const crtdAtTotal = "[" + crtdAtT + "] " + crtdAtD + crtdAtM + crtdAtY;
                                        return (
                                            <tr className='table_row' key={element._id}>
                                                <th scope="row">{id + 1}</th>
                                                <td>{element.categoryName}</td>
                                                <td>{crtdAtTotal}</td>
                                                <td className="actions-buttons">
                                                    <Button color='warning' onClick={() => editTodo(element._id)} variant="contained">Edit</Button>
                                                    {/* <button onClick={() => editTodo(element._id)}>Edit</button> */}
                                                </td>
                                                <td className="actions-buttons">
                                                    <Button color='error' onClick={() => deleteCategory(element._id)} variant="contained">Delete</Button>
                                                    {/* <button onClick={() => deleteCategory(element._id)}>Delete</button> */}
                                                </td>
                                            </tr>
                                        )
                                    })
                                }
                            </tbody>
                        </table>
                    </div>
                </div>
            </section>
        </>
    );
}

Main.displayName = 'AddCategory'
//Pre process the container with Redux Plugins
export default Main
