import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import store from "./store/store";

import ShopInfo from "./components/ShopInfo";
import products from "./productlist.json"; // products is a variable
//  that loads data from the json file.

const App = () => {
  return (
    <Provider store={store}>
      <ShopInfo
        name="Gourmet gifts for any occasion"
        address="123 Main St, Anytown, USA"
        phone="phone: 123-456-7890"
        email="email: gourmet@e.com"
        website="website: www.gourmet.com"
        products={products}
      />
    </Provider>
  );
};

ReactDOM.render(<App />, document.getElementById("container"));
