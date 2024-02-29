import React, { useState, useEffect } from "react";
import ModalImage from "react-modal-image";
import laptop from "../../images/laptop.png";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import {
  CheckCircleOutlined,
  CloseCircleOutlined,
  CloseOutlined,
} from "@ant-design/icons";

const ProductCardInCheckout = ({ p }) => {
  const colors = ["Black", "Brown", "Silver", "White", "Blue"];
  const [theme, setTheme] = useState("dark");

  useEffect(() => {
    console.log("product" + p.color);
    const updatedTheme = localStorage.getItem("theme");
    setTheme(updatedTheme);
    console.log("themes updated", theme);
  }, [theme]); // Include theme as a dependency in useEffect

  let dispatch = useDispatch();

  const handleColorChange = (e) => {
    console.log("color changed", e.target.value);

    let cart = [];
    if (typeof window !== "undefined") {
      if (localStorage.getItem("cart")) {
        cart = JSON.parse(localStorage.getItem("cart"));
      }

      cart.map((product, i) => {
        if (product._id === p._id) {
          cart[i].color = e.target.value;
        }
      });

      //  console.log('cart udpate color', cart)
      localStorage.setItem("cart", JSON.stringify(cart));
      dispatch({
        type: "ADD_TO_CART",
        payload: cart,
      });
    }
  };

  const handleQuantityChange = (e) => {
    // console.log("available quantity", p.quantity);
    let count = e.target.value < 1 ? 1 : e.target.value;

    if (count > p.quantity) {
      toast.error(`Max available quantity: ${p.quantity}`);
      return;
    }

    let cart = [];

    if (typeof window !== "undefined") {
      if (localStorage.getItem("cart")) {
        cart = JSON.parse(localStorage.getItem("cart"));
      }

      cart.map((product, i) => {
        if (product._id == p._id) {
          cart[i].count = count;
        }
      });

      localStorage.setItem("cart", JSON.stringify(cart));
      dispatch({
        type: "ADD_TO_CART",
        payload: cart,
      });
    }
  };

  const handleRemove = () => {
    // console.log(p._id, "to remove");
    let cart = [];

    if (typeof window !== "undefined") {
      if (localStorage.getItem("cart")) {
        cart = JSON.parse(localStorage.getItem("cart"));
      }
      // [1,2,3,4,5]
      cart.map((product, i) => {
        if (product._id === p._id) {
          cart.splice(i, 1);
        }
      });

      localStorage.setItem("cart", JSON.stringify(cart));
      dispatch({
        type: "ADD_TO_CART",
        payload: cart,
      });
    }
  };

  return (
    <tbody>
      <tr className="border-dark">
        <td className="border-dark text-dark">
          <div style={{ width: "60px", height: "auto" }}>
            {p.images.length ? (
              <ModalImage small={p.images[0].url} large={p.images[0].url} />
            ) : (
              <ModalImage small={laptop} large={laptop} />
            )}
          </div>
        </td>
        <td
          style={{ width: "100px", paddingTop: "25px" }}
          className=" border-dark text-dark"
        >
          {p.title}
        </td>
        <td style={{ paddingTop: "27px" }} className="border-dark text-dark">
          ${p.price}
        </td>
        <td style={{ paddingTop: "25px" }} className="border-dark text-dark">
          {p.brand}
        </td>

        <td
          style={{ width: "100px", paddingTop: "14px" }}
          className="border-dark text"
        >
          <select
            onChange={handleColorChange}
            name="color"
            className="form-control text-dark"
          >
            {p.color ? (
              <option className="border-dark text-dark" value={p.color}>
                {p.color}
              </option>
            ) : (
              <option className="border-dark text-dark">Select</option>
            )}
            {colors
              .filter((c) => c !== p.color)
              .map((c) => (
                <option
                  style={{ paddingTop: "25px" }}
                  className="border-dark text-dark "
                  key={c}
                  value={c}
                >
                  <span className=" text-dark"> {c}</span>
                </option>
              ))}
          </select>
        </td>
        <td className="border-dark text-dark">
          <input
            type="number"
            style={{ width: "30px" }}
            className="ml-2 form-control text-dark"
            value={p.count}
            onChange={handleQuantityChange}
          />
        </td>
        <td
          className="border-dark text-dark"
          style={{ paddingTop: "35px", paddingLeft: "45px" }}
        >
          {p.shipping === "Yes" ? (
            <CheckCircleOutlined className="text-success" />
          ) : (
            <CloseCircleOutlined className="text-danger" />
          )}
        </td>
        <td
          className="border-dark text"
          style={{ paddingTop: "35px", paddingLeft: "45px" }}
        >
          <CloseOutlined
            onClick={handleRemove}
            className="text-danger pointer"
          />
        </td>
      </tr>
    </tbody>
  );
};

export default ProductCardInCheckout;
