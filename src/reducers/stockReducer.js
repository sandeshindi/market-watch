import _ from "lodash";

const initialState = {
  error: null
};

const stockReducer = (state = initialState, action) => {
  switch (action.type) {
    case "FETCH_INDEX_SUCC":
      return {
        ...state,
        [action.payload.symbol]: _.pick(action.payload, [
          "company",
          "pricecurrent",
          "CHANGE",
          "PERCCHANGE"
        ])
      };
    case "FETCH_INDEX_ERR":
      return { ...state, error: action.payload };
    case "FETCH_NEWS_SUCC":
      return { ...state, news : action.payload };
    case "FETCH_NEWS_ERR":
      return { ...state, error: action.payload };
    case "SEARCH_SYMBOL": 
      return {...state, searchResult : action.payload};
    case "SEARCH_SYMBOL_ERR" :
      return { ...state, error: action.payload };
    case "CURRENT_SEARCH_SYMBOL": 
      return { ...state, currentSearchedSymbol : action.payload};
    case "TIME_SERIES_DAILY" : 
      return { ...state, timeseries: action.payload, stockAPIErr : null}
    case "STOCK_API_ERROR" : 
      return { ...state, stockAPIErr : action.payload, timeseries: null}
    default:
      return state;
  }
};

export default stockReducer;
