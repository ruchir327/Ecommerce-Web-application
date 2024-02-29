import React, { useState, useEffect } from "react";
import { Menu, Modal } from "antd";
import { Link, useLocation } from "react-router-dom";
import ProfileUpdate from "../../pages/user/ProfileUpdate";
import {
  DashboardOutlined,
  ShoppingOutlined,
  AppstoreOutlined,
  TagOutlined,
  TagsOutlined,
  DollarOutlined,
  LockOutlined,
  MenuFoldOutlined,
} from "@ant-design/icons";

const { Item } = Menu;

const UserNav = () => {
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();
  const [current, setCurrent] = useState(location.pathname);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isPasswordActive, setIsPasswordActive] = useState(false);
  const [theme, setTheme] = useState("dark");
  // Function to handle theme retrieval and state update

  useEffect(() => {
    // Function to update theme state

    const updatedTheme = localStorage.getItem("theme");
    setTheme(updatedTheme);
    console.log("themes updated", theme);
  }, [theme,localStorage.getItem("theme")]);
  const showModal = () => {
    setIsModalVisible(true);
    setIsPasswordActive(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
    setIsPasswordActive(false); // Reset the state when modal is closed
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    setIsPasswordActive(false); // Reset the state when modal is closed
  };

  const toggleCollapsed = () => {
    setCollapsed(!collapsed);
  };

  return (
    <Menu
      mode="inline"
      theme="dark"
      selectedKeys={isPasswordActive ? ["password"] : [current]}
      style={{
        marginLeft: "-20px",
        height: location.pathname === "/user/wishlist" ? "867px" : "100%",
      }}
      inlineCollapsed={collapsed}
    >
      <Item
       className="#fff"
        key="fold"
        onClick={toggleCollapsed}
        icon={<MenuFoldOutlined />}
      />

      <Item
        onClick={() => setCurrent("/user/history")}
        key="/user/history"
        className="#fff"
        icon={<DashboardOutlined />}
      >
        <Link className="#fff" to="/user/history">
          History
        </Link>
      </Item>

      <Item key="password" icon={<LockOutlined />} onClick={showModal}>
        Password
      </Item>
      <Item
        onClick={() => setCurrent("/user/wishlist")}
        key="/user/wishlist"
        icon={<AppstoreOutlined />}
      >
        <Link to="/user/wishlist">Wishlist</Link>
      </Item>

      <Modal
        className={theme === "light" ? "modalWrapper" : ""}
        wrapClassName={theme === "light" ? "customModal" : ""} // This applies the class to the modal wrapper
        title={
          <span className={theme === "light" ? "modalTitle" : ""}>
            Password Update
          </span>
        }
        visible={isModalVisible}
        footer={null}
        onCancel={handleCancel}
      >
        <span>
          <ProfileUpdate handleCancel={handleCancel} onSubmit={handleOk} />{" "}
        </span>
      </Modal>
    </Menu>
  );
};

export default UserNav;
