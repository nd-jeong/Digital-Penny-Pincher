import React, { Component } from "react";
import "./App.css";
import { Switch, Route } from "react-router-dom";


class App extends Component {
  render() {
    return (
      <div className="app-container">
        <Switch>
          <Route exact path="/" component={LandingPage} />
          <Route exact path="/createuser" component={CreateUser} />
          <Route exact path="/dashboard" component={Dashboard} />
          <Route exact path="/dashboard/profile" component={ProfileSettings} />
          <Route exact path="/dashboard/profile/edit" component={UpdateUser} />
          <Route exact path="/dashboard/budgetTracker" component={BudgetTracker} />
        </Switch>
      </div>
    )
  }
}

export default App;
