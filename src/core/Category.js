import React from 'react'
import { Link } from 'react-router-dom'
import food from '../Assests/food.svg'
import groc from '../Assests/groc.svg'
import '../Styles/notif.css'

const Category = () => {
  return (
    <div className="cate-div">
      <Link to='/shop'>
        <img src={food} width="150px" />
        <h3>Food</h3>
      </Link>
      <Link to='/shop' style={{marginTop: "2em"}}>
        <img src={groc} width="150px" />
        <h3>Grocery</h3>
      </Link>
    </div>
  )
}

export default Category;