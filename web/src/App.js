import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Dashboard } from "./pages/Dashboard";
import { Login } from "./pages/Login";
import Cookies from "js-cookie";
import React from "react";

const userInLoggedIn = () => {
  const token = Cookies.get("_t");
  return token && token.length;
};
function App() {
  React.useEffect(() => {
    const initialCall = () => {
      if (userInLoggedIn() && !window.location.pathname.includes("/dashboard")) {
        window.location.href = "/dashboard";
      }
      if (!userInLoggedIn() && !window.location.pathname.includes("/login")) {
        window.location.href = "/login";
      }
    };
    initialCall();
  }, []);
  return (
    <div>
      <Router>
        <Switch>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/dashboard">
            <Dashboard />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
