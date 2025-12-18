import { DataTypes } from "sequelize";
import { sequelize } from "../config/db.js";

const Product = sequelize.define(
  "Product",
  {
    // Sequelize crea automáticamente un 'id' (Integer, AI, PK)
    // No hace falta declararlo.

    sku: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: {
        args: true,
        msg: "Este SKU ya existe.",
      },
    },

    nombre: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: { msg: "El nombre no puede estar vacío." },
        len: {
          args: [3, 100],
          msg: "El nombre debe tener entre 3 y 100 caracteres.",
        },
      },
    },

    descripcion: {
      type: DataTypes.STRING,
      allowNull: true,
    },

    precio_costo: {
      type: DataTypes.DECIMAL(10, 2),
      defaultValue: 0.0,
      allowNull: false,
    },

    precio_venta: {
      type: DataTypes.DECIMAL(10, 2),
      defaultValue: 0.0,
      allowNull: false,
    },

    stock_actual: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
      allowNull: false,
    },

    categoria: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    tableName: "products",
    timestamps: false,
    hooks: {
      beforeValidate: function (product, options) {
        if (product.sku) {
          product.sku = product.sku.toUpperCase().trim();
        }
      },
    },
  }
);

export default Product;
