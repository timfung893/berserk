import React from "react";
import { connect } from "react-redux";
import "./Fav.css";

const Fav = (props) => {
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
  var favData = props.fav;
  console.log(favData.length);
  const MapCart = () => {
    return (
      <>
        {favData.map((data) => {
          return (
            <div className="row justify-content-center" key={data.id}>
              <div className="col-md-3 my-2">
                <div className="card text-white">
                  <img
                    className="card-img-top"
                    src={data.img}
                    alt="product img"
                  />
                </div>
              </div>
              <div className="col-md-4 cart-product-fav">
                <h4 className="card-title">{data.desc}</h4>
                <p className="card-text">
                  {data.qty} x ${data.price} = ${data.qty * data.price}
                </p>
                <div className="buttons d-flex justify-content-center flex-row mx-auto">
                  <button
                    className="btn btn-outline-success fw-bolder mx-1 mb-2"
                    onClick={(e) => addItem(e, data)}
                  >
                    <i className="fa fa-plus"></i>
                  </button>
                  <button
                    className="btn btn-outline-dark fw-bolder mb-2"
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

  const FavEmpty = () => {
    return (
      <div className="row cart-body">
        <p className="fw-bolder display-6">No favorite products</p>
      </div>
    );
  };

  return (
    <div className="container cart-body">
      {favData.length === 0 ? <FavEmpty /> : <MapCart />}
    </div>
  );
};

const mapStateToProps = (state, ownProps) => {
  return {
    fav: state.fav,
    tempText: state.tempText,
  };
};
const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    delItem: (product) => {
      dispatch({ type: "DEL_ITEM_FAV", payload: product });
    },
    addItem: (product) => {
      dispatch({ type: "ADD_ITEM_FAV", payload: product });
    },
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Fav);
