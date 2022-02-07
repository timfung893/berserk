import React from "react";
import { connect } from "react-redux";

const Cart = (props) => {
  //  del item from cart
  function delItem(e, product) {
    e.preventDefault();
    props.delItem(product);
  }
  // add item
  function addItem(e, product) {
    e.preventDefault();
    props.addItem(product);
  }

  // cart data
  var cartData = props.cart;
  console.log(cartData.length);
  const MapCart = () => {
    return (
      <>
        {cartData.map((data) => {
          return (
            <div className="row" key={data.id}>
              <div className="col-md-4 my-2">
                <div className="card text-white bg-primary">
                  <img className="card-img-top" src={data.img} alt="" />
                </div>
              </div>
              <div className="col-md-4">
                <h4 className="card-title">{data.desc}</h4>
                <p className="card-text">
                  {data.id} x ${data.price} = ${data.id * data.price}
                </p>
                <div className="buttons d-flex justify-content-center mx-auto">
                  <button
                    className="btn btn-outline-success fw-bolder mb-2"
                    onClick={(e) => addItem(e, data)}
                  >
                    <i className="fa fa-plus"></i>
                  </button>
                  <button
                    className="btn btn-outline-success fw-bolder mb-2"
                    onClick={(e) => delItem(e, data)}
                  >
                    <i className="fa fa-minus"></i>
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </>
    );
  };

  const CartEmpty = () => {
    return (
      <div className="row">
        <p className="fw-bolder display-6">Your cart is empty</p>
      </div>
    );
  };

  return (
    <div className="container">
      {cartData.length === 0 ? <CartEmpty /> : <MapCart />}
    </div>
  );
};

const mapStateToProps = (state, ownProps) => {
  return {
    cart: state.cart,
  };
};
const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    delItem: (product) => {
      dispatch({ type: "DEL_ITEM", payload: product });
    },
    addItem: (product) => {
      dispatch({ type: "ADD_ITEM", payload: product });
    },
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Cart);
