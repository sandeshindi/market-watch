import { indian, global } from "../api/moneycontrol";
import NewsApi from "../api/newsApi";
import { NEWSAPIKEY } from "../constant";
import alphaAPI from "../api/aplhavantageAPI";
import { ALPHAAPIKEY } from "../constant";
import {  csvParse } from "d3-dsv";
import { timeParse } from "d3-time-format";

export const getIndexData = (index, isGlobal) => async (dispatch, getState) => {
  let response = null;
  if (isGlobal === "false") {
    response = await indian.get(index);
  } else {
    response = await global.get(index);
  }

  if (response.status && response.status === 200) {
    dispatch({
      type: "FETCH_INDEX_SUCC",
      payload: response.data.data
    });
  } else {
    dispatch({
      type: "FETCH_INDEX_ERR",
      payload: response.message
    });
  }
};

export const getLatestHeadLines = () => async dispatch => {
  const response = await NewsApi.get("", {
    params: {
      apiKey: NEWSAPIKEY,
      country: "in",
      category: "business"
    }
  });
  if (response.status === 200) {
    dispatch({
      type: "FETCH_NEWS_SUCC",
      payload: response.data.articles
    });
  } else {
    dispatch({
      type: "FETCH_NEWS_ERR",
      payload: response.message
    });
  }
};

export const searchSymbol = value => async (dispatch, getState) => {
  let response = await alphaAPI.get("", {
    params: {
      apikey: ALPHAAPIKEY,
      function: "SYMBOL_SEARCH",
      keywords: value
    }
  });
  if (response.data.bestMatches) {
    dispatch({
      type: "SEARCH_SYMBOL",
      payload: response.data.bestMatches
    });
  } else {
    dispatch({
      type: "SEARCH_SYMBOL_ERR"
    });
  }
};

export const setCurrentStockSearched = symbol => {
  return {
    type: "CURRENT_SEARCH_SYMBOL",
    payload: symbol
  };
};

export const getStockTimeSeriesData = (symbol, type) => async dispatch => {
 
  let parameters = {
      apikey: ALPHAAPIKEY,
      function: type,
      symbol: symbol,
      datatype: "csv"
    
  };
 
  let response = await alphaAPI.get("", {
    params : parameters
  });
  if (response.status === 200) {
    console.log(response);
    if (!response.data.Note && !response.data["Error Message"]) {
      let data = response.data;
      data = await csvParse(data, parseData(parseDate));

    data = data.sort(sortByDateAscending);
      dispatch({
        type: "TIME_SERIES_DAILY",
        payload: data
      });
    } else {
      
        dispatch({
          type: "STOCK_API_ERROR",
          payload: response.data.Note ? response.data.Note : response.data["Error Message"]
        });
      
    }
  }
};

const parseDate = timeParse("%Y-%m-%d");
function parseData(parse) {
  return function(d) {
    d.date = parseDate(d.timestamp);
    d.open = +d.open;
    d.high = +d.high;
    d.low = +d.low;
    d.close = +d.close;
    d.volume = +d.volume;
    return d;
  };
}

function sortByDateAscending(a, b) {
  // Dates will be cast to numbers automagically:
  return a.date - b.date;
}

export const getQuotes = (symbol, type) => async (dispatch) => {
  let parameters = {
    apikey: ALPHAAPIKEY,
    function: type,
    symbol: symbol,
    datatype: "csv"
  
};

let response = await alphaAPI.get("", {
  params : parameters
});
if (response.status === 200) {
  console.log(response);
  if (!response.data.Note && !response.data["Error Message"]) {
    let data = response.data;
    data = await csvParse(data, parseData(parseDate));

  data = data.sort(sortByDateAscending);
    dispatch({
      type: "GET_QUOTES",
      payload: data
    });
  } else {
    
      dispatch({
        type: "STOCK_API_ERROR",
        payload: response.data.Note ? response.data.Note : response.data["Error Message"]
      });
    
  }
}
}
