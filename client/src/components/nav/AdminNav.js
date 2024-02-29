import React, { useState, useEffect } from "react";
import { Menu } from "antd";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { Modal } from "antd";
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

const AdminNav = ({ products }) => {
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();
  const [current, setCurrent] = useState(location.pathname);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isPasswordActive, setIsPasswordActive] = useState(false);
  const [handleSubmit, setHandleSubmit] = useState(() => () => {});
  const [theme, setTheme] = useState("light");
  // Function to handle theme retrieval and state update

  useEffect(() => {
    // Function to update theme state
    console.log("products", products);
    const updatedTheme = localStorage.getItem("theme");
    setTheme(updatedTheme);
    console.log("themes updated", theme);
  }, [localStorage.getItem("theme")]);

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
        height:
          location.pathname === "/admin/dashboard" ||
          location.pathname === "/shop" ||
          location.pathname === "/admin/product"
            ? "102%"
            : "226%",
      }}
      inlineCollapsed={collapsed}
    >
      <Item key="fold" onClick={toggleCollapsed} icon={<MenuFoldOutlined />} />
      <Item
        onClick={() => setCurrent("/admin/dashboard")}
        key="/admin/dashboard"
        icon={<DashboardOutlined />}
      >
        <Link to="/admin/dashboard">Dashboard</Link>
      </Item>
      <Item
        onClick={() => setCurrent("/admin/product")}
        key="/admin/product"
        icon={<ShoppingOutlined />}
      >
        <Link to="/admin/product">Product</Link>
      </Item>
      <Item
        onClick={() => setCurrent("/admin/products")}
        key="/admin/products"
        icon={<AppstoreOutlined />}
      >
        <Link to="/admin/products">Products</Link>
      </Item>
      <Item
        onClick={() => setCurrent("/admin/category")}
        key="/admin/category"
        icon={<TagOutlined />}
      >
        <Link to="/admin/category">Category</Link>
      </Item>
      <Item
        onClick={() => setCurrent("/admin/sub")}
        key="/admin/sub"
        icon={<TagsOutlined />}
      >
        <Link to="/admin/sub">Sub Category</Link>
      </Item>
      <Item
        onClick={() => setCurrent("/admin/coupon")}
        key="/admin/coupon"
        icon={<DollarOutlined />}
      >
        <Link to="/admin/coupon">Coupon</Link>
      </Item>
      <Item key="password" icon={<LockOutlined />} onClick={showModal}>
        Password
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

export default AdminNav;
