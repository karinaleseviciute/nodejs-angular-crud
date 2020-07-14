const db = require("../models");
const Plate = db.plate;
const Op = db.Sequelize.Op;

exports.create = (req, res) => {
    // Validate request
    if (!req.body.owner) {
      res.status(400).send({
        message: "Content can not be empty!"
      });
      return;
    }
  
    const plate = {
      number: req.body.number,
      owner: req.body.owner
      //published: req.body.published ? req.body.published : false
    };
  
    Plate.create(plate)
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while creating new plate."
        });
      });
  };

exports.findAll = (req, res) => {
    const owner = req.query.owner;
    var condition = owner ? { owner: { [Op.like]: `%${owner}%` } } : null;
  
    Plate.findAll({ where: condition })
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving plates."
        });
      });
  };

exports.findOne = (req, res) => {
    const id = req.params.id;
  
    Plate.findByPk(id)
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message: "Error retrieving plate with id=" + id
        });
      });
  };

exports.update = (req, res) => {
    const id = req.params.id;
  
    Plate.update(req.body, {
      where: { id: id }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "Plate was updated successfully."
          });
        } else {
          res.send({
            message: `Cannot update plate with id=${id}. Maybe plate was not found or req.body is empty!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Error updating plate with id=" + id
        });
      });
  };

exports.delete = (req, res) => {
    const id = req.params.id;
  
    Plate.destroy({
      where: { id: id }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "Plate was deleted successfully!"
          });
        } else {
          res.send({
            message: `Cannot delete plate with id=${id}. Maybe plate was not found!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Could not delete plate with id=" + id
        });
      });
  };

exports.deleteAll = (req, res) => {
    Plate.destroy({
      where: {},
      truncate: false
    })
      .then(nums => {
        res.send({ message: `${nums} Plate were deleted successfully!` });
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while removing all plates."
        });
      });
  };