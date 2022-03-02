import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { productSource } from "../firebaseConnect";
import { NavLink } from "react-router-dom";
import "./Product.css";
import Slider from "react-slick";
import Skeleton from "react-loading-skeleton";

// map data
const Product = React.memo((props) => {
  // const productItemArr = [];
  console.log("rendered");
  const productItem = props.productItem.id;
  // productItemArr.push(productItem);
  console.log(productItem);

  const [product, setProduct] = useState(productItem);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  console.log(product);

  let componentMounted = true;
  useEffect(() => {
    setLoading(true);

    function getProduct() {
      productSource.on("value", function (products) {
        var productData = [];

        products.forEach((product) => {
          const key = product.key;
          const desc = product.val().desc;
          const { img } = product.val();
          const { img1 } = product.val();
          const { img2 } = product.val();
          const { img3 } = product.val();
          const { price } = product.val();
          const { type } = product.val();
          const { desc2 } = product.val();
          const { desc3 } = product.val();

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
        });
        if (componentMounted) {
          setData(productData);
          // setProduct(productItem);
          setLoading(false);
        }
        return (componentMounted = false);
      });
    }
    getProduct();
  }, []);

  // setting slider
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    focusOnSelect: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          initialSlide: 1,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  // get id for Product component
  function getProductId(product) {
    props.getProductId(product);
  }

  // get product
  function getProduct(product) {
    props.getProduct(product);
  }
  // add to favs
  function getProductFav(product) {
    props.getProductFav(product);
  }

  // related products
  // start with id = 0
  var countProduct = 0;
  const RelatedProducts = () => {
    return (
      <>
        {data.map((data) => {
          if (data.id !== productItem) {
            if (countProduct <= 7) {
              countProduct++;
              return (
                <div className="col-md-3" key={data.id}>
                  <NavLink
                    to={`/product/${data.id}`}
                    onClick={() => getProductId(data)}
                  >
                    <img
                      className="card-img-top"
                      src={data.img}
                      alt="data img"
                    />
                  </NavLink>
                  <div className="card-body">
                    <h4 className="card-title">
                      {data.desc.substring(0, 20) + "..."}
                    </h4>
                    <p className="card-text">${data.price}</p>
                  </div>
                </div>
              );
            }
          }
        })}
      </>
    );
  };

  // loading if nothing

  const Loading = () => {
    return (
      <>
        <div className="col-md-8">
          <Skeleton height={100} width={300} />
          <Skeleton height={100} width={300} />
          <Skeleton height={100} width={300} />
        </div>
        <div className="col-md-4">
          <Skeleton height={100} width={300} />
          <Skeleton height={100} width={300} />
          <Skeleton height={100} width={300} />
        </div>
      </>
    );
  };

  // render data if not loading

  const ShowProduct = () => {
    return (
      <>
        {data.map((data) => {
          if (data.id === productItem)
            return (
              <React.Fragment key={data.id}>
                <div className="col-md-8">
                  <Slider className="card text-white product-img" {...settings}>
                    <div className="img me-2">
                      <img src={data.img1} alt="" />
                    </div>
                    <div className="img">
                      <img src={data.img2} alt="" />
                    </div>
                    <div className="img">
                      <img src={data.img3} alt="" />
                    </div>
                  </Slider>
                </div>
                <div className="col-md-4 details">
                  <div className="card-body">
                    <h4 className="card-title ">{data.desc}</h4>
                    <p className="card-text">${data.price}</p>
                    <p className="card-text fst-italic">{`"${data.desc2}"`}</p>
                    <p className="card-text ">{data.desc3}</p>
                  </div>
                  <div className=" d-flex justify-content-center">
                    <button
                      className="btn btn-outline-success fw-bolder me-2 mb-2"
                      to=""
                      onClick={() => getProduct(data)}
                    >
                      Add to cart
                    </button>
                    <NavLink
                      className="btn me-2 mb-2"
                      to={`/product/${data.id}`}
                      onClick={() => getProductFav(data)}
                    >
                      <i className="fa fa-heart heart"></i>
                    </NavLink>
                  </div>
                </div>
                {/* related products */}
                <div className="row">
                  <h2 className="text-center my-4">Related Products</h2>
                  <RelatedProducts />
                </div>
              </React.Fragment>
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
});

const mapStateToProps = (state, ownProps) => {
  return {
    productItem: state.productItem,
    cart: state.cart,
    fav: state.fav,
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
    getProductFav: (getProductFav) => {
      dispatch({ type: "ADD_ITEM_FAV", payload: getProductFav });
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Product);
