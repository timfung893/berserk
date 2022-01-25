import React, { useEffect } from "react";
import { useState } from "react";
import { connect } from "react-redux";
import { productSource } from "../firebaseConnect";
import { NavLink } from "react-router-dom";
import "./Product.css";

const Product = (props) => {
  const productItem = props.productItem;
  console.log(productItem);
  const [product, setProduct] = useState([]);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  let componentMounted = true;
  useEffect(() => {
    setLoading(true);

    function getProduct() {
      productSource.on("value", function (products) {
        var productData = [];

        products.forEach((product) => {
          const key = product.key;
          const desc = product.val().desc;
          const img = product.val().img;
          const img1 = product.val().img1;
          const img2 = product.val().img2;
          const img3 = product.val().img3;
          const price = product.val().price;
          const type = product.val().type;
          const desc2 = product.val().desc2;
          const desc3 = product.val().desc3;

          productData.push({
            id: key,
            desc: desc,
            desc2: desc2,
            desc3: desc3,
            img: img,
            img1: img1,
            img2: img2,
            img3: img3,
            price: price,
            type: type,
          });

          if (componentMounted) {
            setData(productData);
            const newList = productData.filter((x) => x.id === productItem);
            setProduct(newList);
            setLoading(false);
          }
        });
        return () => {
          componentMounted = false;
        };
      });
    }
    getProduct();
  }, []);

  // related products
  // start with id = 0
  var countProduct = 0;
  const RelatedProducts = () => {
    return (
      <>
        {data.map((data) => {
          if (data.id !== productItem) {
            if (countProduct <= 3) {
              countProduct++;
              return (
                <>
                  <div class="col-md-3" key={data.id}>
                    <NavLink to={`/product/${data.id}`}>
                      <img class="card-img-top" src={data.img} alt="data img" />
                    </NavLink>
                    <div class="card-body">
                      <h4 class="card-title">
                        {data.desc.substring(0, 20) + "..."}
                      </h4>
                      <p class="card-text">{data.price}</p>
                    </div>
                  </div>
                </>
              );
            }
          }
        })}
      </>
    );
  };

  // loading if nothing

  const Loading = () => {
    return <>... loading</>;
  };

  // render data if not loading

  const ShowProduct = () => {
    return (
      <>
        {product.map((data) => {
          return (
            <>
              <div className="col-md-8" key={data.id}>
                <div className="card text-white">
                  <img src={data.img1} alt="" />
                </div>
              </div>
              <div className="col-md-4 details">
                <div className="card-body">
                  <h4 className="card-title ">{data.desc}</h4>
                  <p className="card-text">{data.price}</p>
                  <p className="card-text fst-italic">{`"${data.desc2}"`}</p>
                  <p className="card-text ">{data.desc3}</p>
                </div>
                <div className=" d-flex justify-content-center">
                  <NavLink
                    className="btn btn-outline-success fw-bolder me-2 mb-2"
                    to="./cart"
                  >
                    Add to cart
                  </NavLink>
                  <NavLink
                    className="btn btn-outline-info fw-bolder me-2 mb-2"
                    to={`/product/${product.id}`}
                  >
                    Favorite
                  </NavLink>
                </div>
              </div>
              {/* related products */}
              <div className="row">
                <h2 className="text-center my-4">Related Products</h2>
                <RelatedProducts />
              </div>
            </>
          );
        })}
      </>
    );
  };

  return (
    <div className="container">
      <div className="row product">
        {loading ? <Loading /> : <ShowProduct />}
      </div>
    </div>
  );
};

const mapStateToProps = (state, ownProps) => {
  return {
    productItem: state.productItem,
  };
};

export default connect(mapStateToProps)(Product);
