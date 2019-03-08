const router = require("express").Router();

const dbHelper = require("../data/helpers/hobbitsModel");

router.get("/", (req, res) => {
  dbHelper
    .get()
    .then(res => res.status(200).json(res))
    .catch(err => res.status(500).json({ errorInfo: err.toString() }));
});

router.get("/:id", (req, res) => {
  const { id } = req.params;

  dbHelper
    .get(id)
    .then(res => {
      if (res) {
        res.status(200).json(res);
      } else {
        res.status(404).json({ errorInfo: "Hobbit not found." });
      }
    })
    .catch(err => res.status(500).json({ errorInfo: err.toString() }));
});

router.post("/", (req, res) => {
  const { name } = req.body;

  if (name) {
    dbHelper
      .insert({ name })
      .then(res => res.status(201).json(res))
      .catch(err => res.status(500).json({ errorInfo: err.toString() }));
  } else {
    res
      .status(400)
      .json({ errorInfo: "No name was supplied for the new hobbit." });
  }
});

router.delete("/:id", (req, res) => {
  const { id } = req.params;

  dbHelper
    .delete(id)
    .then(res => {
      if (res) {
        res.status(200).json(res);
      } else {
        res.status(404).json({ errorInfo: "Hobbit not found." });
      }
    })
    .catch(err => res.status(500).json({ errorInfo: err.toString() }));
});

module.exports = router;
