import { productSource } from "./firebaseConnect";

var redux = require("redux");

const noteInitialState = {
  productItem: {},
};

const allReducer = (state = noteInitialState, action) => {
  switch (action.type) {
    case "GET_PRODUCT":
      return { ...state, productItem: action.getItem };
    default:
      return state;
  }
};

var Store = redux.createStore(allReducer);
Store.subscribe(function () {
  console.log(JSON.stringify(Store.getState()));
});

export default Store;
