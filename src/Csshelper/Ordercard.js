import React from 'react';
import {Link} from 'react-router-dom'

const Ordercard = ({ product }) => {


    return (
        <div>
            <Link to={`/edit/order/${product._id}`}> View Order </Link>
                <div>Address - {product.data.Address}</div>
                <div>GrandTotal -{product.data.GrandTotal}</div>
                <div>Status -{product.data.Status}</div>
                <div>Type -{product.data.Type}</div>
                <div>UserID -{product.data.UserID}</div>
                <div>Timestamp -{new Date(product.data.TimeStamp.seconds * 1000).toLocaleDateString("en-US")}</div>
                <div>{product.data.DeliveryTime}</div>
                <div style={{ display: 'flex', justifyContent: 'space-around' }}>
                    <div>Dishes : {product.data.Items.map((d) => (
                        <p>{d}</p>
                    ))}</div>
                    <div>Quantity : {product.data.Qty.map((d) => (
                        <p>{d}</p>
                    ))}</div>
                    <div>Price : {product.data.Price.map((d) => (
                        <p>{d}</p>
                    ))}</div>
                </div>
        </div>
    );
};

export default Ordercard;