module.exports = (sequelize, Sequelize) => {
  const Plate = sequelize.define("plate", {
    id: {
      type: Sequelize.INTEGER(100),
      allowNull: false,
      autoIncrement: true,
      primaryKey: true
    },
    owner: {
      type: Sequelize.STRING(40),
      allowNull: false
    },
    number: {
      type: Sequelize.STRING(6),
      allowNull: false,
      unique: true
    },
    createdAt: {
      type: Sequelize.DATEONLY,
      allowNull: true,
      defaultValue: null
    },
    updatedAt: {
      type: Sequelize.DATEONLY,
      allowNull: true,
      defaultValue: null
    },
  });

  return Plate;
};