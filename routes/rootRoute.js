module.exports = require("express")
  .Router()
  .get("/", (req, res) => {
    res.status(200).json({
      app: "Hobbits API"
    });
  });
