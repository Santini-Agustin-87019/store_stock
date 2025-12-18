import app from "./app.js";
import { connectDB } from "./config/db.js";
import './models/index.js'; // Aseguramos que se carguen los modelos y sus relaciones

const PORT = process.env.PORT || 3000;

async function main() {
  try {
    // 1. Esperamos a conectar a la base de datos
    await connectDB();

    //2. Solo si se conecto, Iniciamos el servidor
    app.listen(PORT, () => {
      console.log(`🚀 Servidor escuchando en el puerto ${PORT}`);
    });
  } catch (error) {
    console.error("Error al iniciar la aplicación:", error);
  }
}

main();
