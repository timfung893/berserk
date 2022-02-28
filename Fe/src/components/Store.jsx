import { productSource } from "./firebaseConnect";

var redux = require("redux");

const InitialState = {
  productItem: [],
  cart: [],
  fav: [],
  tempText: "",
  allProducts: [],
};

const allReducer = (state = InitialState, action) => {
  const product = action.payload;
  switch (action.type) {
    // send product info to store
    case "GET_PRODUCT":
      return { ...state, productItem: action.getItem };

    //  add item to cart
    case "ADD_ITEM":
      const productExist = state.cart.find((x) => x.id === product.id);
      if (productExist) {
        return {
          ...state,
          cart: state.cart.map((x) =>
            x.id === product.id ? { ...x, qty: x.qty + 1 } : x
          ),
        };
      } else {
        return {
          ...state,
          cart: [...state.cart, { ...product, qty: 1 }],
        };
      }

    // add item to fav
    case "ADD_ITEM_FAV":
      const favProductExist = state.fav.find((x) => x.id === product.id);
      if (favProductExist) {
        return {
          ...state,
          fav: state.fav.map((x) =>
            x.id === product.id ? { ...x, qty: x.qty + 1 } : x
          ),
        };
      } else {
        return {
          ...state,
          fav: [...state.fav, { ...product, qty: 1 }],
        };
      }

    //  del item from cart
    case "DEL_ITEM":
      const productExist1 = state.cart.find((x) => x.id === product.id);
      // if qty = 1, filter cart
      if (productExist1.qty === 1) {
        return {
          ...state,
          cart: state.cart.filter((x) => x.id !== product.id),
        };
      } else {
        return {
          ...state,
          cart: state.cart.map((x) =>
            x.id === product.id ? { ...x, qty: x.qty - 1 } : x
          ),
        };
      }

    //  del from fav
    case "DEL_ITEM_FAV":
      const favProductExist1 = state.fav.find((x) => x.id === product.id);
      // if qty = 1, filter.fav
      if (favProductExist1.qty === 1) {
        return {
          ...state,
          fav: state.fav.filter((x) => x.id !== product.id),
        };
      } else {
        return {
          ...state,
          fav: state.fav.map((x) =>
            x.id === product.id ? { ...x, qty: x.qty - 1 } : x
          ),
        };
      }

    // search product name
    case "SEARCH_TEXT":
      return { ...state, tempText: action.tempText };

    case "ALL_PRODUCTS":
      return { ...state, allProducts: action.data };

    default:
      return state;
  }
};

var Store = redux.createStore(allReducer);
Store.subscribe(function () {
  console.log(JSON.stringify(Store.getState()));
});

export default Store;
