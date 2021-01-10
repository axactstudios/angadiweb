import React from 'react';
import { Link } from 'react-router-dom'

const Offercard = ({ product }) => {

    return (
      <div className='cateegee' style={{width: "45%"}}>
          <div className="ofeecard" style={{width: "100%"}}>
              <Link to={`/admin/edit/offer/${product._id}`}>
                    <img src={product.data.ImageURL} alt={product.data.Title} />
                </Link>
            <div className='ofeecard1'>
              <h5 style={{ display: "flex" }}>{product.data.Title} &nbsp;&nbsp;
                {
                  product.data.forFirstUser && product.data.forFirstUser === true ? <p style={{ color: "tomato", float: "right" }}>First User Only</p> : null
                }
              </h5>
              <p>{product.data.Subtitle}</p>
            </div>
            <div id="wishlist">
              <p>{product.data.discountPercentage}% OFF</p>
            </div>
          </div>
      </div>
    );
};

export default Offercard;