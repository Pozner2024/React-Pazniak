import React from "react";
import ReactDOM from "react-dom";

import ShopInfo from "./components/Shop";
import ProductTable from "./components/ProductTable";
import products from "./productlist.json"; // products — это переменная,
//  в которую загружаются данные из файла json.

ReactDOM.render(
  <div>
    <ShopInfo
      name="Gourmet gifts for any occasion"
      address="123 Main St, Anytown, USA"
      phone="phone: 123-456-7890"
      email="email: gourmet@e.com"
      website="website: www.gourmet.com"
    />
    <ProductTable products={products} />
  </div>,
  document.getElementById("container")
);
