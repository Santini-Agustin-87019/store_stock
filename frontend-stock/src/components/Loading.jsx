function Loading() {
  return (
    <div className="container mt-5">
      <div
        className="d-flex justify-content-center align-items-center"
        style={{ minHeight: "400px" }}
      >
        <div className="text-center">
          <div
            className="spinner-border text-primary"
            role="status"
            style={{ width: "3rem", height: "3rem" }}
          >
            <span className="visually-hidden"> Cargando...</span>
          </div>
          <p className="text-mutted mt-3">Cargando inventario...</p>
        </div>
      </div>
    </div>
  );
}

export { Loading };
