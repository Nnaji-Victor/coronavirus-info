import Loading from "components/Loading";
import Navbar from "components/Navbar";
import CountryDetails from "Pages/CountryDetails";
import HomePage from "Pages/HomePage";
import NotFoundScreen from "Pages/NotFoundScreen";
import React from "react";
import { Switch, Route } from "react-router-dom";

function App() {
  return (
    <div className="app">
      <React.Suspense fallback={<Loading />}>
        <Navbar />
        <Switch>
          <Route exact path="/">
            <HomePage />
          </Route>
          <Route path="/country/:countryId">
            <CountryDetails />
          </Route>
          <Route exact path="*">
            <NotFoundScreen />
          </Route>
        </Switch>
      </React.Suspense>
    </div>
  );
}

export default App;
