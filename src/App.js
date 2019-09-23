import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Graph from "./components/Graph";
import TopNav from "./components/TopNav";
import About from "./components/About";
import Contact from "./components/Contact";
import "./App.css";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <TopNav />
        <div>
          <Switch>
            <Route exact path="/" component={Graph} />
            <Route exact path="/about" component={About} />
            <Route exact path="/contact" component={Contact} />
          </Switch>
        </div>
      </BrowserRouter>
    </div>
  );
}
export default App;
