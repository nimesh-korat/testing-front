import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

function AddProduct() {

    //initialize navigate
    const navigate = useNavigate();

    //storing registration data from input fields 
    const [productData, setProductData] = useState({
        pName: '',
        pPrice: '',
        pDesc: '',
        pImg: ''
    });

    //getting textdata from input fields
    const handleProductChange = (e) => {
        const { name, value } = e.target;

        //storing textdata from input fields
        setProductData((prevData) => ({
            ...prevData,
            [name]: value,
        }))
    };

    //getting productPic
    const handleFileChange = (e) => {

        //storing profilePic
        setProductData((formData) => ({
            ...formData,
            pImg: e.target.files[0],
        }));
        console.log(productData.pImg);

    };

    //adding product details to MongoDB
    const handleProductSubmit = async (e) => {
        e.preventDefault();

        //sending API for storing user data to MongoDB 
        try {

            //appending data to formData
            const data = new FormData();

            //appending registration data to formData
            for (const key in productData) {
                data.append(key, productData[key]);
            }

            console.log(data);
            //sending API for storing user data to MongoDB
            const response = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/addProduct`, data);
            //const { success, message } = response.data;
            console.log("res success: ", response.data);

            //if success then redirect to login
            if (response.data.success) {
                console.log('Product Added Succesfully!!');
                navigate("/showProducts");
            }

        } catch (error) {
            console.log('Frontend Reg Error:', error);
        }
    }

    return (
        <>
            <div className="container">
                <h2>Add Product Data</h2>
                <form onSubmit={handleProductSubmit} encType="multipart/form-data">
                    <div className="form-group">
                        <label htmlFor="productName">Product Name:</label>
                        <input type="text"
                            name="pName"
                            className="form-control"
                            onChange={handleProductChange}
                            value={productData.pName}
                            required />
                    </div>
                    <div className="form-group">
                        <label htmlFor="productPrice">Product Price:</label>
                        <input type="number"
                            name="pPrice"
                            className="form-control"
                            onChange={handleProductChange}
                            value={productData.pPrice}
                            required />
                    </div>
                    <div className="form-group">
                        <label htmlFor="productDescription">Product Description:</label>
                        <textarea className="form-control"
                            name="pDesc"
                            onChange={handleProductChange}
                            value={productData.pDesc}
                            rows={3}
                            required />
                    </div>
                    <div className="form-group">
                        <label htmlFor="productImage">Product Image:</label>
                        <input type="file"
                            name="pImg"
                            className="form-control-file"
                            onChange={handleFileChange}
                            accept="image/*"
                            required />
                    </div>
                    <button type="submit" className="btn btn-primary">Submit</button>
                </form>
            </div>

        </>
    )
}

export default AddProduct


