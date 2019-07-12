import React from "react";

class ProjectList extends React.Component {
  render() {
    return (
      <div>
        <h1> {this.props.project.name} </h1>
        <h4> {this.props.project.description} </h4>
        <p> {this.props.project.completed} </p>
      </div>
    );
  }
}

export default ProjectList;
