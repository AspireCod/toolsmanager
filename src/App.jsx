import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import ActivacionPage from "./features/activacion/ActivacionPage";
import VentasPage from "./features/ventas/VentasPage";
import ProductosPage from "./features/productos/ProductosPage";
import ClientesPage from "./features/clientes/ClientesPage";
import FacturasPage from "./features/facturas/FacturasPage";
import CajaPage from "./features/caja/CajaPage";
import GraficasPage from "./features/graficas/GraficasPage";
import ConfiguracionPage from "./features/configuracion/ConfiguracionPage";

function App() {
  const activado = localStorage.getItem("activado") === "true";

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            activado ? <Navigate to="/ventas" /> : <Navigate to="/activacion" />
          }
        />
        <Route path="/activacion" element={<ActivacionPage />} />
        <Route path="/ventas" element={<VentasPage />} />
        <Route path="/productos" element={<ProductosPage />} />
        <Route path="/clientes" element={<ClientesPage />} />
        <Route path="/facturas" element={<FacturasPage />} />
        <Route path="/caja" element={<CajaPage />} />
        <Route path="/graficas" element={<GraficasPage />} />
        <Route path="/configuracion" element={<ConfiguracionPage />} />
      </Routes>
    </Router>
  );
}

export default App;
