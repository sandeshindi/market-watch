import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import IndexCards from "../common/IndexCards";
import NewsWidget from "./NewsWidget";
import StockChartWidget from "../common/StockChartWidget";
import { indexes } from "../../constant";

class Home extends React.Component {
  renderIndexes = () => {
    let count = 0;
    return indexes.map(index => {
      return (
        <Col sm={2} key={count++}>
          <IndexCards index={index.index} isGlobal={index.isGlobal} />
        </Col>
      );
    });
  };

  render() {
    return (
      <React.Fragment>
        <Container
          style={{ width: "100%", paddingLeft: "0", paddingRight: "0" }}
        >
          <Row style={{ paddingTop: "1em" }}>{this.renderIndexes()}</Row>
        </Container>
        <div>
          <Row>
            <Col md lg="8" style={{ justifyContent: "center" }}>
            <StockChartWidget />
            </Col>
            <Col>
              <NewsWidget />
            </Col>
          </Row>
          <Row />
        </div>
      </React.Fragment>
      
    );
  }
}

export default Home;
