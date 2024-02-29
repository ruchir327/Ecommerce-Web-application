import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { userCart } from "../../functions/user";
import { Card, Row, Col, Radio } from "antd";
import cod from "../../images/cod.png";
import card from "../../images/card.png";
import { useHistory } from "react-router-dom";

const PaymentCard = ({
  createCashOrder,
  emptyCart,
  addressSaved,
  address,
  products,
}) => {
  const [selectedOption, setSelectedOption] = useState(null);
  const { user, cart } = useSelector((state) => state);
  const dispatch = useDispatch();
  let history = useHistory();
  const [theme, setTheme] = useState("dark");

  useEffect(() => {
    const updatedTheme = localStorage.getItem("theme");
    setTheme(updatedTheme);
    console.log("themes updated", theme);
  }, [theme]); // Include theme as a dependency in useEffect

  const handleOptionChange = (e) => {
    setSelectedOption(e.target.value);
    if (e.target.value === 1) {
      dispatch({ type: "COD", payload: true });
    } else {
      dispatch({ type: "COD", payload: false });
    }
  };

  const saveCashOrderToDb = () => {
    dispatch({
      type: "COD",
      payload: true,
    });
    userCart(cart, user.token)
      .then((res) => {
        console.log("CART POST RES", res);
        if (res.data.ok) history.push("/checkout");
      })
      .catch((err) => console.log("cart save err", err));
  };

  return (
    <div>
      <h4 className="mt-4 mb-4 text"> Payment Options</h4>
      <Card
        style={{
          // paddingLeft: "100px",
          // textAlign: "center",
          marginLeft: "-5px",
          width: "100%%",
          marginTop: "50px",
        }}
      >
        <Radio.Group
          style={{ width: "100%" }}
          onChange={handleOptionChange}
          value={selectedOption}
        >
          <hr />

          <Radio
            style={{
              display: "block",
              backgroundColor: selectedOption === 1 ? "#f0f0f0" : "transparent",
              padding: selectedOption === 1 ? "-10px 0" : "0",
            }}
            value={1}
          >
            <Row>
              <Col span={10}></Col>
              <Col span={14}>
                <img
                  src={cod}
                  alt="Card Payment"
                  style={{ marginLeft: "-10px", width: "30px" }}
                />
                Cash On Delivery
              </Col>
            </Row>
          </Radio>
          <hr />
          <Radio
            style={{
              display: "block",
              backgroundColor: selectedOption === 2 ? "#f0f0f0" : "transparent",
              padding: selectedOption === 2 ? "-10px 0" : "0",
            }}
            value={2}
          >
            <Row>
              <Col span={10}></Col>
              <Col span={14}>
                <img
                  src={card}
                  style={{ marginLeft: "-10px", width: "30px" }}
                />
                Pay with Card
              </Col>
            </Row>
          </Radio>
          <hr />
        </Radio.Group>
      </Card>

      <div className="row pr-6">
        <div
          style={{ marginTop: theme === "dark" ? "10px" : "10px" }}
          className="col-md-10"
        >
          {selectedOption === 1 ? (
            <button
              className="btn btn-primary"
              disabled={!addressSaved || !products.length || !address}
              onClick={createCashOrder}
            >
              Place Order
            </button>
          ) : (
            <button
              style={{ marginTop: theme === "dark" ? "20px" : "20px" }}
              className="btn btn-primary"
              disabled={!addressSaved || !address || !products.length}
              onClick={() => history.push("/payment")}
            >
              Place Order
            </button>
          )}
        </div>

        <div
          style={{
            marginTop: theme === "dark" ? "20px" : "20px",
          }}
          className=" col-md-2"
        >
          <button
            disabled={!products.length}
            onClick={emptyCart}
            className="btn btn-primary"
          >
            Empty Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default PaymentCard;
