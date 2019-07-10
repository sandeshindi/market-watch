import {} from "./stockAction";

export const addToWatchList = (symbol, stockName) => (dispatch, getState, { getFirestore}) => {
    const firestore = getFirestore();
    const profile = getState().firebase.profile;
    firestore
        .collection("watchlist")
        .doc(`${profile.firstName}-${profile.lastName}-${symbol}`)
        .set({
          symbol : symbol,
          stockName: stockName,
          user : `${profile.firstName}-${profile.lastName}`
        });
    
    return true;
}

export const getWatchlist = () => async (dispatch, getState, {getFirestore}) => {
  const firestore = getFirestore();
  const profile = getState().firebase.profile;
  let watchlistRef = firestore.collection("watchlist");
  let quotes = [];
  watchlistRef.where("user", "==", `${profile.firstName}-${profile.lastName}`).get().then(function (querySnapshot) {
    querySnapshot.forEach((doc) => {
      const data = doc.data();
      quotes = [...quotes, data];
     });
     dispatch({
       type : "GET_WATCHLIST_SUCC",
       payload : quotes
     })
  });
  
}