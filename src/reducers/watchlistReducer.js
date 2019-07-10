const initialState = {
    error: null
  };

const watchlistReducer = (state = initialState, action) => {
    switch(action.type) {
        case "ADDED_TO_WATCHLIST" :
            return {...state, addedToWatchlist : true}
        case "GET_WATCHLIST_SUCC" : 
            return {...state, watchlist : action.payload}
        default:
            return state;
    }
}

export default watchlistReducer;

