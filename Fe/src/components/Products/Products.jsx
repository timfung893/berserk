import React, { useState, useEffect } from "react";
import { productSource } from "../firebaseConnect";
import Skeleton from "react-loading-skeleton";
import { NavLink } from "react-router-dom";
import "./Products.css";
import { connect } from "react-redux";

const Products = (props) => {
  const [data, setData] = useState([]);
  const [filter, setFilter] = useState(data);
  const [loading, setLoading] = useState(false);

  let componentMounted = true;

  useEffect(() => {
    function getData() {
      setLoading(true);

      productSource.on("value", function (products) {
        var productData = [];
        products.forEach((product) => {
          const key = product.key;
          const desc = product.val().desc;
          const img = product.val().img;
          const price = product.val().price;
          const type = product.val().type;

          productData.push({
            id: key,
            desc: desc,
            img: img,
            price: price,
            type: type,
          });

          if (componentMounted) {
            setData(productData);
            setFilter(productData);
            setLoading(false);
          }
          // return () => {
          //   componentMounted = false;
          // };
        });
      });
    }
    getData();
  }, []);

  // get id for Product component
  function getProduct(id) {
    props.getProduct(id);
    console.log(id);
  }

  // loading if nothing
  const Loading = () => {
    return (
      <>
        <div className="col-md-3">
          <Skeleton count={4} height={350} />
        </div>
        <div className="col-md-3">
          <Skeleton count={4} height={350} />
        </div>
        <div className="col-md-3">
          <Skeleton count={4} height={350} />
        </div>
        <div className="col-md-3">
          <Skeleton count={4} height={350} />
        </div>
      </>
    );
  };

  // filter list on menu button click
  function filterProduct(type) {
    const filteredList = data.filter((x) => x.type === type);
    setFilter(filteredList);
  }

  // render data if not loading

  const ShowProducts = () => {
    return (
      <>
        <div className="buttons mb-2 justify-content-center">
          <button
            className="btn btn-outline-dark me-2 my-2 text-white"
            onClick={() => setFilter(data)}
          >
            All
          </button>
          <button
            className="btn btn-outline-dark me-2 my-2 text-white"
            onClick={() => filterProduct("Guts")}
          >
            Guts
          </button>
          <button
            className="btn btn-outline-dark me-2 my-2 text-white"
            onClick={() => filterProduct("Casca")}
          >
            Casca
          </button>
          <button
            className="btn btn-outline-dark me-2 my-2 text-white"
            onClick={() => filterProduct("Grif")}
          >
            Griffith
          </button>
          <button
            className="btn btn-outline-dark me-2 my-2 text-white "
            onClick={() => filterProduct("Others")}
          >
            Others
          </button>
        </div>

        {/* map data */}
        {filter.map((product) => {
          return (
            <>
              <div className="col-md-3 my-2">
                <div
                  className="card text-black h-100"
                  key={product.id}
                  i={product.id}
                >
                  <img
                    className="card-img-top"
                    src={product.img}
                    alt="img"
                    height="250px"
                    width="150px"
                  />
                  <div className="card-body d-flex flex-column justify-content-md-between">
                    <h4 className="card-title">{product.desc}</h4>
                    <p className="card-text">{product.price}</p>
                  </div>
                  <div className="buttons d-flex justify-content-center">
                    <NavLink
                      className="btn btn-outline-success fw-bolder me-2 mb-2"
                      to="./cart"
                    >
                      Add to cart
                    </NavLink>
                    <NavLink
                      className="btn btn-outline-info fw-bolder me-2 mb-2"
                      to={`/product/${product.id}`}
                      onClick={() => getProduct(product.id)}
                    >
                      Details
                    </NavLink>
                  </div>
                </div>
              </div>
            </>
          );
        })}
      </>
    );
  };

  return (
    <div className="container-fluid bg">
      <div className="container py-5 my-5">
        <div className="row">
          <div className="col-12">
            <h1 className="text-center fw-bolder">Latest Products</h1>
            <hr />
          </div>
        </div>
        <div className="row">{loading ? <Loading /> : <ShowProducts />}</div>
      </div>
    </div>
  );
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    getProduct: (getItem) => {
      dispatch({ type: "GET_PRODUCT", getItem });
    },
  };
};

export default connect(null, mapDispatchToProps)(Products);
