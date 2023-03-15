const Sequelize = require("sequelize");

module.exports = class LastTransaction extends Sequelize.Model {
  static init(sequelize) {
    return super.init(
      {
        transactionHash: {
          type: Sequelize.STRING(255),
          allowNull: true,
        },
        blockHeight: {
          type: Sequelize.STRING(255),
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
        nonce: {
          type: Sequelize.INTEGER.UNSIGNED,
          allowNull: true,
        },
        transactionIndex: {
          type: Sequelize.INTEGER.UNSIGNED,
          allowNull: true,
        },
        r: {
          type: Sequelize.Sequelize.STRING(255),
          allowNull: true,
        },
        s: {
          type: Sequelize.Sequelize.STRING(255),
          allowNull: true,
        },
        v: {
          type: Sequelize.Sequelize.STRING(255),
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
  static associate(db) {
    db.LastTransaction.belongsTo(db.LastBlock, {
      foreignKey: "blnum",
      targetKey: "blockNumber", // 고유값이 있어야 됨
    });
  }
};
