'use strict';
module.exports = (sequelize, DataTypes) => {
  const Map = sequelize.define('Map', {
    userId: DataTypes.INTEGER,
    hexagons: DataTypes.JSONB,
    startingAttrs: DataTypes.JSONB
  }, {});
  Map.associate = function(models) {
    // associations can be defined here
  };
  return Map;
};