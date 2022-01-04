import { useState } from "react";
import { Select, Typography, Row, Col, Avatar, Card } from "antd";
import moment from "moment";

import { useGetCryptoNewsQuery } from "../services/cryptoNewApi";
import { useGetCryptosQuery } from "../services/cryptoApi";
import Loader from "./Loader";

const { Text, Title } = Typography;
const { Option } = Select;

const demoImage =
  "https://www.bing.com/th?id=OVFT.mpzuVZnv8dwIMRfQGPbOPC&pid=News";

function News({ simplified }) {
  const count = simplified ? 6 : 12;
  const [newsCategory, setNewsCategory] = useState("Cryptocurrency");
  const { data: cryptoNews } = useGetCryptoNewsQuery({
    newsCategory,
    count,
  });
  const { data: cryptoList } = useGetCryptosQuery(50);

  if (!cryptoNews?.value) return <Loader />;

  return (
    <div>
      <Row gutter={[24, 24]}>
        <Col span={24}>
          <Select
            style={{ cursor: "pointer" }}
            showSearch
            className="select-news"
            placeholder="Select a crypto"
            optionFilterProp="children"
            onChange={(value) => setNewsCategory(value)}
            filterOption={(input, option) =>
              option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
            }
          >
            <Option value="Cryptocurrency">Cryptocurrency</Option>
            {cryptoList?.data?.coins.map((crypto, i) => (
              <Option value={crypto.name} key={i}>
                {crypto.name}
              </Option>
            ))}
          </Select>
        </Col>

        {cryptoNews.value.map((cryptoNew, i) => (
          <Col xs={24} sm={12} lg={8} key={i}>
            <Card hoverable className="news-card">
              <a href={cryptoNew.url} target="_blank" rel="noreferrer">
                <div className="news-image-container">
                  <Title className="news-title" level={4}>
                    {cryptoNew.name.length > 100
                      ? `${cryptoNew.name.substring(0, 100)} ...`
                      : cryptoNew.name}
                  </Title>
                  <img
                    src={cryptoNew?.image?.thumbnail?.contentUrl || demoImage}
                    alt=""
                    style={{ maxWidth: "80px", maxHeight: "80px" }}
                  />
                </div>
                <p>
                  {cryptoNew.description.length > 100
                    ? `${cryptoNew.description.substring(0, 100)}...`
                    : cryptoNew.description}
                </p>

                <div className="provider-container">
                  <div>
                    <Avatar
                      src={
                        cryptoNew.provider[0]?.image?.thumbnail?.contentUrl ||
                        demoImage
                      }
                      alt=""
                    />
                    <Text className="provider-name">
                      {cryptoNew.provider[0]?.name}
                    </Text>
                  </div>
                  <Text>
                    {moment(cryptoNew.datePublished).startOf("ss").fromNow()}
                  </Text>
                </div>
              </a>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
}

export default News;
