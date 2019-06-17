import React, { Component } from "react";
import "./App.css";
import { Switch, Route } from "react-router-dom";
import LandingPage from "./components/LandingPage";



class App extends Component {
  render() {
    return (
      <div className="app-container">
        <Switch>
          <Route exact path="/" component={LandingPage} />
          <Route exact path="/nav" component={NavDashboard} />
          <Route exact path="/createuser" component={CreateUser} />
          <Route exact path="/dashboard" component={Dashboard} />
          <Route exact path="/dashboard/profile" component={ProfileSettings} />
          <Route exact path="/dashboard/profile/edit" component={UpdateUser} />
          <Route exact path="/dashboard/budget" component={BudgetTracker} />
          <Route exact path="/dashboard/budget/edit" component={UpdateBudget} />
          <Route exact path="/dashboard/creditcards" component={CreditCardComponent} />
          <Route exact path="/dashboard/creditcards/edit" component={UpdateCreditCard} />
        </Switch>
      </div>
    )
  }
}

export default App;
