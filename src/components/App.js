import React from "react";
import { Router, Route, Switch } from "react-router-dom";
import history from "../history";
import Login from "../components/auth/Login";
import SignUp from "../components/auth/SignUp";
import Home from "../components/home/Home";
import WatchList from "../components/watchlist/WatchList";
import Header from "./layout/Header";
import "../Main.css";
import { ToastContainer, toast, Flip } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const App = () => {
  return (
    <Router history={history}>
      <ToastContainer
        autoClose={8000}
        enableMultiContainer
        position={toast.POSITION.TOP_CENTER}
        transition={Flip}
      />

      <Header />
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/login" exact component={Login} />
        <Route path="/signup" exact component={SignUp} />
        <Route path="/watchlist" exact component={WatchList} />
      </Switch>
    </Router>
  );
};

export default App;
