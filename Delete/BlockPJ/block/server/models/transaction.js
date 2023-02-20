const Sequelize = require("sequelize");
mysql;

module.exports = class Transaction extends Sequelize.Model {
  static init(sequelize) {
    return super.init(
      {
        transactionHash: {
          type: Sequelize.STRING(255),
        },
        block: {
          type: Sequelize.INTEGER.UNSIGNED,
        },
        timestamp: {
          type: Sequelize.INTEGER.UNSIGNED,
        },
        from: {
          type: Sequelize.STRING(255),
        },
        to: {
          type: Sequelize.STRING(255),
        },
        value: {
          type: Sequelize.INTEGER.UNSIGNED,
        },
        transactionFee: {
          type: Sequelize.INTEGER.UNSIGNED,
        },
        gasPrice: {
          type: Sequelize.INTEGER.UNSIGNED,
        },
      },
      {
        sequelize,
        modelName: "Transaction", // class name
        tableName: "transaction",
        paranoid: true,
        underscored: true,
        timestamps: true,
      }
    );
  }

  static associate(db) {
    db.Transaction.belongsTo(db.LastBlock, {
      foreignKey: "blockHash",
      targetKey: "hash",
    });
  }
};
