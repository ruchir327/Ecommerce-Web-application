import { Menu, Drawer, Badge } from "antd";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Search from "../forms/Search";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMoon,faSun } from "@fortawesome/free-solid-svg-icons";
import {
  AppstoreOutlined,
  SettingOutlined,
  UserOutlined,
  UserAddOutlined,
  LogoutOutlined,
  ShoppingOutlined,
  ShoppingCartOutlined,
} from "@ant-design/icons";

const { SubMenu, Item } = Menu;
const HeaderMenu = ({
  current,
  userName,
  user,
  handleClick,
  logout,
  mode,
  className,
  cart,

  darkMode,
}) => {
  const [themes, setThemes] = useState("");

  useEffect(() => {
    const updatedTheme = localStorage.getItem("theme");
    console.log("Updated theme:", updatedTheme);
    setThemes(updatedTheme || "");
    // console.log("Current theme:", theme); // Check if theme state is updated
  }, [themes, localStorage.getItem("theme")]);

  const toggleTheme = () => {
    const newTheme = themes === "light" ? "dark" : "light";
    setThemes(newTheme);

    // Update the theme value in local storage
    localStorage.setItem("theme", newTheme);
  };
  return (
    <>
      <Menu
        onClick={handleClick}
        selectedKeys={[current]}
        mode={mode}
        theme="dark"
        className={className}
      >
        {mode === "vertical" && (
          <>
            <Item key="home" icon={<AppstoreOutlined />}>
              <Link to="/">Home</Link>
            </Item>

            <Item key="shop" icon={<ShoppingOutlined />}>
              <Link to="/shop">Shop</Link>
            </Item>

            <Item key="cart" icon={<ShoppingCartOutlined />}>
              <Link to="/cart">
                <Badge count={cart.length} offset={[9, 0]}>
                  Cart
                </Badge>
              </Link>
            </Item>
            {!user && (
              <Item key="register" icon={<UserAddOutlined />}>
                <Link to="/register">Register</Link>
              </Item>
            )}
            {!user && (
              <Item key="login" icon={<UserOutlined />}>
                <Link to="/login">Login</Link>
              </Item>
            )}
            {themes === "light" ? (
              <Item
                key="light-mode"
                icon={<FontAwesomeIcon icon={faSun} />}
                className={themes === "dark" ? "text-white" : "text-dark"}
                style={{
                  color: themes === "light" ? "#fff" : "", // Adjust text color for light mode
                }}
                onClick={toggleTheme}
              >
                Switch to Dark Mode
              </Item>
            ) : (
              <Item
                key="dark-mode"
                className={themes === "dark" ? "text-white" : "text-dark"}
                icon={<FontAwesomeIcon icon={faMoon} />}
                onClick={toggleTheme}
              >
                Switch to Light Mode
              </Item>
            )}
          </>
        )}

        {user && (
          <SubMenu
            icon={<SettingOutlined />}
            title={userName}
            className={mode === "vertical" ? "float-left" : "float-right"}
          >
            <Item key="dashboard">
              <Link
                to={
                  user.role === "admin" ? "/admin/dashboard" : "/user/history"
                }
              >
                Dashboard
              </Link>
            </Item>
            <Item icon={<LogoutOutlined />} onClick={logout}>
              Logout
            </Item>
          </SubMenu>
        )}

        {mode !== "vertical" && (
          <>
            {themes === "light" ? (
              <Item
                key="light-mode"
                icon={<FontAwesomeIcon icon={faSun} />}
                className={themes === "dark" ? "text-white" : "text-dark"}
                style={{
                  color: themes === "light" ? "#fff" : "", // Adjust text color for light mode
                }}
                onClick={toggleTheme}
              >
                Switch to Dark Mode
              </Item>
            ) : (
              <Item
                key="dark-mode"
                className={themes === "dark" ? "text-white" : "text-dark"}
                icon={<FontAwesomeIcon icon={faMoon} />}
                onClick={toggleTheme}
              >
                Switch to Light Mode
              </Item>
            )}
            <Item key="home" icon={<AppstoreOutlined />} className="float-left">
              <Link to="/">Home</Link>
            </Item>

            <Item key="shop" icon={<ShoppingOutlined />}>
              <Link to="/shop">Shop</Link>
            </Item>
            <Item key="cart" icon={<ShoppingCartOutlined />}>
              <Link to="/cart">
                <Badge count={cart.length} offset={[9, 0]}>
                  Cart
                </Badge>
              </Link>
            </Item>

            {!user && (
              <Item
                key="register"
                icon={<UserAddOutlined />}
                className="float-right"
              >
                <Link to="/register">Register</Link>
              </Item>
            )}
            {!user && (
              <Item key="login" icon={<UserOutlined />} className="float-end">
                <Link to="/login">Login</Link>
              </Item>
            )}
          </>
        )}

        <span
          style={{ width: "500px" }}
          className="hideOnMobile float-right p-1"
        >
          <Search />
        </span>
      </Menu>
    </>
  );
};

export default HeaderMenu;
