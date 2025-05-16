import { useState } from "react";
import { Layout, Menu, Avatar, Dropdown, Typography, theme } from "antd";
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UserOutlined,
  LogoutOutlined,
  DashboardOutlined,
  BookOutlined,
  ShoppingCartOutlined,
  SettingOutlined,
  TeamOutlined,
  TagsOutlined,
  PercentageOutlined,
  AppstoreOutlined,
} from "@ant-design/icons";
import { Link, Outlet, useNavigate } from "react-router-dom";

const { Header, Sider, Content, Footer } = Layout;
const { Title } = Typography;

const AdminLayout = () => {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/login");
  };

  const userMenu = (
    <Menu>
      <Menu.Item key="logout" icon={<LogoutOutlined />} onClick={handleLogout}>
        Đăng xuất
      </Menu.Item>
    </Menu>
  );

  return (
    <Layout style={{ minHeight: "100vh" }}> {/* Đảm bảo layout full chiều cao */}
      <Sider collapsible collapsed={collapsed} onCollapse={setCollapsed}>
        <div style={{ padding: 16, color: "#fff", textAlign: "center" }}>
          <Title level={4} style={{ color: "#fff", margin: 0 }}>
            {collapsed ? "AD" : "Admin Panel"}
          </Title>
        </div>
        <Menu theme="dark" mode="inline" defaultSelectedKeys={["dashboard"]}>
          <Menu.Item key="dashboard" icon={<DashboardOutlined />}>
            <Link to="/admin/">Dashboard</Link>
          </Menu.Item>
          <Menu.Item key="books" icon={<BookOutlined />}>
            <Link to="/admin/books">Quản lý Sách</Link>
          </Menu.Item>
          <Menu.Item key="orders" icon={<ShoppingCartOutlined />}>
            <Link to="/admin/orders">Quản lý Đơn hàng</Link>
          </Menu.Item>
          <Menu.Item key="users" icon={<TeamOutlined />}>
            <Link to="/admin/users">Quản lý Người dùng</Link>
          </Menu.Item>
          <Menu.Item key="categories" icon={<AppstoreOutlined />}>
            <Link to="/admin/categories">Quản lý Danh mục</Link>
          </Menu.Item>
          <Menu.Item key="authors" icon={<UserOutlined />}>
            <Link to="/admin/authors">Quản lý Tác giả</Link>
          </Menu.Item>
          <Menu.Item key="discounts" icon={<PercentageOutlined />}>
            <Link to="/admin/discounts">Quản lý Giảm giá</Link>
          </Menu.Item>
          <Menu.Item key="roles" icon={<TagsOutlined />}>
            <Link to="/admin/roles">Quản lý Quyền</Link>
          </Menu.Item>
          <Menu.Item key="settings" icon={<SettingOutlined />}>
            <Link to="#">Cài đặt</Link>
          </Menu.Item>
        </Menu>
      </Sider>
      <Layout>
        <Header
          style={{
            padding: "0 24px",
            background: colorBgContainer,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          {collapsed ? (
            <MenuUnfoldOutlined onClick={() => setCollapsed(false)} />
          ) : (
            <MenuFoldOutlined onClick={() => setCollapsed(true)} />
          )}
          <Dropdown overlay={userMenu}>
            <Avatar icon={<UserOutlined />} style={{ cursor: "pointer" }} />
          </Dropdown>
        </Header>
        <Content style={{ margin: "16px" }}>
          <div
            style={{
              padding: 24,
              minHeight: 360,
              background: colorBgContainer,
              borderRadius: 8,
            }}
          >
            <Outlet />
          </div>
        </Content>
        <Footer style={{ textAlign: "center" }}>
          Admin Dashboard ©{new Date().getFullYear()}
        </Footer>
      </Layout>
    </Layout>
  );
};

export default AdminLayout;
