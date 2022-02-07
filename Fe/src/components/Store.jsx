var redux = require("redux");

const InitialState = {
  productItem: {},
  cart: [],
};

const allReducer = (state = InitialState, action) => {
  switch (action.type) {
    case "GET_PRODUCT":
      return { ...state, productItem: action.getItem };
    case "ADD_TO_CART":
      return { ...state, cart: [...state.cart, action.getProduct] };
    case "ADD_ITEM":
      const product = action.payload;
      const productExist = state.cart.find((x) => x.id === product.id);
      if (productExist) {
        return state.cart.map((x) =>
          x.id === product.id ? { ...x, id: x.id + 1 } : x
        );
      }
      break;
    case "DEL_ITEM":
      const productExist1 = state.cart.find((x) => x.id === product.id);
      if (productExist1) {
        return state.cart.map((x) =>
          x.id === product.id ? { ...x, quantity: x.quantity - 1 } : x
        );
      }

      break;
    default:
      return state;
  }
};

var Store = redux.createStore(allReducer);
Store.subscribe(function () {
  console.log(JSON.stringify(Store.getState()));
});

export default Store;
