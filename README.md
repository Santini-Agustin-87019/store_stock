# Stock Store Backend

## Mapa del Proyecto (File Structure)

```
backend-stock/
├── node_modules/       # (Se crea solo al instalar librerías)
├── src/
│   ├── config/         # Aquí va la conexión a la DB (antes hacías esto en sequelize config)
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

   **express**: es un Framework para crear servidores web en Node.js.  
   **sequelize**: es un ORM (Object-Relational Mapping) que facilita la interacción con bases de datos SQL.  
   **sqlite3**: es el motor de base de datos que usaremos para almacenar los datos.  
   **dotenv**: nos permite cargar variables de entorno desde un archivo `.env`.
   **cors**: es un middleware que permite manejar las políticas de CORS (Cross-Origin Resource Sharing). Basicamente permite que nuestro backend pueda ser consumido desde otros dominios (como nuestro frontend).
   **morgan**: es un middleware para registrar las solicitudes HTTP en la consola, lo que ayuda en el desarrollo y depuración.

3. Instalamos las dependencias de desarrollo (opcional):
   ```bash
   npm install --save-dev nodemon
   ```
   **nodemon**: es una herramienta que reinicia automáticamente el servidor cada vez que detecta cambios en el código fuente, lo que facilita el desarrollo.
