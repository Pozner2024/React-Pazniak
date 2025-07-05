import React from "react";
import ReactDOM from "react-dom";

import ShopInfo from "./components/Shop";

ReactDOM.render(
  <ShopInfo
    name="Gourmet gifts for any occasion"
    address="123 Main St, Anytown, USA"
    phone="phone: 123-456-7890"
    email="email: gourmet@e.com"
    website="website: www.gourmet.com"
  />,
  document.getElementById("container")
);
