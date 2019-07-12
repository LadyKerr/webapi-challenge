import React from "react";
import axios from "axios";
import "./App.css";

class App extends React.Component {
  state = {
    // actions: [],
    projects: []
  };

  //grab projects from DB
  componentDidMount() {
    axios
      .get("http://localhost:8000/api/projects")
      .then(res => {
        this.setState({ projects: res.data });
      })
      .catch(err => console.log(err));
  }

  render() {
    return (
      <div className="App">
        <h1>Hello from App!</h1>
      </div>
    );
  }
}

export default App;
