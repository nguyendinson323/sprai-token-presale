import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../config';

// ============================================
// TRANSACTION MODEL
// ============================================

interface TransactionAttributes {
  id: number;
  transactionHash: string;
  buyerWallet: string;
  usdtAmount: string;
  spraiAmount: string;
  tokenPrice: string;
  blockNumber: number;
  timestamp: Date;
  validated: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

interface TransactionCreationAttributes extends Optional<TransactionAttributes, 'id' | 'createdAt' | 'updatedAt'> {}

class Transaction extends Model<TransactionAttributes, TransactionCreationAttributes> implements TransactionAttributes {
  public id!: number;
  public transactionHash!: string;
  public buyerWallet!: string;
  public usdtAmount!: string;
  public spraiAmount!: string;
  public tokenPrice!: string;
  public blockNumber!: number;
  public timestamp!: Date;
  public validated!: boolean;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Transaction.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    transactionHash: {
      type: DataTypes.STRING(66),
      allowNull: false,
      unique: true,
      field: 'transaction_hash',
    },
    buyerWallet: {
      type: DataTypes.STRING(42),
      allowNull: false,
      field: 'buyer_wallet',
    },
    usdtAmount: {
      type: DataTypes.DECIMAL(20, 2),
      allowNull: false,
      field: 'usdt_amount',
    },
    spraiAmount: {
      type: DataTypes.DECIMAL(20, 2),
      allowNull: false,
      field: 'sprai_amount',
    },
    tokenPrice: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
      field: 'token_price',
    },
    blockNumber: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: 'block_number',
    },
    timestamp: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    validated: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: 'transactions',
    timestamps: true,
    underscored: true,
  }
);

export default Transaction;
