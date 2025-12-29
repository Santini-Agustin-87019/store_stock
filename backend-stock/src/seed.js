import { sequelize } from "./config/db.js";
import { Product } from "./models/index.js";

const seed = async () => {
  try {
    await sequelize.authenticate();
    await sequelize.sync({ force: true });

    console.log("Insertando datos de prueba...");

    await Product.bulkCreate([
      {
        sku: "REM-BAT-M",
        nombre: "Remera Batman Talle M",
        precio_costo: 2500,
        precio_venta: 5000,
        stock_actual: 10,
        categoria: "Ropa",
      },
      {
        sku: "LAPIZ-HB",
        nombre: "Lápiz Negro HB",
        precio_costo: 50,
        precio_venta: 200,
        stock_actual: 50,
        categoria: "Libreria",
      },
    ]);

    console.log("Productos Cargados...");
    process.exit();
  } catch (error) {
    console.error("No se pudo cargar los productos", error);
    process.exit(1);
  }
};

seed();
