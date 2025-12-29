import { Sequelize } from "sequelize";

// Configuracion de la base de datos SQLite (archivo en memoria local)
const sequelize = new Sequelize({
  dialect: "sqlite", // Tipo de base de datos
  storage: "./db.sqlite", // Ruta al archivo de la base de datos
  logging: false, // Desactivar logs de SQL en pantalla (INSERT, UPDATE, etc.)
  define: {
    freezeTableName: true, // Evitar pluralizar nombres de tablas
    timestamps: false, // Evitar agregar campos createdAt y updatedAt automáticamente
  },
});

/*
    Verifica que la conexion a la base de datos funcione ANTES de que la aplicacion
    empiece a trabajar. Es como una prueba de conexion.
 */
const connectDB = async () => {
  try {
    await sequelize.authenticate(); // Probar conexión a la base de datos
    await sequelize.sync(); // Sincronizar modelos con la base de datos (solo crea tablas si no existen)

    console.log("✅ Conexión a la base de datos establecida correctamente.");
  } catch (error) {
    console.error("❌ No se pudo conectar a la base de datos:", error);
  }
};

export { sequelize, connectDB };
