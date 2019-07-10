import React from "react";
import { Card, ButtonGroup, Button } from "react-bootstrap";
import { connect } from "react-redux";
import { getStockTimeSeriesData } from "../../actions/stockAction";
import Chart from "./Chart";
import { TypeChooser } from "react-stockcharts/lib/helper";
import { addToWatchList } from "../../actions/watchlistAction";
import { toast } from "react-toastify";

class StockChartWidget extends React.Component {
  constructor(props) {
    super(props);
    this.state = { currentSymbol: null, currentStockName: null };
  }

  componentDidMount() {
    console.log("component did mount");
    console.log(this.props);
    let symbolString = this.props.currentSymbol;
    symbolString = this.props.symbol ? this.props.symbol : symbolString;
    symbolString = symbolString ? symbolString : "MSFT : Microsoft Corporation";

    const symbol = symbolString.substring(0, symbolString.indexOf(":"));
    if (this.state.currentSymbol !== symbol.trim()) {
      const stockString = symbolString.substring(symbolString.indexOf(":") + 1);
      this.setState({
        currentSymbol: symbol.trim(),
        currentStockName: stockString.trim()
      });
      this.props.getStockTimeSeriesData(symbol.trim(), "TIME_SERIES_DAILY");
    }
  }

  componentDidUpdate() {
    console.log("componentDidUpdate:");
    console.log(this.props);
    let symbolString = this.props.currentSymbol;
    symbolString = this.props.symbol ? this.props.symbol : symbolString;
    symbolString = symbolString ? symbolString : "MSFT : Microsoft Corporation";

    const symbol = symbolString.substring(0, symbolString.indexOf(":"));
    if (this.state.currentSymbol !== symbol.trim()) {
      const stockString = symbolString.substring(symbolString.indexOf(":") + 1);
      this.setState({
        currentSymbol: symbol.trim(),
        currentStockName: stockString.trim()
      });
      this.props.getStockTimeSeriesData(symbol.trim(), "TIME_SERIES_DAILY");
    }
  }

  addToWatchList = (symbol, stockName) => {
    const added = this.props.addToWatchList(symbol, stockName);
    if (added) {
      toast(`${this.state.currentStockName} added to watchlist`);
    }
  };

  render() {
    const { currentSymbol, currentStockName } = this.state;
    const { auth } = this.props;
    return (
      <div className="charts-widget">
        <Card bg="light" className="charts-widget-card">
          <Card.Header className="chart-widget-header" as="h5">
            {currentStockName}
            <div className="float-right">
              <ButtonGroup className="mr-2" aria-label="First group">
                <Button
                  variant="danger active"
                  onClick={() =>
                    this.props.getStockTimeSeriesData(
                      currentSymbol,
                      "TIME_SERIES_DAILY"
                    )
                  }
                >
                  Daily
                </Button>
                <Button
                  variant="warning"
                  onClick={() =>
                    this.props.getStockTimeSeriesData(
                      currentSymbol,
                      "TIME_SERIES_WEEKLY"
                    )
                  }
                >
                  Weekly
                </Button>
                <Button
                  variant="primary"
                  onClick={() =>
                    this.props.getStockTimeSeriesData(
                      currentSymbol,
                      "TIME_SERIES_MONTHLY"
                    )
                  }
                >
                  Monthly
                </Button>
              </ButtonGroup>
              {auth.uid && !this.props.symbol ? (
                <Button
                  variant="secondary"
                  onClick={() => this.addToWatchList(currentSymbol,currentStockName)}
                >
                  Add to Watchlist
                </Button>
              ) : (
                ""
              )}
            </div>
          </Card.Header>
          <Card.Body className="charts-card-body">
            {this.props.stockAPIErr ? (
              this.props.stockAPIErr
            ) : this.props.timeseries ? (
              <TypeChooser>
                {type => <Chart type={type} data={this.props.timeseries} />}
              </TypeChooser>
            ) : (
              "Loading..."
            )}
          </Card.Body>
        </Card>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    currentSymbol: state.stock.currentSearchedSymbol,
    timeseries: state.stock.timeseries,
    stockAPIErr: state.stock.stockAPIErr,
    auth: state.firebase.auth
  };
};

export default connect(
  mapStateToProps,
  { getStockTimeSeriesData, addToWatchList }
)(StockChartWidget);
