const Sequelize = require("sequelize");

module.exports = class LastBlock extends Sequelize.Model {
  static init(sequelize) {
    return super.init(
      {
        difficulty: {
          type: Sequelize.INTEGER.UNSIGNED,
          allowNull: true,
        },
        extraData: {
          type: Sequelize.STRING(255),
          allowNull: true,
        },
        gasLimit: {
          type: Sequelize.INTEGER.UNSIGNED,
          allowNull: true,
        },
        gasUsed: {
          type: Sequelize.INTEGER.UNSIGNED,
          allowNull: true,
        },
        hash: {
          type: Sequelize.STRING(255),
          allowNull: true,
        },
        nonce: {
          type: Sequelize.STRING(255),
          allowNull: true,
        },
        blockNumber: {
          type: Sequelize.INTEGER.UNSIGNED,
          allowNull: true,
        },
        parenthash: {
          type: Sequelize.STRING(255),
          allowNull: true,
        },
        size: {
          type: Sequelize.INTEGER.UNSIGNED,
          allowNull: true,
        },
        timestamps: {
          type: Sequelize.INTEGER.UNSIGNED,
          allowNull: true,
        },
        totaldifficulty: {
          type: Sequelize.INTEGER.UNSIGNED,
          allowNull: true,
        },
        transactionsroot: {
          type: Sequelize.STRING(255),
          allowNull: true,
        },
      },
      {
        sequelize,
        modelName: "LastBlock", // class name
        tableName: "lastblock",
        paranoid: true,
        underscored: true,
        timestamps: true,
      }
    );
  }
  // static associate(db) {
  //   db.LastBlock.hasMany(db.LastTransaction, {
  //     foreignKey: "blockHash",
  //     sourceKey: "hash", // 고유값이 있어야 됨
  //   });
  // }
};
