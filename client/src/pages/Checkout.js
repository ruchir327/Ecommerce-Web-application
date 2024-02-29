import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import {
  getUserCart,
  emptyUserCart,
  saveUserAddress,
  applyCoupon,
  createCashOrderForUser,
  getUserAddress,
} from "../functions/user";
import PaymentCard from "../components/cards/PaymentCard.js";
import GooglePlacesAutocomplete from "react-google-places-autocomplete";
import { GOOGLE_PLACES_KEY } from "../config.js";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { Button, Input } from "antd";
import ProductCardInCart from "../components/cards/ProductCardInCart";
import { add } from "lodash";
import {
  LoadingOutlined,
  SyncOutlined,
  CloseOutlined,
} from "@ant-design/icons";

const Checkout = ({ history }) => {
  const [products, setProducts] = useState([]);
  const [total, setTotal] = useState(0);
  const [address, setAddress] = useState("");
  const [addressSaved, setAddressSaved] = useState(false);
  const [coupon, setCoupon] = useState("");
  const [loading, setLoading] = useState(true);
const [visible,setvisible] = useState(false);
  // discount price
  const [totalAfterDiscount, setTotalAfterDiscount] = useState(0);
  const [discountError, setDiscountError] = useState("");

  const dispatch = useDispatch();
  const { user, COD, cart } = useSelector((state) => ({ ...state }));
  const couponTrueOrFalse = useSelector((state) => state.coupon);
  const [theme, setTheme] = useState("dark");

  useEffect(() => {
    const fetchTheme = () => {
      const updatedTheme = localStorage.getItem("theme");
      setTheme(updatedTheme);
      console.log("Theme updated:", updatedTheme);
    };
    fetchTheme();
  }, []);

  useEffect(() => {
    const fetchUserAddress = async () => {
      try {
        const res = await getUserAddress(user.token);
        if (res.data.address) {
          setAddress(res.data.address);
          localStorage.setItem("address", res.data.address);
          setAddressSaved(true);
        } else {
          setAddress("");
          localStorage.removeItem("address");
          setAddressSaved(false);
        }
        // Address is fetched, set loading to false
        setLoading(false);
      } catch (error) {
        console.error("Error fetching user cart:", error);
      }
    };
    fetchUserAddress();
  }, []);

  useEffect(() => {
    const fetchUserCart = async () => {
      try {
        const res = await getUserCart(user.token);
        setProducts(res.data.products);
        setTotal(res.data.cartTotal);
        console.log("User cart fetched:", res.data.products);
      } catch (error) {
        console.error("Error fetching user cart:", error);
      }
    };
    fetchUserCart();
  }, []);

  const handleAddressChange = (value) => {
    console.log("Selected address:", value.description);
    setAddress(value.description);
  };
  const emptyCart = () => {
    // remove from local storage
    if (typeof window !== "undefined") {
      localStorage.removeItem("cart");
    }
    // remove from redux
    dispatch({
      type: "ADD_TO_CART",
      payload: [],
    });
    // remove from backend
    emptyUserCart(user.token).then((res) => {
      setProducts([]);
      setTotal(0);
      setTotalAfterDiscount(0);
      setCoupon("");
      toast.success("Cart is empty. Continue shopping.");
    });
  };

  const saveAddressToDb = async () => {
    try {
      const res = await saveUserAddress(user.token, address);
      if (res.data.ok) {
        setAddressSaved(true);
        localStorage.setItem("address", res.data.address);
        toast.success("Address saved");
      }
    } catch (error) {
      console.error("Error saving address:", error);
    }
  };
  const applyDiscountCoupon = () => {
    applyCoupon(user.token, coupon).then((res) => {
      if (res.data) {
        setTotalAfterDiscount(res.data);
        dispatch({
          type: "COUPON_APPLIED",
          payload: true,
        });
      }
      if (res.data.err) {
        setDiscountError(res.data.err);
        dispatch({
          type: "COUPON_APPLIED",
          payload: false,
        });
      }
      setvisible(true)
    });
  };

  const showProductSummary = () =>
    products.map((p, i) => (
      <div className={theme === "dark" ? "texts" : "text"} key={i}>
        <p>
          {p.product.title} ({p.color}) x {p.count} ={" "}
          {p.product.price * p.count}
        </p>
      </div>
    ));

  const showProductcard = () =>
    cart.map((product) => (
      <div
        key={product._id}
        style={{ marginLeft: "100px" }}
        className=" mt-3 col-md-8"
      >
        <ProductCardInCart product={product} iscart={true} />
      </div>
    ));

  const showApplyCoupon = () => (
    <div>
      <Input
        onChange={(e) => {
          setCoupon(e.target.value);
          setDiscountError("");
        }}
        value={coupon}
        type="text"
        // className={theme === "light" ? " text-dark" : " text"}
      />
      <Button onClick={applyDiscountCoupon} className="btn btn-primary mt-2">
        Apply
      </Button>
    </div>
  );

  const createCashOrder = () => {
    createCashOrderForUser(user.token, COD, couponTrueOrFalse).then((res) => {
      if (res.data.ok) {
        if (typeof window !== "undefined") localStorage.removeItem("cart");
        dispatch({
          type: "ADD_TO_CART",
          payload: [],
        });
        dispatch({
          type: "COUPON_APPLIED",
          payload: false,
        });
        dispatch({
          type: "COD",
          payload: false,
        });
        emptyUserCart(user.token);
        setTimeout(() => {
          history.push("/user/history");
        }, 1000);
      }
    });
  };

  // Return loading indicator if address is still being fetched
  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center vh-100">
        <SyncOutlined spin />{" "}
      </div>
    );
  }

  // Render checkout content once address is fetched
  return (
    <div className="row">
      <div className="checkout2 col-md-6">
        <h4 className="text">Delivery Address</h4>
        <br />
        <br />
        <div>
          <GooglePlacesAutocomplete
            apiKey={GOOGLE_PLACES_KEY}
            apiOptions="us"
            selectProps={{
              defaultInputValue: localStorage.getItem("address")
                ? localStorage.getItem("address")
                : "",
              placeholder: "Search for address..",
              onChange: ({ value }) => {
                handleAddressChange(value);
              },
            }}
          />

          <button className="btn btn-primary mt-2" onClick={saveAddressToDb}>
            Save
          </button>
        </div>

        <hr />
        {showProductcard()}
        <hr />
        <h4 className="text">Got Coupon?</h4>
        <br />
        {showApplyCoupon()}
        <br />
        {discountError && <p className="bg-danger p-2">{discountError}</p>}
      </div>

      <div className="checkout2 col-md-6">
        <h4 className="text">Order Summary</h4>
        <hr />
        <p className="text">Products {products.length}</p>
        <hr />
        {showProductSummary()}
        <hr />
        <p className="text">Cart Total: {totalAfterDiscount>0?totalAfterDiscount:total}</p>

        {totalAfterDiscount > 0 &&visible&& (
          <div
            className={
              theme === "dark"
                ? "bg-success p-2 texts d-flex justify-content-between align-items-center"
                : "bg-success p-2 text d-flex justify-content-between align-items-center"
            }
          >
            Discount Applied: Total Payable: ${totalAfterDiscount}
            <CloseOutlined
              onClick={()=>setvisible(false)} // Uncomment and implement handleRemove function to make the icon functional
              className="text-danger pointer"
            />
          </div>
        )}

        <div>
          <PaymentCard
            createCashOrder={createCashOrder}
            emptyCart={emptyCart}
            addressSaved={addressSaved}
            products={products}
            address={address}
          />
        </div>
        {/* <div className="row pr-6">
          <div className="col-md-7">
            {COD ? (
              <button
                className="btn btn-primary"
                disabled={!addressSaved || !products.length || !address}
                onClick={createCashOrder}
              >
                Place Order
              </button>
            ) : (
              <button
                className="btn btn-primary"
                disabled={!addressSaved || !address || !products.length}
                onClick={() => console.log(address)}
              >
                Place Order
              </button>
            )}
          </div>

          <div style={{ marginRight: "-20px" }} className=" col-md-5">
            <button
              disabled={!products.length}
              onClick={emptyCart}
              className="btn btn-primary"
            >
              Empty Cart
            </button>
          </div>
        </div> */}
      </div>
    </div>
  );
};

export default Checkout;
