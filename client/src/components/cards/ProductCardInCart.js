import React, { useState, useEffect } from "react";
import { Card, Tooltip } from "antd";
import { EyeOutlined, ShoppingCartOutlined } from "@ant-design/icons";
import laptop from "../../images/laptop.png";
import { Link } from "react-router-dom";
import ShowAverage from "../../functions/rating";
import _ from "lodash";
import { useSelector, useDispatch } from "react-redux";

const { Meta } = Card;

const ProductCard = ({ product, iscart }) => {
  const [tooltip, setTooltip] = useState("Click to add");
  const [theme, setTheme] = useState("dark");

  useEffect(() => {
    console.log("product received" + JSON.stringify(product));
    const updatedTheme = localStorage.getItem("theme");
    setTheme(updatedTheme);
    console.log("themes updated", theme);
  }, [theme]); // Include theme as a dependency in useEffect
  // redux
  const { user, cart } = useSelector((state) => ({ ...state }));
  const dispatch = useDispatch();

  const handleAddToCart = () => {
    // create cart array
    let cart = [];
    if (typeof window !== "undefined") {
      // if cart is in local storage GET it
      if (localStorage.getItem("cart")) {
        cart = JSON.parse(localStorage.getItem("cart"));
      }
      // push new product to cart
      cart.push({
        ...product,
        count: 1,
      });
      // remove duplicates
      let unique = _.uniqWith(cart, _.isEqual);
      // save to local storage
      // console.log('unique', unique)
      localStorage.setItem("cart", JSON.stringify(unique));
      // show tooltip
      setTooltip("Added");

      // add to reeux state
      dispatch({
        type: "ADD_TO_CART",
        payload: unique,
      });
      // show cart items in side drawer
      dispatch({
        type: "SET_VISIBLE",
        payload: true,
      });
    }
  };

  // destructure
  const { images, title, description, slug, price } = product;
  return (
    <div>
      {product && product.ratings && product.ratings.length > 0 ? (
        <ShowAverage p={product} iscart={iscart} />
      ) : (
        <div className="text text-center pt-1 pb-3">No rating yet</div>
      )}

      <Card
        cover={
          <img
            src={images && images.length ? images[0].url : laptop}
            style={{ height: "150px", objectFit: "cover" }}
            className=" p-1"
          />
        }
      >
        <Meta
          className=" ant-card-body"
          title={
            <div
              className={theme === "dark" ? "text" : "texts"}
            >{`${title} - $${price}`}</div>
          }
          // className={`Card ${theme === "dark" ? "darkCard" : "lightCard"}`}
          description={
            <div className={theme === "dark" ? "text" : "texts"}>
              {`${description && description.substring(0, 40)}...`}
            </div>
          }
        />
      </Card>
    </div>
  );
};

export default ProductCard;
