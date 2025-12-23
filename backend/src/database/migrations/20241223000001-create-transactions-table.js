module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('transactions', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      transactionHash: {
        type: Sequelize.STRING(66),
        allowNull: false,
        unique: true,
        field: 'transaction_hash',
      },
      buyerWallet: {
        type: Sequelize.STRING(42),
        allowNull: false,
        field: 'buyer_wallet',
      },
      usdtAmount: {
        type: Sequelize.DECIMAL(20, 2),
        allowNull: false,
        field: 'usdt_amount',
      },
      spraiAmount: {
        type: Sequelize.DECIMAL(20, 2),
        allowNull: false,
        field: 'sprai_amount',
      },
      tokenPrice: {
        type: Sequelize.DECIMAL(10, 4),
        allowNull: false,
        field: 'token_price',
      },
      blockNumber: {
        type: Sequelize.INTEGER,
        allowNull: false,
        field: 'block_number',
      },
      timestamp: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      validated: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
        field: 'created_at',
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
        field: 'updated_at',
      },
    });

    // Add indexes
    await queryInterface.addIndex('transactions', ['buyer_wallet'], {
      name: 'idx_transactions_buyer_wallet',
    });

    await queryInterface.addIndex('transactions', ['validated'], {
      name: 'idx_transactions_validated',
    });

    await queryInterface.addIndex('transactions', ['timestamp'], {
      name: 'idx_transactions_timestamp',
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('transactions');
  },
};
