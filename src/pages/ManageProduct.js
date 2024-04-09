import axios from "axios";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

function ManageProduct() {
    const [products, setProducts] = useState([]);

    function GetProducts() {
        axios
            .post(`${process.env.REACT_APP_BACKEND_URL}/getProduct`)
            .then((response) => {
                setProducts(response.data.products);
            })
            .catch((error) => {
                if (error.response && error.response.status === 404) {
                    // Handle 404 error here (e.g., set products to an empty array)
                    console.log("No products found");
                    setProducts([]);
                } else {
                    // Handle other errors
                    console.error("Error fetching products:", error);
                }
            });
    }
    useEffect(() => {
        GetProducts();
    }, []);

    const handleDeleteProductSubmit = async (e, pId) => {
        e.preventDefault();

        console.log("pId: ", pId);
        //calling Login API
        try {
            const response = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/deleteProduct`, {
                pId,
            });

            //initializing response data from API response
            const { message } = response.data;
            console.log(message);
            GetProducts();
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className="container">
            <h2>Manage Product Details</h2>
            <div className="table-responsive">
                <table className="table text-center">
                    <thead>
                        <tr>
                            <th>Product Name</th>
                            <th>Product Price</th>
                            <th>Product Description</th>
                            <th>Product Image</th>
                            <th colSpan={2}>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {!products.length ? (
                            <tr>
                                <td colSpan={6}>No products found</td>
                            </tr>
                        ) : (
                            products.map((product) => (
                                <tr key={product._id}>
                                    <td>{product.pName}</td>
                                    <td>Rs. {product.pPrice}</td>
                                    <td>{product.pDesc}</td>
                                    <td>
                                        <img
                                            src={`${process.env.REACT_APP_BACKEND_URL}/images/productPics/${product.pImg}`}
                                            alt={product.pName}
                                            height="100px"
                                        />
                                    </td>
                                    <td>
                                        <Link
                                            to={`/editProduct/${product._id}`}
                                            state={{ product }}
                                            className="btn bg-success text-white"
                                        >
                                            Edit
                                        </Link>
                                    </td>
                                    <td>
                                        <button
                                            onClick={(e) => handleDeleteProductSubmit(e, product._id)}
                                            className="btn bg-danger text-white"
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default ManageProduct;
