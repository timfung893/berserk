import React, { useEffect } from "react";
import { useState } from "react";
import { connect } from "react-redux";
import { productSource } from "../firebaseConnect";

const Product = (props) => {
  const productItem = props.productItem;
  console.log(productItem);
  const [product, setProduct] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);

    function getProduct() {
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

          const newList = productData.filter((x) => x.id === productItem);

          setProduct(newList);
          setLoading(false);
        });
      });
    }
    getProduct();
  }, []);

  const Loading = () => {
    return <>... loading</>;
  };

  const ShowProduct = () => {
    return (
      <>
        {product.map((data) => {
          return (
            <>
              <div className="col-md-6" key={data.id}>
                <div className="card text-white bg-primary">
                  <img className="card-img-top" src={data.img} alt="" />
                  <div className="card-body">
                    <h4 className="card-title">{data.desc}</h4>
                    <p className="card-text">{data.price}</p>
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
    <div className="container">
      <div className="row">{loading ? <Loading /> : <ShowProduct />}</div>
    </div>
  );
};

const mapStateToProps = (state, ownProps) => {
  return {
    productItem: state.productItem,
  };
};

export default connect(mapStateToProps)(Product);
