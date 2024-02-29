import React, { useState, useEffect } from "react";
import { Menu, Badge } from "antd";
import { currentUser } from "../../functions/auth";
import { auth } from "../../firebase";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMoon, faSun } from "@fortawesome/free-solid-svg-icons";
import {
  AppstoreOutlined,
  SettingOutlined,
  UserOutlined,
  UserAddOutlined,
  LogoutOutlined,
  ShoppingOutlined,
  ShoppingCartOutlined,
  MenuOutlined,
} from "@ant-design/icons";
import { Link } from "react-router-dom";
import firebase from "firebase";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import Search from "../forms/Search";
import { toast } from "react-toastify";

const { SubMenu, Item } = Menu;

const Header = ({ theme, toggleTheme }) => {
  const [current, setCurrent] = useState("home");
  const [userName, setUserName] = useState("");
  const [isSearchVisible, setIsSearchVisible] = useState(false);
  let dispatch = useDispatch();
  let { user, cart } = useSelector((state) => ({ ...state }));

  let history = useHistory();
  // const [themes, setThemes] = useState("");

  // useEffect(() => {
  //   const updatedTheme = localStorage.getItem("theme");
  //   console.log("Updated theme:", themes);
  //   setThemes(updatedTheme);
  //   console.log("Updated theme: from header", themes);
  // }, [themes, localStorage.getItem("theme")]);

  // const toggleTheme = () => {
  //   const newTheme = themes === "light" ? "dark" : "light";
  //   setThemes(newTheme);
  //   localStorage.setItem("theme", newTheme);
  // };
  useEffect(() => {
    setUserName(user && user.name ? user.name : "");
    // setUserName(user ? (user.name === name ? name : user.name) : "");
  }, [user]);
  useEffect(() => {
    const name = localStorage.getItem("displayName");

    setUserName(name);
  }, [localStorage.getItem("displayName")]);

  const handleClick = (e) => {
    setCurrent(e.key);
  };

  const logout = () => {
    firebase.auth().signOut();
    dispatch({
      type: "LOGOUT",
      payload: null,
    });
    localStorage.removeItem("address");
    toast.success("Logged Out successfully");
    history.push("/login");
  };

  const toggleSearch = () => {
    setIsSearchVisible(!isSearchVisible);
  };
  return (
    <div id={theme} className="header">
      <Menu
        theme={theme}
        onClick={handleClick}
        selectedKeys={[current]}
        mode="horizontal"
        style={{ overflow: "scroll" }}
      >
        <Item className="text" key="home" icon={<AppstoreOutlined />}>
          <Link className="text" to="/">
            Home
          </Link>
        </Item>

        <Item className="text" key="shop" icon={<ShoppingOutlined />}>
          <Link className="text" to="/shop">
            Shop
          </Link>
        </Item>

        <Item className="text" key="cart" icon={<ShoppingCartOutlined />}>
          <Link className="text" to="/cart">
            <Badge count={cart.length} offset={[9, 0]}>
              Cart
            </Badge>
          </Link>
        </Item>
        {theme === "light" ? (
          <Item
            key="light-mode"
            icon={
              <FontAwesomeIcon icon={faSun} style={{ marginRight: "8px" }} />
            }
            className="text"
            onClick={toggleTheme}
          >
            Switch to Dark Mode
          </Item>
        ) : (
          <Item
            key="dark-mode"
            className="text"
            icon={<FontAwesomeIcon icon={faMoon} className="text" />}
            onClick={toggleTheme}
          >
            Switch to Light Mode
          </Item>
        )}
        {!user && (
          <Item
            key="register"
            icon={<UserAddOutlined className="text" />}
            className="text float-right"
          >
            <Link className="text" to="/register">
              Register
            </Link>
          </Item>
        )}

        {!user && (
          <Item
            key="login"
            icon={<UserOutlined className="text" />}
            className="text float-right"
          >
            <Link
              className="text"
              // style={{ color: "theme===dark" ? "text-white" : "text-black" }}
              to="/login"
            >
              Login
            </Link>
          </Item>
        )}

        {user && (
          <SubMenu
            icon={<SettingOutlined />}
            className={
              theme === "light" ? "text float-right " : "text float-right"
            }
            title={userName}
          >
            {user && user.role === "subscriber" && (
              <Item
                icon={
                  <MenuOutlined
                    className={theme === "dark" ? "text-white" : "text-dark"}
                  />
                }
                className={theme === "dark" ? "text-white" : "text-dark"}
              >
                <Link
                  className={theme === "dark" ? "text-white" : "text-dark"}
                  to="/user/history"
                >
                  Dashboard
                </Link>
              </Item>
            )}

            {user && user.role === "admin" && (
              <Item
                icon={
                  <MenuOutlined
                    className={theme === "dark" ? "text-white" : "text-dark"}
                  />
                }
              >
                <Link
                  className={theme === "dark" ? "text-white" : "text-dark"}
                  to="/admin/dashboard"
                >
                  Dashboard
                </Link>
              </Item>
            )}

            <Item
              icon={
                <LogoutOutlined
                  className={theme === "dark" ? "text-white" : "text-dark"}
                />
              }
              className={theme === "dark" ? "text-white" : "text-dark"}
              // style={{ color: "theme===dark" ? "text-white" : "text-black" }}
              onClick={logout}
            >
              Logout
            </Item>
          </SubMenu>
        )}

        <span className="float-right">
          <Search className="text" />
        </span>
      </Menu>
    </div>
  );
};

export default Header;
