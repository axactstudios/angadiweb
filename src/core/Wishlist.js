import React, { useEffect, useState } from 'react';
import { getwhishlist, itemTotals } from '../helpers/wishlisthelper'
import { Link, Redirect } from 'react-router-dom'
import '../Styles/Wishlist.css'
import StarRatings from 'react-star-ratings';
import { removeItems } from '../helpers/wishlisthelper'
import { Carousel } from 'react-bootstrap'
import { addItem, updateItem } from '../helpers/CartHelper'

const WishlistCard = ({ product }) => {

  const rrate = product && product.rating && Math.round(product.rating)
  const perceentoff = ((product.iPrice - product.price) / product.iPrice) * 100
  const fixed = Math.round(perceentoff)
  const count = 1
  const [redirect, setRedirect] = useState(false)
  const [shop, setShop] = useState(false);

  const addToCart = () => {
      addItem(product, () => {
          if (count > 0) {
              updateItem(product._id, count)
          }
          setRedirect(true);
      })
  }

  const shouldRedirect = redirect => {
      if (redirect) {
          return <Redirect to='/cart' />
      }
  }
  const shouldGo = shop => {
      if (shop) {
          return <Redirect to='/' />
      }
  }

  return (
    <div className="wishlist-card">
      <div className="wishlist-card-info">
        <Link to={`/dish/${product._id}`} style={{margin: "0 auto"}}>
          <Carousel interval={25000} className="img-carousel">
            
              <Carousel.Item interval={25000}>
                <img src={product.url} alt={product.name} className="wishlist-img" />
              </Carousel.Item>
              <Carousel.Item interval={25000}>
                <img src={product.url2} alt={product.name} className="wishlist-img" />
              </Carousel.Item>
                <Carousel.Item interval={25000}>
                <img src={product.url3} alt={product.name} className="wishlist-img" />
              </Carousel.Item>
            
          </Carousel>
        </Link>
        <div className="wishlist-info">
          <h5>
            <StarRatings
              rating={rrate}
              starDimension="14px"
              starSpacing="1px"
              starRatedColor="rgb(255,176,0)"
            />
          </h5>
          <h6>{product.name} &nbsp; <span id="cat-name">{product.category}</span></h6>
          <p className="wishlist-desc"><abbr style={{textDecoration: "none"}} title={product.description}>{product.description.substring(0,150)+"..."}</abbr></p>
          <p style={{display: "flex"}}>
            <span style={{textDecoration: "line-through", color: "grey"}}> Rs{product.iPrice} </span> 
            &nbsp; &nbsp; 
            <span style={{fontWeight: "bold"}}> Rs{product.price} </span>
            {
                product.quantity <= product.count ?
                    <p style={{ color: 'tomato', fontSize: "14px" }}> &nbsp; &nbsp; <i class="fa fa-times-circle" aria-hidden="true"></i> Out Of Stock</p> :
                    <p style={{ color: '#78A962', fontSize: "14px" }}> &nbsp; &nbsp; <i class="fa fa-check-circle" aria-hidden="true"></i> In Stock</p>
            }
          </p>
          <div id="wishlist">
            <p>{fixed}% OFF</p>
          </div>
        </div>
      </div>
      <div className="wishlist-buttons">
      
        <button id="add-to-cart" onClick={addToCart}>Add To Cart</button><br />
        <button id="remove-wish" onClick={() => {
                        removeItems(product._id)
                        setShop(true)
                    }}>Remove</button>
      </div>
    </div>
  );
};

const Wishlist = () => {

    const [d, setd] = useState(5)
    const [items, setItems] = useState([]);
    var min = 1;
    var max = 100;
    var rand = min + (Math.random() * (max - min));

    const setdm = () => {
        setd(rand)
    }
    useEffect(() => {
        setItems(getwhishlist());
    }, [d])

    const noItemsMessage = () => {
        return (
            <h6 className="mmain1"><Link className="mmain" to='/'>Continue Shopping</Link></h6>
        )
    }

    console.log(items);

    return (
      <div>
        <div id="wish-head"><h3>Your Wishlist <i class="fa fa-heart" aria-hidden="true" style={{ color: 'tomato' }} ></i></h3></div>
        <div className="card-container">
          {
            items.length > 0 ?
              <div>
                {
                  items.map((item, index) => (
                    <WishlistCard key={index} product={item} />
                  ))
                }
              </div>
              : noItemsMessage()
          }
          </div>
      </div>
    );
};

export default Wishlist;