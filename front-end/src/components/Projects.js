import React from "react";
import ProjectList from "./ProjectList";

class Projects extends React.Component {
  render() {
    return (
      <div>
        <h1>Hello from Projects</h1>
        {this.props.projectsData.map(project => (
          <ProjectList key={project.id} project={project} />
        ))}
      </div>
    );
  }
}

export default Projects;
