import React, { useState, useEffect } from "react";
import { productService } from "../services/product.service";
import { Loading } from "../components/Loading";

function InventoryPage({ titulo }) {
  const [products, setProducts] = useState([]);
  const [cargando, setCargando] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchProducts();
  }, []);

  const getStockActual = (stock) => {
    if (stock == 0) {
      return <span className="badge text-danger">{stock}</span>;
    } else {
      return <span className="badge text-success">{stock}</span>;
    }
  };

  const formatPrice = (precio) => {
    return new Intl.NumberFormat("es-AR", {
      style: "currency",
      currency: "ARS",
    }).format(precio);
  };

  async function fetchProducts() {
    try {
      setCargando(true);
      setError(null);
      const products = await productService.getProducts();
      setProducts(products);
    } catch (error) {
      console.error("Error al cargar productos:", error);
      setError("Error al cargar los productos. Por favor, intente nuevamente.");
    } finally {
      setCargando(false);
    }
  }

  if (cargando) {
    <Loading />;
  }

  return (
    <div className="container mt-5">
      <div className="bg-dark text-white mb-1 p-1">
        <div className="d-flex justify-content-between align-items-center">
          <h2 className="mb-0">
            <i className="bi bi-box-seam me-2"></i>
            {titulo}
          </h2>
          <button
            type="button"
            className="btn btn-light btn-sm"
            onClick={fetchProducts}
            disabled={cargando}
          >
            Actualizar
          </button>
        </div>
      </div>
      {!error && products.length === 0 && (
        <div className="text-center py-5">
          <i
            className="bi bi-inbox"
            style={{ fontSize: "4rem", color: "#ccc" }}
          ></i>
          <p className="text-muted mt-3">No hay productos en el inventario</p>
        </div>
      )}
      {!error && products.length > 0 && (
        <div className="table-responsive">
          <table className="table table-striped table-hover mb-0">
            <thead className="table-dark">
              <tr>
                <th className="fw-semibold">SKU</th>
                <th className="fw-semibold">Nombre</th>
                <th className="fw-semibold">Categoría</th>
                <th className="fw-semibold text-end">Precio Venta</th>
                <th className="fw-semibold text-center">Stock</th>
              </tr>
            </thead>

            <tbody>
              {products.map((product) => (
                <tr key={product.sku} className="align-middle">
                  <td className="text-muted">
                    <code className="text-secondary">{product.sku}</code>
                  </td>
                  <td className="fw-medium">{product.nombre}</td>
                  <td>
                    <span className="badge bg-light text-dark border">
                      {product.categoria}
                    </span>
                  </td>
                  <td className="text-end fw-semibold">
                    {formatPrice(product.precio_venta)}
                  </td>
                  <td className="text-center">
                    <div className="d-flex flex-column align-items-center gap-1">
                      {getStockActual(product.stock_actual)}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export { InventoryPage };
