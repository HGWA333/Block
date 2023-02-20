const Sequelize = require("sequelize");

module.exports = class LastTransaction extends Sequelize.Model {
  static init(sequelize) {
    return super.init(
      {
        transactionHash: {
          type: Sequelize.STRING(255),
          allowNull: true,
        },
        block: {
          type: Sequelize.INTEGER.UNSIGNED,
          allowNull: true,
        },
        timestamp: {
          type: Sequelize.INTEGER.UNSIGNED,
          allowNull: true,
        },
        from: {
          type: Sequelize.STRING(255),
          allowNull: true,
        },
        to: {
          type: Sequelize.STRING(255),
          allowNull: true,
        },
        value: {
          type: Sequelize.INTEGER.UNSIGNED,
          allowNull: true,
        },
        transactionFee: {
          type: Sequelize.INTEGER.UNSIGNED,
          allowNull: true,
        },
        gasPrice: {
          type: Sequelize.INTEGER.UNSIGNED,
          allowNull: true,
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
  // static associate(db) {
  //   db.LastTransaction.belongsTo(db.LastBlock, {
  //     foreignKey: "blockHash",
  //     targetKey: "hash", // 고유값이 있어야 됨
  //   });
  // }
};
