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

// router.post("/:id/actions", (req, res) => {
//   let newAction = req.body;
//   const { description, notes } = req.body;
//   newAction.project_id = id;

//   if (!description || !notes) {
//     res.status(400).json({
//       message: "Please provide a description and notes for the action"
//     });
//   } else {
//     Actions.insert(newAction)
//       .then(newAction => {
//         res.status(201).json(newAction);
//       })
//       .catch(err => {
//         res.status(500).json({
//           message: "There was an error adding this action to the database."
//         });
//       });
//   }
// });

module.exports = router;
