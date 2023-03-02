const Sequelize = require("sequelize");

module.exports = class Rtk extends Sequelize.Model {
  static init(sequelize) {
    return super.init(
      {
        rtkData: {
          type: Sequelize.STRING(255),
          allowNull: true,
        },
      },
      {
        sequelize,
        modelName: "Rtk", // class name
        tableName: "rtk",
        paranoid: true,
        underscored: true,
        timestamps: true,
      }
    );
  }
};
