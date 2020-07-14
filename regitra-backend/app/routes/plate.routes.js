module.exports = app => {
    const plate = require("../controllers/plate.controller.js");
  
    var router = require("express").Router();
  
    router.post("/", plate.create);
  
    router.get("/", plate.findAll);

    router.get("/:id", plate.findOne);
  
    router.put("/:id", plate.update);
  
    router.delete("/:id", plate.delete);
  
    router.delete("/", plate.deleteAll);
  
    app.use('/api/plates', router);
  };