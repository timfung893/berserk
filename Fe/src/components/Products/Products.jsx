import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { connect } from "react-redux";
import { productSource } from "../firebaseConnect";
import Skeleton from "react-loading-skeleton";
import { NavLink } from "react-router-dom";
import "./Products.css";

const Products = (props) => {
  const [data, setData] = useState([]);
  const [filter, setFilter] = useState(data);
  const [loading, setLoading] = useState(false);
  let searchProducts = useSelector((state) => state.allProducts);
  const searchText = useSelector((state) => state.tempText);

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
        });

        if (componentMounted) {
          setData(productData);
          setLoading(false);

          if (searchText) {
            // set data for search function
            const filtered = [];
            searchProducts = productData;
            console.log("sp =", searchProducts);

            searchProducts.forEach((item) => {
              // filter data if keyword is correct
              if (item.desc.indexOf(searchText) !== -1) {
                filtered.push(item);
                console.log(filtered);
              }
            });
            // filtered data for search function
            setFilter(filtered);
          } else {
            // normal data for render
            setFilter(productData);
          }
        }
        // return false before unmount
        return () => {
          componentMounted = false;
        };
      });
    }
    getData();
  }, [searchText]);

  // get id for Product component
  function getProductId(product) {
    props.getProductId(product);
  }

  // get products
  function getProduct(product) {
    props.getProduct(product);
  }

  // loading if nothing
  const Loading = () => {
    return (
      <>
        <div className="col-md-3">
          <Skeleton width={300} height={50} />
        </div>
        <div className="col-md-3">
          <Skeleton width={300} height={50} />
        </div>
        <div className="col-md-3">
          <Skeleton width={300} height={50} />
        </div>
        <div className="col-md-3">
          <Skeleton width={300} height={50} />
        </div>
      </>
    );
  };

  // filter list on menu button click
  function filterProduct(type) {
    const filteredList = data.filter((x) => x.type === type);
    setFilter(filteredList);
  }

  // shorten product title

  function shortTitle(title) {
    if (window.innerWidth < 1024) {
      title.substring(0, 18);
    } else {
      return title;
    }
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

        {filter.map((product) => {
          return (
            <div className="col-md-3 my-2" key={product.id}>
              <div className="card text-black h-100">
                <img className="card-img-top" src={product.img} alt="img" />
                <div className="card-body d-flex flex-column justify-content-md-between">
                  <h4 className="card-title">{shortTitle(product.desc)}</h4>
                  <p className="card-text">${product.price}</p>
                </div>
                <div className="buttons d-flex justify-content-center mx-auto">
                  <NavLink
                    className="btn btn-outline-success fw-bolder mb-2"
                    to="/cart"
                    onClick={() => getProduct(product)}
                  >
                    Buy now
                  </NavLink>
                  <NavLink
                    className="btn btn-outline-info fw-bolder mb-2"
                    to={`/product/${product.id}`}
                    onClick={() => getProductId(product)}
                  >
                    Details
                  </NavLink>
                </div>
              </div>
            </div>
          );
        })}
      </>
    );
  };

  return (
    <div className="container-fluid bg">
      <div className="container py-5 ">
        <div className="row">
          <div className="col-12">
            <h1 className="text-center fw-bolder product-heading">
              Best Products For Sales
            </h1>
            <hr />
          </div>
        </div>
        <div className="row products">
          {loading ? <Loading /> : <ShowProducts />}
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state, ownProps) => {
  return {
    cart: state.cart,
    tempText: state.tempText,
    allProducts: [],
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    getProductId: (getItem) => {
      dispatch({ type: "GET_PRODUCT", getItem });
    },
    getProduct: (getProduct) => {
      dispatch({ type: "ADD_ITEM", payload: getProduct });
    },
    getAllProducts: (data) => {
      dispatch({ type: "ALL_PRODUCTS", data });
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Products);
