import { sequelize } from "../config/db.js";
import { DataTypes } from "sequelize";

const Movement = sequelize.define(
  "Movement",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },

    product_sku: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "El SKU del producto no puede estar vacío.",
        },
      },
    },

    fecha: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },

    cantidad: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        min: {
          args: [1],
          msg: "La cantidad debe ser mayor a 0.",
        },
        isInt: {
          msg: "La cantidad debe ser un número entero.",
        },
      },
    },

    tipo: {
      type: DataTypes.ENUM("VENTA", "COMPRA", "AJUSTE"),
      allowNull: false,
    },

    usuario_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        min: {
          args: [1],
          msg: "El ID de usuario debe ser mayor a 0.",
        },
      },
    },
  },
  {
    tableName: "movements",
    timestamps: false,
  }
);

export default Movement;
