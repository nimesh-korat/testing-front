import React from "react";
import { useLocation } from "react-router-dom";

function SingleProduct() {
    const location = useLocation();

    return (
        <>
            <h2>Single Product Details</h2>
            <div className="container">
                <div className="product-details">
                    {/* Product Image */}
                    <img
                        src={`${process.env.REACT_APP_BACKEND_URL}/images/productPics/${location.state.product.pImg}`}
                        alt="Product"
                        className="product-img"
                    />
                    {/* Product Details */}
                    <div className="product-info">
                        <h3>{location.state.product.pName}</h3>
                        <p>
                            <strong>Price: </strong>
                            {location.state.product.pPrice}
                        </p>
                        <p>
                            <strong>Description: </strong>
                            {location.state.product.pDesc}
                        </p>
                        {/* Quantity and Add to Cart */}
                        <div className="add-to-cart">
                            <label htmlFor="quantity">Quantity:</label>
                            <input
                                type="number"
                                id="quantity"
                                name="quantity"
                                min={1}
                                defaultValue={1}
                                className="form-control mb-2"
                            />
                            <button className="btn btn-primary">Add to Cart</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default SingleProduct;
