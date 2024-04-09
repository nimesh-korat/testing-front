import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

function ShowProducts() {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        axios
            .post(`${process.env.REACT_APP_BACKEND_URL}/api/fetchAllProducts`)
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
    }, []);

    async function logout() {
        await axios
            .post(`${process.env.REACT_APP_BACKEND_URL}/api/logout`)
            .then((response) => {
                window.location.reload(false);
            });
    }

    return (
        <div className="container">
            <h2>Product Details</h2>
            {/* Add Product Button */}
            <div className="clearfix mb-3">
                <Link to="/addProduct" className="btn btn-success float-start">
                    Add Product
                </Link>
                <button className="btn btn-danger float-end" onClick={logout}>
                    Log Out
                </button>
            </div>
            {/* Product Grid */}
            <div className="row">
                {products.map((product) => (
                    <div key={product._id} className="col-md-4 mb-4">
                        <Link
                            to={`/product/${product._id}`}
                            state={{ product }}
                            style={{ textDecoration: "none", color: "inherit" }}
                        >
                            <div className="product-card">
                                <img
                                    src={`${process.env.REACT_APP_BACKEND_URL}/images/productPics/${product.pImg}`}
                                    alt={product.pName}
                                    className="product-img"
                                />
                                <div className="card-body">
                                    <h5 className="card-title">{product.pName}</h5>
                                    <p className="card-text">Rs. {product.pPrice}</p>
                                    <p className="card-text">{product.pDesc}</p>
                                </div>
                            </div>
                        </Link>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default ShowProducts;
