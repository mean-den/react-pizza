import React from 'react'

import cartEmptyImg from '../assets/img/empty-cart.png'
import { Link } from 'react-router-dom'

export const CartEmpty: React.FC = () => 
  <div className="cart cart--empty">
    <h2>Cart is empty <span>😕</span></h2>
    <p>
      Mostly like you haven't ordered pizza yer
      <br />
      If you want to order pizza, you should go to the main page
    </p>
    <img src={cartEmptyImg} alt="Empty cart" />
    <Link to="/" className="button button--black">
      <span>Back</span>
    </Link>
  </div>
