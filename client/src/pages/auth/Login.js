import React, { useState, useEffect } from "react";
import { auth, googleAuthProvider, facebookAuthProvider } from "../../firebase";
import { toast } from "react-toastify";
import { Button, Input } from "antd";
import {
  MailOutlined,
  GoogleOutlined,
  FacebookOutlined,
  SyncOutlined,
  LoadingOutlined,
  EyeInvisibleOutlined,
  EyeTwoTone,
} from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { createOrUpdateUser } from "../../functions/auth";
const { Password } = Input;

const Login = ({ history }) => {
  const [email, setEmail] = useState("ruchirshrikhande444@gmail.com");
  const [password, setPassword] = useState("MongoDb123$");
  const [loading, setLoading] = useState(false);
  const [passwordVisible, setPasswordVisible] = useState(false);

  const { user } = useSelector((state) => ({ ...state }));

  const [theme, setTheme] = useState("dark");
  // Function to handle theme retrieval and state update

  useEffect(() => {
    // Function to update theme state

    const updatedTheme = localStorage.getItem("theme");
    setTheme(updatedTheme);
    console.log("themes updated", theme);
  });

  //   // Initial setup
  //   updateTheme();

  //   // Event listener for theme changes in localStorage
  //   const themeChangeListener = () => {
  //     updateTheme();
  //   };
  //   window.addEventListener("storage", themeChangeListener);

  //   // Cleanup function to remove event listener
  //   return () => {
  //     window.removeEventListener("storage", themeChangeListener);
  //   };
  // }, []);

  useEffect(() => {
    let intended = history.location.state;
    if (intended) {
      return;
    } else {
      if (user && user.token) history.push("/");
    }
  }, [user, history]);

  let dispatch = useDispatch();

  const roleBasedRedirect = (res) => {
    // check if intended
    let intended = history.location.state;
    if (intended) {
      history.push(intended.from);
    } else {
      if (res.data.role === "admin") {
        history.push("/admin/dashboard");
      } else {
        history.push("/user/history");
      }
      toast.success("Logged In successfully");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    // console.table(email, password);
    try {
      const result = await auth.signInWithEmailAndPassword(email, password);
      // console.log(result);
      const { user } = result;
      const idTokenResult = await user.getIdTokenResult();

      createOrUpdateUser(idTokenResult.token)
        .then((res) => {
          dispatch({
            type: "LOGGED_IN_USER",
            payload: {
              name: res.data.name,
              email: res.data.email,
              token: idTokenResult.token,
              role: res.data.role,
              _id: res.data._id,
            },
          });

          roleBasedRedirect(res);
        })
        .catch((err) => console.log(err));

      // history.push("/");
    } catch (error) {
      console.log(error);
      toast.error(error.message);
      setLoading(false);
    }
  };

  const facebookLogin = async () => {
    auth
      .signInWithPopup(facebookAuthProvider)
      .then(async (result) => {
        const { user } = result;
        const idTokenResult = await user.getIdTokenResult();
        createOrUpdateUser(idTokenResult.token)
          .then((res) => {
            dispatch({
              type: "LOGGED_IN_USER",
              payload: {
                name: res.data.name,
                email: res.data.email,
                token: idTokenResult.token,
                role: res.data.role,
                _id: res.data._id,
              },
            });
            roleBasedRedirect(res);
          })
          .catch((err) => console.log(err));
        // history.push("/");
      })
      .catch((err) => {
        console.log(err);
        toast.error(err.message);
      });
  };
  const googleLogin = async () => {
    auth
      .signInWithPopup(googleAuthProvider)
      .then(async (result) => {
        const { user } = result;
        const idTokenResult = await user.getIdTokenResult();
        createOrUpdateUser(idTokenResult.token)
          .then((res) => {
            dispatch({
              type: "LOGGED_IN_USER",
              payload: {
                name: res.data.name,
                email: res.data.email,
                token: idTokenResult.token,
                role: res.data.role,
                _id: res.data._id,
              },
            });
            roleBasedRedirect(res);
          })
          .catch((err) => console.log(err));
        // history.push("/");
      })
      .catch((err) => {
        console.log(err);
        toast.error(err.message);
      });
  };

  const loginForm = () => (
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <Input
          type="email"
          className="mt-2 mb-3 form-control"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Your email"
          autoFocus
        />
      </div>

      <div className="form-group">
        <Password
          className="form-control"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Your password"
          iconRender={(visible) =>
            visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
          }
          onClickIcon={() => setPasswordVisible(!passwordVisible)}
          type={passwordVisible ? "text" : "password"}
        />
      </div>

      <Button
        onClick={handleSubmit}
        type="primary"
        className="mb-3"
        block
        shape="square"
        icon={<MailOutlined />}
        size="large"
        disabled={!email || password.length < 6}
      >
        {/* Login with Email/Password */}
        {loading ? (
          <SyncOutlined style={{ height: "10rem", width: "10rem" }} spin />
        ) : (
          "Login with Email/Password"
        )}
      </Button>
      <Button
        onClick={googleLogin}
        type="danger"
        className=" mb-3"
        block
        shape="square"
        icon={
          <GoogleOutlined
            style={{ marginLeft: "-60px", paddingRight: "5px" }}
          />
        }
        size="large"
      >
        {loading ? (
          <SyncOutlined
            className="text-center"
            style={{ width: "10rem" }}
            spin
          />
        ) : (
          "Login with Google"
        )}
      </Button>

      <Button
        onClick={facebookLogin}
        type="primary"
        className="mb-3"
        block
        shape="square"
        icon={
          <FacebookOutlined
            className="text-center"
            style={{ marginLeft: "-45px" }}
          />
        }
        size="large"
      >
        {loading ? (
          <SyncOutlined
            className="text-center"
            style={{ width: "10rem" }}
            spin
          />
        ) : (
          "Login with Facebook"
        )}
      </Button>

      <Link
        to="/forgot/password"
        style={{ marginLeft: "-30px" }}
        className="text-danger d-flex justify-content-center align-itms-center "
      >
        Forgot Password?
      </Link>
    </form>
  );

  return (
    <div className="signup container-fluid">
      <div className="row">
        <div className="col d-flex justify-content-center align-items-center vh-100">
          <div className="card-container">
            {/* This div represents the login card with adjusted positioning */}
            {loading ? (
              <LoadingOutlined
                className="d-flex justify-content-center align-items-center vh-100"
                spin
              />
            ) : (
              <h4 className="text-center">Login</h4>
            )}
            {loginForm()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
