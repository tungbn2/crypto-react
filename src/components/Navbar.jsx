import React, { useState, useEffect } from "react";
import { Menu, Typography, Avatar, Button } from "antd";
import { Link } from "react-router-dom";
import {
  BulbOutlined,
  FundOutlined,
  HomeOutlined,
  MenuOutlined,
  MoneyCollectOutlined,
} from "@ant-design/icons";
import icon from "../images/cryptocurrency.png";

export default function Navbar() {
  const [activeMenu, setActiveMenu] = useState(true);
  const [screenSize, setScreenSize] = useState(null);

  useEffect(() => {
    const handleResize = () => setScreenSize(window.innerWidth);

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (screenSize <= 800) {
      setActiveMenu(false);
    } else {
      setActiveMenu(true);
    }
  }, [screenSize]);

  return (
    <div>
      <div className="nav-container">
        <div className="logo-container">
          <Avatar src={icon} siz="large" />
          <Typography.Title level={2} className="logo">
            <Link to="/">Crypto</Link>
          </Typography.Title>
          <Button
            className="menu-control-container"
            onClick={() => setActiveMenu(!activeMenu)}
          >
            <MenuOutlined />
          </Button>
        </div>

        {activeMenu && (
          <Menu theme="dark">
            <Menu.Item icon={<HomeOutlined />} key="Home">
              <Link to={"/"}>Home</Link>
            </Menu.Item>

            <Menu.Item icon={<FundOutlined />} key="cryptocurrency">
              <Link to={"/cryptocurrency"}>Crypto currency</Link>
            </Menu.Item>

            <Menu.Item icon={<MoneyCollectOutlined />} key="exchanges">
              <Link to={"/exchanges"}>Exchanges</Link>
            </Menu.Item>

            <Menu.Item icon={<BulbOutlined />} key="news">
              <Link to={"/news"}>News</Link>
            </Menu.Item>
          </Menu>
        )}
      </div>
    </div>
  );
}
