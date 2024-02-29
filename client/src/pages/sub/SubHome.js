import React, { useState, useEffect } from "react";
import { getSub } from "../../functions/sub";
import ProductCard from "../../components/cards/ProductCard";

const SubHome = ({ match }) => {
  const [sub, setSub] = useState({});
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  const { slug } = match.params;
  const [theme, setTheme] = useState("dark");
  // Function to handle theme retrieval and state update

  useEffect(() => {
    // Function to update theme state

    const updatedTheme = localStorage.getItem("theme");
    setTheme(updatedTheme);
    console.log("themes updated", theme);
  }, []);
  useEffect(() => {
    setLoading(true);
    getSub(slug).then((res) => {
      console.log(JSON.stringify(res.data, null, 4));
      setSub(res.data.sub);
      setProducts(res.data.products);
      setLoading(false);
    });
  }, []);

  return (
    <div className="subcategories container-fluid">
      <div className="row">
        <div className="col">
          {loading ? (
            <h4 className="text-center p-3 mt-5 mb-5 display-4 jumbotron">
              Loading...
            </h4>
          ) : (
            <h4
              style={{
                width: theme === "dark" ? "1750px" : "1763px",
                marginTop: "300px",
                marginLeft: theme === "dark" ? "-100px" : "",
              }}
              className="d-flex products justify-content-center align-items-center  text-center p-3  display-4 jumbotron"
            >
              {products.length} Products in "{sub.name}" sub category
            </h4>
          )}
        </div>
      </div>

      <div className="row">
        {products.map((p) => (
          <div className="col" key={p._id}>
            <ProductCard product={p} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default SubHome;
