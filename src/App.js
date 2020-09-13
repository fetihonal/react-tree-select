import React, { useState } from "react";
import MultiLevel from "./multi-level-select/index";
import data from "./data";
import "./styles.css";

const App = (props) => {
  const [productCategories, setProductCategories] = useState();

  const checkEvent = (id, e) => {
    setProductCategories({
      ...productCategories,
      [id]: e
    });
  };
  console.log(productCategories);

  return (
    <MultiLevel
      item={{ children: data }}
      nodesProp="children"
      lang={"name"}
      checkList={productCategories}
      onChange={checkEvent}
    />
  );
};
export default App;
