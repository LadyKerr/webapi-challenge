const express = require("express");

const Actions = require("./actionModel");
const Projects = require("./projectModel");

const router = express.Router();

//display actions
router.get("/", (req, res) => {
  Actions.get()
    .then(action => {
      res.status(200).json(action);
    })
    .catch(err => {
      res.status(500).json({
        message:
          "There was an error retrieving actions from the database. Please try again."
      });
    });
});

//display actions by id
router.get("/:id", (req, res) => {
  const { id } = req.params;

  Actions.get(id)
    .then(action => {
      if (action) {
        res.status(200).json(action);
      } else {
        res
          .status(404)
          .json({ error: "The action with that ID does not exist." });
      }
    })
    .catch(err => {
      res.status(500).json({
        message:
          "There was an error retrieving actions from the database. Please try again."
      });
    });
});

//updated actions
router.put("/:id", (req, res) => {
  const { id } = req.params;
  const changes = req.body;
  const { description, notes } = req.body;

  Actions.update(id, changes)
    .then(updated => {
      if (!updated) {
        res
          .status(404)
          .json({ message: "The action with that ID does not exist." });
      } else if (!description || !notes) {
        res.status(400).json({
          errorMessage: "Please provide description and notes for the action."
        });
      } else {
        res.status(200).json(updated);
      }
    })
    .catch(err => {
      res.status(500).json({ error: "The action could not be modified." });
    });
});

//delete actions
router.delete("/:id", (req, res) => {
  const { id } = req.params;

  Actions.remove(id)
    .then(deleted => {
      if (deleted) {
        res.status(200).json(deleted);
      } else {
        res
          .status(404)
          .json({ message: "The action with that ID is not in the database." });
      }
    })
    .catch(err => {
      res.status(500).json({ error: "The action could not be deleted." });
    });
});

module.exports = router;
