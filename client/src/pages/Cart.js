import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import ProductCardInCheckout from "../components/cards/ProductCardInCheckout";
import { userCart } from "../functions/user";

const Cart = ({ history }) => {
  const { cart, user } = useSelector((state) => ({ ...state }));
  const dispatch = useDispatch();
  const [theme, setTheme] = useState("dark");

  useEffect(() => {
    const updatedTheme = localStorage.getItem("theme");
    setTheme(updatedTheme);
    console.log("themes updated", theme);
  }, [theme]); // Include theme as a dependency in useEffect
  const getTotal = () => {
    return cart.reduce((currentValue, nextValue) => {
      return currentValue + nextValue.count * nextValue.price;
    }, 0);
  };

  const saveOrderToDb = () => {
    // console.log("cart", JSON.stringify(cart, null, 4));
    userCart(cart, user.token)
      .then((res) => {
        console.log("CART POST RES", res);
        if (res.data.ok) history.push("/checkout");
      })
      .catch((err) => console.log("cart save err", err));
  };

  const showCartItems = () => (
    <div>
<table className="table table-bordered border-dark">
      <thead>
        <tr>
          <th className="border-dark text-dark" scope="col">
            Image
          </th>
          <th className="border-dark text-dark" scope="col">
            Title
          </th>
          <th className="border-dark text-dark" scope="col">
            Price
          </th>
          <th className="border-dark text-dark" scope="col">
            Brand
          </th>
          <th className="border-dark text-dark" scope="col">
            Color
          </th>
          <th className="border-dark text-dark" scope="col">
            Count
          </th>
          <th className="border-dark text-dark" scope="col">
            Shipping
          </th>
          <th className="border-dark text-dark" scope="col">
            Remove
          </th>
        </tr>
      </thead>

      {cart.map((p) => (
        <ProductCardInCheckout key={p._id} p={p} />
      ))}
     
    </table>
<p className="border-dark text">
        Need to add more products to cart?{" "}
        <Link to="/shop">Continue Shopping.</Link>
      </p>
    </div>
    
  );

  return (
    <div className="cart container-fluid pt-2">
      <div className="row">
        <div className="col-md-8">
          {cart.length > 0 && (
            <h4 className="border-dark text">Cart / {cart.length} Product</h4>
          )}

          {!cart.length ? (
            <p
              style={{ marginLeft: "80vh", marginTop: "40vh" }}
              className="border-dark text"
            >
              No products in cart. <Link to="/shop">Continue Shopping.</Link>
            </p>
          ) : (
            showCartItems()
          )}
        </div>
        {cart.length > 0 && (
          <div className="col-md-4">
            <h4 className="text">Order Summary</h4>
            <hr />
            <p className="text">Products</p>
            {cart.map((c, i) => (
              <div key={i}>
                <p className="text">
                  {c.title} x {c.count} = ${c.price * c.count}
                </p>
              </div>
            ))}
            <hr />
            <span className="text">Total</span>:{" "}
            <b className="text">${getTotal()}</b>
            <hr />
            {user ? (
              <>
                <button
                  onClick={saveOrderToDb}
                  className="text btn btn-sm btn-primary mt-2"
                  disabled={!cart.length}
                >
                  Proceed to Checkout
                </button>
                <br />
                {/* <button
                onClick={saveCashOrderToDb}
                className="btn btn-sm btn-warning mt-2"
                disabled={!cart.length}
              >
                Pay Cash on Delivery
              </button> */}
              </>
            ) : (
              <button
                className={
                  theme === "dark"
                    ? "btn btn-sm btn-primary mt-2 text"
                    : "btn btn-sm btn-primary mt-2 text"
                }
              >
                <Link
                  to={{
                    pathname: "/login",
                    state: { from: "cart" },
                  }}
                >
                  Login to Checkout
                </Link>
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;
