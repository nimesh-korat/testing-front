import axios from 'axios';
import React, { useState } from 'react'
import { useLocation, useNavigate } from "react-router-dom";


function EditProduct() {


    const location = useLocation();

    //initialize navigate
    const navigate = useNavigate();
    console.log(location.state.product);


    const [productData, setProductData] = useState({
        pId: location.state.product._id,
        pName: location.state.product.pName,
        pPrice: location.state.product.pPrice,
        pDesc: location.state.product.pDesc,
        pImg: location.state.product.pImg
    } || []);


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

    };

    //adding product details to MongoDB
    const handleProductSubmit = async (e) => {
        e.preventDefault();

        console.log("pdata: ", productData);
        //sending API for storing user data to MongoDB 
        try {

            //appending data to formData
            const data = new FormData();

            //appending registration data to formData
            for (const key in productData) {
                data.append(key, productData[key]);
            }

            //sending API for storing user data to MongoDB
            const response = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/editProduct`, data);
            //const { success, message } = response.data;
            console.log("res success: ", response.data);

            //if success then redirect to login
            if (response.data.success) {
                console.log('Product Updated Succesfully!!');
                navigate("/manageProduct");
            }

        } catch (error) {
            console.log('Frontend Reg Error:', error);
            if (error.response && error.response.status === 402) {
                alert('Please Change Something or go Back!');
            } else {
                alert('Error: Failed to connect to server');
            }
        }
    }
    console.log("singleData: ", productData.pName);


    return (
        <>
            <div className="container">
                <h2>Edit Product Data</h2>
                <form onSubmit={handleProductSubmit} encType="multipart/form-data">
                    <div className="form-group">
                        <label htmlFor="productName">Product Name:</label>
                        <input type="text"
                            name="pName"
                            className="form-control"
                            onChange={handleProductChange}
                            value={productData.pName}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="productPrice">Product Price:</label>
                        <input type="number"
                            name="pPrice"
                            className="form-control"
                            onChange={handleProductChange}
                            value={productData.pPrice}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="productDescription">Product Description:</label>
                        <textarea className="form-control"
                            name="pDesc"
                            onChange={handleProductChange}
                            value={productData.pDesc}
                            rows={3}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="productImage">Product Image:</label>
                        <input type="file"
                            name="pImg"
                            className="form-control-file"
                            onChange={handleFileChange}
                            accept="image/*"
                        />
                    </div>
                    <button type="submit" className="btn btn-primary">Submit</button>
                </form>
            </div>

        </>
    )
}

export default EditProduct


