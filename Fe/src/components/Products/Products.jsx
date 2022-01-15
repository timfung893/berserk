import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";


Products.propTypes = {
  data: PropTypes.array,
  filter: PropTypes.array,
  loading: PropTypes.bool,
};

Products.defaultProp = {
  data: [],
  filter: [],
  loading: true,
};

function Products(props) {
  const [data, setData] = useState([]);
  const [filter, setFilter] = useState(data);
  const [loading, setLoading] = useState(false);

  let componentMounted = true;

  useEffect(() => {
    async function getData() {
      setLoading(true);
      const response = await fetch(
        "https://berserk-545af-default-rtdb.asia-southeast1.firebasedatabase.app"
      );

      // render data if component is mounted
      if (componentMounted) {
        setData(await response.clone().json());
        setFilter(await response.json());
        setLoading(false);
        console.log(filter);
      }

      return function () {
        componentMounted = false;
      };
    }
    getData();
    // render one time with deps []
  }, []);  

  return <div></div>;
}

export default Products;
