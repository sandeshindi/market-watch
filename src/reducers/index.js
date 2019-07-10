import { combineReducers } from "redux";
import { firebaseReducer } from "react-redux-firebase";
import { firestoreReducer } from "redux-firestore";
import authReducer from "./authReducer";
import stockReducer from "./stockReducer";
import watchlistReducer from "./watchlistReducer";
import { reducer as formReducer } from "redux-form";

const rootReducer = combineReducers({
  form: formReducer,
  firebase: firebaseReducer,
  firestore: firestoreReducer,
  auth: authReducer,
  stock: stockReducer,
  watchlist : watchlistReducer
});

export default rootReducer;
