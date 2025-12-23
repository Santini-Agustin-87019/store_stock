# Stock Store 

##  Descripcion 

Este proyecto es un backend para la gestion de stock de una tienda. Permite manejar productos, movimientos de stock (entradas y salidas) y usuarios. Esta construido con Node.js, Express y Sequelize, utilizando SQLite como base de datos.
Es puramente realizado por mi para aprender y practicar el desarrollo de backends con Node.js y bases de datos SQL.

Actualmente esta en desarrollo, por lo que algunas funcionalidades pueden no estar completas o ser inestables.

## Mapa del Proyecto (File Structure)

```
backend-stock/
├── node_modules/       # (Se crea solo al instalar librerías)
├── src/
│   ├── config/         # Aquí va la conexión a la DB
│   ├── controllers/    # La LÓGICA. Aquí "desarmamos" el JSON y decidimos qué hacer.
│   ├── models/         # Los ESQUEMAS. Aquí definimos qué campos tiene un Producto.
│   ├── routes/         # Las RUTAS. Define las URLs (GET /productos, POST /ventas).
│   ├── utils/          # Pequeñas funciones de ayuda (ej: formatear fechas).
│   ├── app.js          # Configuración de Express (Middlewares, CORS).
│   └── index.js        # El punto de entrada. Arranca el servidor.
├── .env                # Variables de entorno (puerto, clave de la DB).
├── .gitignore          # Para no subir node_modules a GitHub.
└── package.json        # Lista de dependencias.
```

## 1 - Instalación de Dependencias

En la terminal, dentro de la carpeta `backend-stock`, ejecutaremos:

1. Inicializamos npm (si no lo hemos hecho ya):
   ```bash
   npm init -y
   ```
2. Instalamos las dependencias necesarias:

   ```bash
   npm install express sequelize sqlite3 dotenv cors morgan
   ```

   - **express**: es un Framework para crear servidores web en Node.js.  
   - **sequelize**: es un ORM (Object-Relational Mapping) que facilita la interacción con bases de datos SQL.  
   - **sqlite3**: es el motor de base de datos que usaremos para almacenar los datos.  
   - **dotenv**: nos permite cargar variables de entorno desde un archivo `.env`.
   - **cors**: es un middleware que permite manejar las políticas de CORS (Cross-Origin Resource Sharing). Basicamente permite que nuestro backend pueda ser consumido desde otros dominios (como nuestro frontend).
   - **morgan**: es un middleware para registrar las solicitudes HTTP en la consola, lo que ayuda en el desarrollo y depuración.

3. Instalamos las dependencias de desarrollo (opcional):
   ```bash
   npm install --save-dev nodemon
   ```
   **nodemon**: es una herramienta que reinicia automáticamente el servidor cada vez que detecta cambios en el código fuente, lo que facilita el desarrollo.

## 2. Configuracion del index.js, app.js y db.js
1. Primero lo que hize fue crear el `src/config/db.js` para configurar la conexion a la base de datos con `sequelize`.
   - Importe Sequelize desde sequelize.
   - Cree una instancia de Sequelize, poniendo informacion relevante como el Tipo de base de datos (dialect), almacenamiento (storage) y logging.
   - Luego cree una funcion asincronica llamada `connectDB` que verifica que la conexion a la base de datos sea exitosa antes de que la app inicie.
      - con `sequelize.authenticate()` verifico la conexion.
      - y con `sequelize.sync()` sincronizo los modelos con la base de datos (Productos, Movimientos, Usuarios, etc).
2. Luego en `src/app.js` configure express.
   - importe express y los middlewares que voy a usar (cors, morgan, express.json).
   - cree una instancia de express con `const app = express()`.
   - use los middlewares con `app.use()`
   - luego con `app.get()` cree una ruta base para verificar que todo este funcionando.
3. Finalmente `src/index.js`.
   - importe app desde `app.js` y la funcion `connectDB` desde `db.js`.
   - defini una constante `PORT` para el puerto en el que va a correr el servidor.
   - Cree una funcion asincronica `main` que primero usa el `connectDB()` para conectar a la base de datos y luego inicia el servidor con `app.listen()`.

## 3. Creador de Modelos
En la carpeta `src/models/` voy a crear los modelos necesarios para la aplicacion. Estos modelos representan las tablas en la base de datos.
1. Modelo Producto (`src/models/Product.js`):
   - importe la instancia que cree de sequelize de `../config/db.js`.
   - importe `DataTypes` desde sequelize.
   - cree una una constante `Product` en la que defini el modelo con `sequelize.define("Product", {},{})`.
   - Dentro del objeto defini los campos que habia en el DER que cree. (sku, nombre, descripcion, precio_compra, precio_venta, stock_actual).
   - Alguna de las propiedades que use fueron:
      - `type`: define el tipo de dato (STRING, INTEGER, DECIMAL, etc).
      - `allowNull`: si el campo puede ser nulo o no.
      - `unique`: si el campo debe ser unico.
      - `defaultValue`: valor por defecto si no se proporciona uno.
      - no puse `primaryKey` porque sequelize lo crea automaticamente con un campo id.
      
2. Modelo Movimiento (`src/models/Movement.js`):
   - similar al modelo Producto, pero con los campos del DER para movimientos (tipo, cantidad, fecha, product_sku, usuario_id).
   - el campo `product_sku` es una clave foranea que referencia al producto asociado al movimiento.
   - el campo `usuario_id` es una clave foranea que referencia al usuario que realizo el movimiento.

3. Modelo de relacion de Modelos (`src/models/index.js`):
   - Importe los modelos Producto y Movimiento.
   - Defini las relaciones entre los modelos:
      - Un Producto puede tener muchos Movimientos (`Product.hasMany(Movement, { foreignKey: 'product_sku', sourceKey: 'sku' })`).
      - Un Movimiento pertenece a un Producto (`Movement.belongsTo(Product, { foreignKey: 'product_sku', targetKey: 'sku' })`).

