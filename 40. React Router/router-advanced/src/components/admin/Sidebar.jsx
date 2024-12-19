import { useState } from "react";
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  DashboardOutlined,
  ShoppingCartOutlined,
  LogoutOutlined,
} from "@ant-design/icons";
import { Layout, Menu, Button, Modal } from "antd";
import { NavLink, Outlet, useNavigate } from "react-router-dom";

const { Sider, Header, Content } = Layout;

const Sidebar = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const navigate = useNavigate();

  // Toggle sidebar collapse state
  const handleCollapse = () => {
    setCollapsed(!collapsed);
  };

  // Handle logout confirmation modal visibility
  const showLogoutModal = () => {
    setIsModalVisible(true);
  };

  const handleLogout = () => {
    localStorage.removeItem("adminAuth");
    navigate("/admin/login");
  };

  const handleCancel = () => {
    setIsModalVisible(false); // Close modal without logging out
  };

  // Define Menu items using the `items` prop
  const menuItems = [
    {
      key: "1",
      icon: <DashboardOutlined />,
      label: <NavLink to="/admin">Dashboard</NavLink>,
    },
    {
      key: "2",
      icon: <ShoppingCartOutlined />,
      label: <NavLink to="/admin/products">Products</NavLink>,
    },
    {
      key: "3",
      icon: <LogoutOutlined />,
      label: "Logout",
      onClick: showLogoutModal,
    },
  ];

  return (
    <Layout style={{ minHeight: "100vh" }}>
      {/* Sidebar */}
      <Sider
        trigger={null}
        collapsible
        collapsed={collapsed}
        style={{
          backgroundColor: "#1e1e2d",
          height: "100vh",
          position: "fixed",
          top: 0,
          left: 0,
        }}
      >
        <div
          className="demo-logo-vertical"
          style={{ color: "#fff", padding: "20px", textAlign: "center" }}
        >
          Admin Panel
        </div>
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={["1"]}
          style={{ backgroundColor: "#1e1e2d" }}
          items={menuItems} // Use items prop instead of children
        />
      </Sider>

      {/* Main Layout (Content area) */}
      <Layout
        style={{
          marginLeft: collapsed ? "80px" : "210px", // Adjust based on collapsed state
          transition: "margin-left 0.3s",
          minHeight: "100vh",
        }}
      >
        {/* Header with collapse button */}
        <Header
          style={{
            padding: 0,
            background: "#fff",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            paddingLeft: 10,
            position: "fixed",
            top: 0,
            width: "100%",
            zIndex: 1000,
          }}
        >
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={handleCollapse}
            style={{
              fontSize: "16px",
              width: 64,
              height: 64,
            }}
          />
        </Header>

        {/* Content area */}
        <Content
          style={{
            padding: 24,
            background: "#f0f2f5",
            borderRadius: "10px",
            minHeight: "calc(100vh - 64px)",
            transition: "margin-left 0.3s",
            marginTop: "64px",
          }}
        >
          {/* Page content will be rendered here */}
          <Outlet />
        </Content>
      </Layout>

      {/* Logout Confirmation Modal */}
      <Modal
        title="Confirm Logout"
        open={isModalVisible}
        onOk={handleLogout} // Confirm logout and proceed
        onCancel={handleCancel} // Close modal without logging out
        okText="Logout"
        cancelText="Cancel"
      >
        <p>Are you sure you want to log out?</p>
      </Modal>
    </Layout>
  );
};

export default Sidebar;
