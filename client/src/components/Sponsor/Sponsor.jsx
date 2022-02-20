import React from "react";
import ProductList from "../ProductList/ProductList";
import Cart from "../Cart/Cart";
import CategoryMenu from "../CategoryMenu/CategoryMenu";

const Sponsor = () => {
  return (
    <div className="container">
      <CategoryMenu />
      <ProductList />
      <Cart />
    </div>
  );
};

export default Sponsor;
