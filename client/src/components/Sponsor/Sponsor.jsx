import React from "react";
import ProductList from "../ProductList/ProductList";
import Cart from "../Cart/Cart";
import './sponsor.css'

const Sponsor = () => {
  return (
    <div className="sponsorContainer">

      <ProductList />
      <Cart />
    </div>
  );
};

export default Sponsor;
