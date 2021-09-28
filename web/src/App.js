import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Details } from "./pages/Details";
import { Login } from "./pages/Login";
function App() {
  return (
    <div>
      <Router>
        <Switch>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/details">
            <Details />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
