import React from "react";
import millify from "millify";
import { Row, Col, Typography, Avatar } from "antd";

import { useGetExchangesQuery } from "../services/cryptoApi";
import Loader from "./Loader";

const { Text, Title } = Typography;

const Exchanges = () => {
  const { data, isFetching } = useGetExchangesQuery();
  const exchangesList = data?.data?.exchanges;

  console.log(exchangesList);

  if (isFetching) return <Loader />;

  return (
    <>
      <Row>
        <Col span={6}>
          <Title level={4}>Exchanges</Title>
        </Col>
        <Col span={6}>
          <Title level={4}>24h Trade Volume</Title>
        </Col>
        <Col span={6}>
          <Title level={4}>Markets</Title>
        </Col>
        <Col span={6}>
          <Title level={4}>Price</Title>
        </Col>
      </Row>

      {exchangesList.map((exchange) => (
        <Row
          key={exchange.uuid}
          style={{
            paddingTop: "10px",
            paddingBottom: "10px",
            borderTop: "1px solid gray",
          }}
        >
          <Col span={6}>
            <Text>
              <strong>{exchange.rank}.</strong>
            </Text>
            <Avatar className="exchange-image" src={exchange.iconUrl} />
            <Text>
              <strong>{exchange.name}</strong>
            </Text>
          </Col>
          <Col span={6}>${millify(exchange["24hVolume"])}</Col>
          <Col span={6}>{millify(exchange.numberOfMarkets)}</Col>
          <Col span={6}>${millify(exchange.price)}</Col>
        </Row>
      ))}
    </>
  );
};

export default Exchanges;
