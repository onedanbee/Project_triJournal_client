import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import WrappedLogin from "./pages/Login";
import WrappedSignUp from "./pages/SignUp";
import FindIdPw from "./pages/FindIdPw";
import Page from "./pages/Page";

class App extends React.Component {
  state = { currentUser: "" };
  setCurrentUser = username => {
    this.setState({ currentUser: username });
  };
  render() {
    return (
      <Router>
        <Switch>
          <Route
            exact
            path="/"
            component={() => (
              <WrappedLogin
                currentUser={this.state.currentUser}
                setCurrentUser={this.setCurrentUser}
              />
            )}
          />
          <Route path="/signup" component={WrappedSignUp} />
          <Route
            path="/page"
            component={() => (
              <Page
                currentUser={this.state.currentUser}
                setLogout={this.setCurrentUser}
              />
            )}
          />
          <Route exact path="/find" component={FindIdPw} />
        </Switch>
      </Router>
    );
  }
}

export default App;
