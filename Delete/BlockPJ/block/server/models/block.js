const Sequelize = require("sequelize");

module.exports = class LastBlock extends Sequelize.Model {
  static init(sequelize) {
    return super.init(
      {
        difficulty: {
          type: Sequelize.INTEGER.UNSIGNED,
        },
        extraData: {
          type: Sequelize.STRING(255),
        },
        gasLimit: {
          type: Sequelize.INTEGER.UNSIGNED,
        },
        gasUsed: {
          type: Sequelize.INTEGER.UNSIGNED,
        },
        hash: {
          type: Sequelize.STRING(255),
        },
        nonce: {
          type: Sequelize.STRING(255),
        },
        number: {
          type: Sequelize.INTEGER.UNSIGNED,
        },
        parenthash: {
          type: Sequelize.STRING(255),
        },
        size: {
          type: Sequelize.INTEGER.UNSIGNED,
        },
        timestamps: {
          type: Sequelize.INTEGER.UNSIGNED,
        },
        totaldifficulty: {
          type: Sequelize.INTEGER.UNSIGNED,
        },
        transactionsroot: {
          type: Sequelize.STRING(255),
        },
        // transactions: {
        //   type: "[]",
        // },
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

  static associate(db) {
    db.LastBlock.hasMany(db.Transaction, {
      foreignKey: "blockHash",
      sourceKey: "hash",
    });
  }
};
