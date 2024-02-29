import React, { useState, useEffect } from "react";
import { auth } from "../../firebase";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { Button, Input } from "antd";
import { MailOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";

const Register = ({ history }) => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const { user } = useSelector((state) => ({ ...state }));
  const [loading, setLoading] = useState(false);

  const [theme, setTheme] = useState("dark");
  // Function to handle theme retrieval and state update

  useEffect(() => {
    // Function to update theme state

    const updatedTheme = localStorage.getItem("theme");
    setTheme(updatedTheme);
    console.log("themes updated", theme);
  });

  useEffect(() => {
    if (user && user.token) history.push("/");
  }, [user, history]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    // console.log("ENV --->", process.env.REACT_APP_REGISTER_REDIRECT_URL);
    const config = {
      url: process.env.REACT_APP_REGISTER_REDIRECT_URL,
      handleCodeInApp: true,
    };

    await auth.sendSignInLinkToEmail(email, config);
    toast.success(
      `Email is sent to ${email}. Click the link to complete your registration.`
    );
    // save user email in local storage
    window.localStorage.setItem("emailForRegistration", email);
    window.localStorage.setItem("nameForRegistration", name);

    // clear state
    setEmail("");
  };

  const registerForm = () => (
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <Input
          type="text"
          className="mt-3 mb-3 form-control"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Your Name"
          autoFocus
        />
        <Input
          type="email"
          value={email}
          className="mt-3 mb-3 form-control"
          onChange={(e) => setEmail(e.target.value)}
          placeholder=" Your email"
          autoFocus
        />

        <Button
          onClick={handleSubmit}
          // type="primary"
          block
          style={{ marginBottom: "-100px" }}
          // className="mt-2"
          shape="square"
          icon={<MailOutlined />}
          size="large"
          disabled={!email || !name}
        >
          Register
        </Button>
        <Link
          to="/login"
          style={{ marginTop: "30px", marginLeft: "-30px" }}
          className="text-danger d-flex justify-content-center align-itms-center "
        >
          Already have an account?
        </Link>
      </div>
    </form>
  );

  return (
    <div className="register container-fluid">
      <div className="row">
        <div className="col d-flex justify-content-center align-items-center vh-100">
          <div className="card-container">
            {/* This div represents the login card with adjusted positioning */}
            {loading ? (
              <h4 className="text-danger">Loading...</h4>
            ) : (
              <h4 className="text-center">Register</h4>
            )}
            {registerForm()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
