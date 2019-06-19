import React, { Component } from "react";
import "./App.css";
import { Switch, Route } from "react-router-dom";
import LandingPage from "./components/LandingPage";
import NavDashboard from "./components/NavDashboard";
import Dashboard from "./components/Dashboard";
import ProfileSettings from "./components/ProfileSettings";
import BudgetTracker from "./components/BudgetTracker";
import MyTransactions from "./components/MyTransactions";
import UpdateUser from "./components/UpdateUser";



class App extends Component {
render() {
    return (
      <div className="App-container">
        <Switch>
          <Route exact path="/" component={LandingPage} />
          <Route exact path="/nav_dashboard" component={NavDashboard} />
          {/* <Route exact path="/createuser" component={CreateUser} /> */}
          <Route exact path="/dashboard/:id" component={Dashboard} />
          <Route exact path="/dashboard/:id/profile" component={ProfileSettings} />
          <Route exact path="/dashboard/:id/profile/edit" component={UpdateUser} />


          <Route exact path="/dashboard/:id/budget" component={BudgetTracker} />
          {/* <Route exact path="/dashboard/budget/edit" component={UpdateBudget} /> */}
          <Route exact path="/dashboard/:id/transactions" component={MyTransactions} />

          {/* <Route exact path="/dashboard/creditcards/edit" component={UpdateCreditCard} /> */}
        </Switch>
      </div>
    )
  }
}


export default App;
