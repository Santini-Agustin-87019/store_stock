import { useState } from "react";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";

import { POSPage } from "./pages/POSPage";
import { InventoryPage } from "./pages/InventoryPage";

function App() {
  return (
    <>
      <BrowserRouter>
        {/* <Menu /> */}
        <div className="divBody">
          <Routes>
            <Route path="/productos" element={<InventoryPage />} />
            <Route path="/venta" element={<POSPage />} />
            {/* <Route path="*" element={ <Navigate to="/inicio" replace} /> */}
          </Routes>
        </div>
      </BrowserRouter>
    </>
  );
}

export default App;
