import React from "react";
import { connect } from "react-redux";
import { Container, Row, Col, ListGroup } from "react-bootstrap";
import { getWatchlist } from "../../actions/watchlistAction";
import StockChartWidget from "../common/StockChartWidget";

class WatchList extends React.Component {
  constructor(props) {
    super(props);
    this.state = { currentSymbol: null, currentStockName: null };
  }
  componentDidMount() {
    this.props.getWatchlist();
  }

  getWatchlistItems = () => {
    const { watchlist } = this.props;
    if (watchlist) {
      return (
        <ListGroup>
          {watchlist.map((item, index) => {
            return (
              <ListGroup.Item
                key={index}
                onClick={() =>
                  this.setState({
                    currentSymbol: item.symbol,
                    currentStockName: item.stockName
                  })
                }
              >{`${item.symbol} : ${item.stockName}`}</ListGroup.Item>
            );
          })}
        </ListGroup>
      );
    } else {
      return <div>Loading...</div>;
    }
  };

  render() {
    const { currentSymbol, currentStockName } = this.state;
    return (
      <Container style={{ height: "100%", width: "100%", padding: "2em" }}>
        <Row>
          <Col md lg={3}>
            {this.getWatchlistItems()}
          </Col>
          <Col md lg={9}>
            {currentSymbol ? (
              <StockChartWidget
              symbol={`${currentSymbol} : ${currentStockName}`}
              />
            ) : (
              <div>Click on the list to view charts</div>
            )}
          </Col>
        </Row>
      </Container>
    );
  }
}

const mapStateToProps = state => {
  return {
    watchlist: state.watchlist.watchlist
  };
};

export default connect(
  mapStateToProps,
  { getWatchlist }
)(WatchList);
