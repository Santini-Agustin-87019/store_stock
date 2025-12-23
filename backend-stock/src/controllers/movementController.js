import { sequelize } from "../config/db.js";
import { Product, Movement } from "../models/index.js";

export const createMovement = async (req, res) => {
  // 1. Iniciamos la transacción
  const t = await sequelize.transaction();

  try {
    const { tipo, items, usuario_id } = req.body;

    // --- VALIDACIONES GENERALES (Antes de entrar al bucle) ---
    // Aquí no hace falta rollback porque aún no hicimos cambios en la BD,
    // pero por seguridad cerramos la transacción si fallan las validaciones básicas.

    if (!tipo || !["VENTA", "COMPRA", "AJUSTE"].includes(tipo)) {
      await t.rollback(); // Cerramos por prolijidad
      return res.status(400).json({
        message: "El tipo de movimiento debe ser 'VENTA', 'COMPRA' o 'AJUSTE'",
      });
    }

    if (!usuario_id) {
      await t.rollback();
      return res.status(400).json({ message: "El usuario_id es requerido" });
    }

    if (!Array.isArray(items) || items.length === 0) {
      await t.rollback();
      return res.status(400).json({ message: "Se requiere al menos un item" });
    }

    const movimientosCreados = [];

    // --- PROCESAMIENTO DE ITEMS ---
    for (const item of items) {
      // Validar SKU
      if (!item.sku) {
        await t.rollback(); // <--- CRÍTICO: Deshacer todo antes de salir
        return res.status(400).json({ message: "Cada item debe tener un SKU" });
      }

      const cantidad = Number(item.cantidad);

      // Validar integridad de cantidad
      if (!Number.isInteger(cantidad) || cantidad === 0) {
        await t.rollback(); // <--- CRÍTICO
        return res.status(400).json({
          message: `La cantidad para el SKU ${item.sku} debe ser entero y no cero`,
        });
      }

      // Validar positivos para compra/venta
      if ((tipo === "VENTA" || tipo === "COMPRA") && cantidad <= 0) {
        // si hacemos un return la transaccion queda colgada  porque nunca llega al commit de el try o al rollback del catch
        await t.rollback();
        return res.status(400).json({
          message: `La cantidad para ${tipo} debe ser positiva`,
        });
      }

      // Buscar producto (Bloqueando la fila para que nadie más la toque mientras leemos)
      const producto = await Product.findOne({
        where: { sku: item.sku },
        transaction: t,
      });

      if (!producto) {
        await t.rollback(); // <--- CRÍTICO
        return res.status(404).json({
          message: `Producto con SKU ${item.sku} no encontrado`,
        });
      }

      // --- REGLAS DE NEGOCIO ---

      // 1. VENTA: No permitir stock negativo (Veo que elegiste ser estricto, ¡bien!)
      if (tipo === "VENTA" && producto.stock_actual < cantidad) {
        await t.rollback(); // <--- CRÍTICO: Si falla uno, fallan todos
        return res.status(400).json({
          message: `Stock insuficiente para ${producto.nombre}. Stock: ${producto.stock_actual}, Solicitado: ${cantidad}`,
        });
      }

      // 2. AJUSTE: No permitir que un ajuste reste más de lo que hay
      if (
        tipo === "AJUSTE" &&
        cantidad < 0 &&
        producto.stock_actual + cantidad < 0
      ) {
        await t.rollback(); //
        return res.status(400).json({
          message: `El ajuste dejaría el stock en negativo.`,
        });
      }

      // --- ACTUALIZACIÓN ---

      // Actualizamos la instancia del producto (en memoria)
      if (tipo === "VENTA") {
        producto.stock_actual -= cantidad;
      } else if (tipo === "COMPRA") {
        producto.stock_actual += cantidad;
      } else if (tipo === "AJUSTE") {
        producto.stock_actual += cantidad;
      }

      // Guardamos en BD
      await producto.save({ transaction: t });

      // Creamos el historial
      const movimiento = await Movement.create(
        {
          tipo,
          cantidad, // Aquí guardamos la cantidad tal cual vino (si es ajuste -5, se guarda -5)
          product_sku: item.sku,
          usuario_id,
        },
        { transaction: t }
      );

      movimientosCreados.push(movimiento);
    }

    // ¡Si llegamos acá, todo salió perfecto!
    await t.commit();

    return res.status(201).json({
      message: "Movimiento registrado exitosamente",
      cantidad_items: movimientosCreados.length,
    });
  } catch (error) {
    // Este catch atrapa errores de base de datos (ej: conexión caída, error de sintaxis SQL imprevisto)
    if (t) await t.rollback(); // Por si acaso
    console.error("Error fatal en transacción:", error);
    return res.status(500).json({
      message: "Error interno del servidor",
      error: error.message,
    });
  }
};
