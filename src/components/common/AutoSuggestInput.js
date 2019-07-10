import React from "react";
import Autosuggest from "react-autosuggest";
import { setCurrentStockSearched } from "../../actions/stockAction";
import { connect } from "react-redux";
import { throttle } from "throttle-debounce";

class AutoSuggestInput extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      value: "",
      suggestions: []
    };
    this.onSuggestionsFetchRequestedThrottled = throttle(5000, this.onSuggestionsFetchRequested);
  }

  componentDidUpdate() {
    this.setState({ suggestions: this.props.suggestions });
  }

  getSuggestionValue = suggestion => {
    return `${suggestion["1. symbol"]} : ${suggestion["2. name"]}`;
  };

  onChange = (event, { newValue, method }) => {
    this.setState({
      value: newValue
    });
    if (method === "click") {
      this.props.setCurrentStockSearched(newValue);
    } else if (method === "enter") {
      event.preventDefault();
    }
  };

  onSuggestionsFetchRequested = ({ value }) => {
       this.props.handleFetch({ searchStocks: value });
  };

  onSuggestionsClearRequested = () => {
    this.setState({
      suggestions: []
    });
  };

  renderSuggestion = suggestion => {
    return <span>{suggestion["2. name"]}</span>;
  };

  render() {
    let { placeholder } = this.props;
    const { value, suggestions } = this.state;
    const inputProps = {
      value,
      placeholder: placeholder,
      onChange: this.onChange
    };
    return (
      <Autosuggest
        suggestions={suggestions ? suggestions : []}
        onSuggestionsFetchRequested={this.onSuggestionsFetchRequestedThrottled}
        onSuggestionsClearRequested={this.onSuggestionsClearRequested}
        getSuggestionValue={this.getSuggestionValue}
        renderSuggestion={this.renderSuggestion}
        inputProps={inputProps}
      />
    );
  }
}

export default connect(
  null,
  { setCurrentStockSearched }
)(AutoSuggestInput);
