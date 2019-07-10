import React from "react";
import { Image, ListGroup, Row, Col } from "react-bootstrap";
import { formatDate } from "../../constant";

const FlexListGroupItem = ({
  title,
  url,
  urlToImage,
  publishedAt,
  description
}) => {
  const date = formatDate(publishedAt);

  return (
    <ListGroup.Item className="list-group-item list-group-item-action align-items-start news-item">
      <Row className="news-row">
        <Col md={4} className="news-image-col">
          <Image src={urlToImage} style={{ height: "100%", width: "100%" }} />
        </Col>
        <Col md={8} className="news-detail-col">
          <div className="d-flex w-100 justify-content-between">
            <a href={url}>
              <h5 className="mb-1" style={{ fontSize: "10pt" }}>
                {title}
              </h5>
            </a>
            <small style={{ fontSize: "8px" }}>{date}</small>
          </div>
          <p className="mb-1" style={{ fontSize: "8pt" }}>
           {description}
          </p>
        </Col>
      </Row>
    </ListGroup.Item>
  );
};

export default FlexListGroupItem;
