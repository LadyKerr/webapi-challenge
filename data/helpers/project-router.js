const express = require("express");

const Actions = require("./actionModel");
const Projects = require("./projectModel");

const router = express.Router();

//display actions
router.get("/", (req, res) => {
  Projects.get()
    .then(project => {
      res.status(200).json(project);
    })
    .catch(err => {
      res.status(500).json({
        message:
          "There was an error retrieving projects from the database. Please try again."
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

module.exports = router;
