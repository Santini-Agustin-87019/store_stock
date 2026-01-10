function CardProduct({ product, agregarAlCarrito }) {
  return (
    <div className="col-md-3 mb-4">
      {/* Grid de Bootstrap para que entren 3 por fila */}
      <div className="card h-100">
        <div className="card-body">
          <h5>{product.nombre}</h5>
          <p>Precio: ${product.precio_venta}</p>

          {/* 3. Y aquí el botón que diga "Agregar" */}
          <button
            className="btn btn-primary w-100"
            onClick={() => agregarAlCarrito(product)}
          >
            Agregar
          </button>
        </div>
      </div>
    </div>
  );
}

export { CardProduct };
