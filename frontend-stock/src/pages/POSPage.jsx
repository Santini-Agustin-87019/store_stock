import React, { useState, useEffect } from "react";
import { productService } from "../services/product.service";
import { InventoryPage } from "./InventoryPage";
import { Loading } from "../components/Loading";

function POSPage() {
  const [loading, setLoading] = useState(false);

  const [carrito, setCarrito] = useState([]);
  const [catalogo, setCatalogo] = useState([]);

  useEffect(() => {
    cargarCatalogo();
  }, []);

  async function cargarCatalogo() {
    try {
      setLoading(true);
      const catalogo = await productService.getProducts();
      setCatalogo(catalogo);
    } catch (error) {
      console.error("Error al cargar el catalogo de productos", error);
    } finally {
      setLoading(false);
    }
  }

  const agregarAlCarrito = (product) => {
    setCarrito([...carrito, product]);
  };

  if (loading) {
    <Loading />;
  }
  return (
    <div className="container-fluid mt-4">
      <div className="row">
        {/* CATÁLOGO */}
        <div className="col-md-8">
          <div className="card">
            <div className="card-header bg-dark text-white">
              <h5 className="mb-0">
                <i className="bi bi-grid-3x3-gap-fill me-2"></i>
                Catálogo de Productos
              </h5>
            </div>
            <div className="card-body p-0">
              <div className="table-responsive">
                <table className="table table-hover mb-0">
                  <thead className="table-light">
                    <tr>
                      <th>Nombre</th>
                      <th>Categoría</th>
                      <th className="text-end">Precio</th>
                      <th className="text-center" style={{ width: "120px" }}>
                        Acción
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {catalogo.map((product) => (
                      <tr key={product.id}>
                        <td className="align-middle fw-medium">
                          {product.nombre}
                        </td>
                        <td className="align-middle">
                          <span className="badge bg-light text-dark border">
                            {product.categoria}
                          </span>
                        </td>
                        <td className="align-middle text-end fw-semibold">
                          ${product.precio_venta}
                        </td>
                        <td className="align-middle text-center">
                          <button
                            className="btn btn-primary btn-sm"
                            onClick={() => agregarAlCarrito(product)}
                          >
                            <i className="bi bi-plus-circle me-1"></i>
                            Agregar
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>

        {/* CARRITO */}
        <div className="col-md-4">
          <div className="card p-3">
            <h4>Ticket de Venta</h4>
            {carrito.map((item, index) => (
              <div key={index} className="d-flex justify-content-between">
                <span>{item.nombre}</span>
                <span>${item.precio_venta}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export { POSPage };
