const Sequelize = require("sequelize");

module.exports = class Search extends Sequelize.Model {
  static init(sequelize) {
    return super.init(
      {
        address: {
          type: Sequelize.STRING(255),
          allowNull: true,
        },
        token: {
          type: Sequelize.STRING(255),
          allowNull: true,
        },
        nametag: {
          type: Sequelize.STRING(255),
          allowNull: true,
        },
      },
      {
        sequelize,
        modelName: "Search", // class name
        tableName: "search",
        paranoid: true,
        underscored: true,
        timestamps: true,
      }
    );
  }

  // static associate(db) {
  //   db.Transaction.belongsTo(db.LastBlock, {
  //     foreignKey: "blockHash",
  //     targetKey: "hash",
  //   });
  // }
};
