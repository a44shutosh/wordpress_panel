import React from "react";
import ReactDOM from "react-dom";
import { HashRouter, Route, Switch, Redirect } from "react-router-dom";
import { Provider } from "react-redux";

// Styles
// Import Flag Icons Set
import "flag-icon-css/css/flag-icon.min.css";
// Import Font Awesome Icons Set
import "font-awesome/css/font-awesome.min.css";
// Import Simple Line Icons Set
import "simple-line-icons/css/simple-line-icons.css";
// Import Main styles for this application
import "../scss/style.scss";
// Temp fix for reactstrap
import "../scss/core/_dropdown-menu-right.scss";

import "../scss/customStyle.css";

// Containers
import Dashboard from "./containers/Dashboard/DashboardContainer";
import ViewPost from "./containers/Dashboard/ViewPostContainer";
import Page404 from "./views/Pages/Page404/";
import Page500 from "./views/Pages/Page500/";

import configureStore from "./store/configureStore";
import { PersistGate } from "redux-persist/es/integration/react";

const { persistor, store } = configureStore();
const LoadingStoreFromLocalStorage = () => {
  return <div>Please wait...</div>;
};

ReactDOM.render(
  <Provider store={store}>
    <PersistGate
      persistor={persistor}
      loading={<LoadingStoreFromLocalStorage />}
    >
      <HashRouter>
        <Switch>
          <Route exact path="/dashboard" name="dashboard" component={Dashboard} />
          <Route exact path="/404" name="Page 404" component={Page404} />
          <Route exact path="/500" name="Page 500" component={Page500} />
          <Route exact path="/viewpost" name="viewPost" component={ViewPost} />
          <Redirect from="/" to="/dashboard" />
        </Switch>
      </HashRouter>
    </PersistGate>
  </Provider>,
  document.getElementById("root")
);
