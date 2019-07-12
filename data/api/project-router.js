const express = require("express");

const Actions = require("../helpers/actionModel");
const Projects = require("../helpers/projectModel");

const router = express.Router();

//display projects
router.get("/", (req, res) => {
  Projects.get()
    .then(project => {
      res.status(200).json(project);
    })
    .catch(err => {
      res.status(500).json({
        error: "There was an error retrieving projects from the database."
      });
    });
});

//display Projects by id
router.get("/:id", (req, res) => {
  const { id } = req.params;

  Projects.get(id)
    .then(project => {
      if (project) {
        res.status(200).json(project);
      } else {
        res
          .status(404)
          .json({ error: "The project with that ID does not exist." });
      }
    })
    .catch(err => {
      res.status(500).json({
        message:
          "There was an error retrieving projects from the database. Please try again."
      });
    });
});

//get project actions
router.get("/:id/actions", (req, res) => {
  const { id } = req.params;

  Projects.getProjectActions(id)
    .then(projectAction => {
      if (projectAction && projectAction.length) {
        res.status(200).json(projectAction);
      } else {
        res
          .status(404)
          .json({ message: "The project with that ID does not exist." });
      }
    })
    .catch(err => {
      res.status(500).json({
        error: "There was an error getting the requested project actions."
      });
    });
});

//delete projects
router.delete("/:id", (req, res) => {
  const { id } = req.params;

  Projects.remove(id)
    .then(deleted => {
      if (deleted) {
        res.status(200).json(deleted);
      } else {
        res.status(404).json({
          message: "The project with that ID is not in the database."
        });
      }
    })
    .catch(err => {
      res.status(500).json({ error: "The project could not be deleted." });
    });
});

//add new project
router.post("/", (req, res) => {
  const { name, description } = req.body;

  if (!name || !description) {
    res.status(400).json({
      errorMessage: "Please provide a name and description for the project."
    });
  } else {
    Projects.insert(req.body)
      .then(newProject => {
        res.status(200).json(newProject);
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: "The project could not be added. Please try again" });
      });
  }
});

//add new action to the specified project
router.post("/:id/actions", (req, res) => {
  let newAction = req.body;
  const { description, notes } = req.body;
  const { id } = req.params;
  newAction.project_id = id;

  if (!description || !notes) {
    res.status(400).json({
      message: "Please provide a description and notes for the action"
    });
  } else {
    Actions.insert(newAction)
      .then(newAction => {
        res.status(201).json(newAction);
      })
      .catch(err => {
        res.status(500).json({
          message: "There was an error adding this action to the database."
        });
      });
  }
});

//update project
router.put("/:id", (req, res) => {
  const { id } = req.params;
  const changes = req.body;
  const { description, name } = req.body;

  Projects.update(id, changes)
    .then(updated => {
      if (!updated) {
        res
          .status(404)
          .json({ message: "The project with that ID does not exist." });
      } else if (!description || !name) {
        res.status(400).json({
          errorMessage: "Please provide description and name for the project."
        });
      } else {
        res.status(200).json(updated);
      }
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ error: "The project could not be modified." });
    });
});

module.exports = router;
