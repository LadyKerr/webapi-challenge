import React from "react";
import axios from "axios";
import Projects from "./components/Projects";
// import { Route } from "react-router-dom";
import "./App.css";

class App extends React.Component {
  state = {
    // actions: [],
    projects: []
  };

  //grab projects from DB
  componentDidMount() {
    axios
      .get("https://kerr-webapichallenge.herokuapp.com/api/projects")
      .then(res => {
        console.log(res)
        this.setState({ projects: res.data });
      })
      .catch(err => console.log(err));
  }

  render() {
    return (
      <div className="App">
        <h1>Hello from App!</h1>
        <Projects projectsData={this.state.projects} />
      </div>
    );
  }
}

export default App;
