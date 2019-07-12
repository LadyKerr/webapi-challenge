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

module.exports = router;
