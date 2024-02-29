import React, { useState, useEffect } from "react";
import { auth } from "../../firebase";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { Button } from "antd";

const ForgotPassword = ({ history }) => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const { user } = useSelector((state) => ({ ...state }));

  useEffect(() => {
    if (user && user.token) history.push("/");
  }, [user, history]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const config = {
      url: process.env.REACT_APP_FORGOT_PASSWORD_REDIRECT,
      handleCodeInApp: true,
    };

    await auth
      .sendPasswordResetEmail(email, config)
      .then(() => {
        setEmail("");
        setLoading(false);
        toast.success("Check your email for password reset link");
      })
      .catch((error) => {
        setLoading(false);
        toast.error(error.message);
        console.log("ERROR MSG IN FORGOT PASSWORD", error);
      });
  };

  return (
    <div className="container-fluid mt-5 ml-2 ">
      <div className="row d-flex justify-content-center align-items-center vh-100">
        <div className="col-lg-5 bg-light p-5 shadow">
          {loading ? (
            <h4 className="text-danger">Loading</h4>
          ) : (
            <h4 className="text-center">Forgot Password</h4>
          )}

          <form onSubmit={handleSubmit}>
            <input
              type="email"
              className="form-control"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Type your email"
              autoFocus
            />
            <br />
            <Button className="btn btn-raised" disabled={!email}>
              Submit
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
