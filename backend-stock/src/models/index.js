// Dentro de src/models/index.js definiremos las relacions entre modelos/tablas

import Movement from "./Movement.js";
import Product from "./Product.js";
import { sequelize } from "../config/db.js";
// import  Users  from "./Users.js";

// Un producto puede tener MUCHOS MOVIMIENTOS y un movimiento pertenece a UN SOLO PRODUCTO
/**
    'souceKey' es el campo en la tabla Product que se usa para la relacion, normalmente si no se especifica se usa el 'id'
    que genera automaticamente Sequelize. En nuestro caso no queremos eso, queremos usar el 'sku' como clave unica.
    Por eso lo colocamos explicitamente. Le estamos diciendo a Sequelize: "mira que yo quiero que te relaciones con sku 
    no con el id que creas vos".
 */
Product.hasMany(Movement, { foreignKey: "product_sku", sourceKey: "sku" });
Movement.belongsTo(Product, { foreignKey: "product_sku", targetKey: "sku" });

export { Product, Movement, sequelize };
