import React from "react";
import millify from "millify";
import { Typography, Row, Col, Statistic } from "antd";
import { Link } from "react-router-dom";

import { useGetCryptosQuery } from "../services/cryptoApi";
import { Cryptocurrency, News } from ".";
import Loader from "./Loader";

const { Title } = Typography;

function Homepage() {
  const { data, isFetching } = useGetCryptosQuery(10);

  const gloabalStats = data?.data?.stats;

  if (isFetching) return <Loader />;

  return (
    <div>
      <Title level={2} className="heading">
        Global Crypto Stats
      </Title>
      <Row>
        <Col span={12}>
          <Statistic title="Total CrytoCurrencies" value={gloabalStats.total} />
        </Col>

        <Col span={12}>
          <Statistic
            title="Total Exchanges"
            value={millify(gloabalStats.totalExchanges)}
          />
        </Col>

        <Col span={12}>
          <Statistic
            title="Total Market Cap"
            value={millify(gloabalStats.totalMarketCap)}
          />
        </Col>

        <Col span={12}>
          <Statistic
            title="Total 24h  Volume"
            value={millify(gloabalStats.total24hVolume)}
          />
        </Col>

        <Col span={12}>
          <Statistic
            title="Total Market"
            value={millify(gloabalStats.totalMarkets)}
          />
        </Col>
      </Row>

      <div className="home-heading-container">
        <Title level={2} className="home-title">
          Top 10 CrytoCurrencies in the world
        </Title>
        <Title level={3} className="show-more">
          <Link to="/cryptocurrency">Show more ...</Link>
        </Title>
      </div>
      <Cryptocurrency simplified />

      <div className="home-heading-container">
        <Title level={2} className="home-title">
          Latest Cryto News
        </Title>
        <Title level={3} className="show-more">
          <Link to="/news">Show more ...</Link>
        </Title>
      </div>
      <News simplified />
    </div>
  );
}

export default Homepage;
