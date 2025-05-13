import { Layout, Menu } from "antd";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import "antd/dist/reset.css";

const { Header, Content, Footer } = Layout;

function App() {
  const [message, setMessage] = useState("");

  useEffect(() => {
    axios
      .get("http://localhost:8888/api/message", {
        withCredentials: true, 
      })
      .then((res) => {
        setMessage(res.data.message);
      })
      .catch((err) => {
        console.error("Lỗi khi gọi API:", err);
      });
  }, []);

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Header>
        <div className="logo" />
        <Menu
          theme="dark"
          mode="horizontal"
          defaultSelectedKeys={["home"]}
          items={[
            { key: "home", label: <Link to="/">Home</Link> },
            { key: "about", label: <Link to="/about">About</Link> },
            { key: "contact", label: <Link to="/contact">Contact</Link> },
          ]}
        />
      </Header>

      <Content style={{ padding: "20px" }}>
        <div
          style={{
            background: "#fff",
            padding: 24,
            minHeight: 360,
          }}
        >
          <h2>Thông điệp từ Backend:</h2>
          <p>{message || "Đang tải..."}</p>
        </div>
      </Content>

      <Footer style={{ textAlign: "center" }}>
        ©2025 Created by You
      </Footer>
    </Layout>
  );
}

export default App;
