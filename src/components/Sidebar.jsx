import {
  Menu,
  X,
  ShoppingCart,
  Package,
  Users,
  Receipt,
  Settings,
  Bell,
  DollarSign,
  BarChart3,
} from "lucide-react";

import { useState } from "react";

import AlertasStockModal from "./AlertasStockModal";

function Sidebar({ sidebarOpen, setSidebarOpen, numeroFactura, navigate }) {
  const usuarioActual = JSON.parse(localStorage.getItem("usuarioActual"));

  const [modalAlertasAbierto, setModalAlertasAbierto] = useState(false);
  const productosBajoStock = [
    { nombre: "Cemento Gris", stock: 2 },
    { nombre: "Martillo", stock: 1 },
    { nombre: "Metro", stock: 3 },
  ];

  const handleNavigate = (ruta) => {
    navigate(ruta);
    setSidebarOpen(false); // cerrar al navegar
  };
  return (
    <>
      {/* Overlay para cerrar al hacer clic fuera */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-30 z-10"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Header fijo */}
      <header className="flex items-center justify-between bg-white shadow p-3 fixed top-0 left-0 right-0 z-20">
        <div className="flex items-center gap-4">
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="text-neutral-700 hover:text-blue-600 transition"
          >
            <Menu size={28} />
          </button>
          <h1 className="text-xl font-bold text-neutral-900 flex items-center gap-2">
            ToolsManager
            <div
              className="relative group cursor-pointer"
              title="Productos con stock bajo"
              onClick={() => setModalAlertasAbierto(true)}
            >
              <Bell
                size={22}
                className="text-neutral-700 hover:text-red-600 transition"
              />
              {productosBajoStock.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs font-bold rounded-full px-1.5">
                  {productosBajoStock.length}
                </span>
              )}
            </div>
          </h1>
        </div>
        <div className="text-sm text-neutral-600 mr-4">
          Número de Factura:{" "}
          <span className="text-neutral-900">{numeroFactura}</span>
        </div>
      </header>

      {/* Sidebar lateral */}
      <aside
        className={`fixed top-0 left-0 h-full bg-white shadow transform ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        } transition-transform w-64 z-30`}
      >
        <div className="flex justify-between items-center p-4 border-b">
          <h2 className="text-lg font-bold text-neutral-900">Menú</h2>
          <button
            onClick={() => setSidebarOpen(false)}
            className="text-neutral-700 hover:text-red-600 transition"
          >
            <X size={24} />
          </button>
        </div>

        <nav className="p-4 space-y-2">
          <button
            onClick={() => handleNavigate("/ventas")}
            className="flex items-center gap-3 w-full text-left text-neutral-700 hover:bg-neutral-100 p-3 rounded transition"
          >
            <ShoppingCart size={20} /> Ventas
          </button>
          <button
            onClick={() => handleNavigate("/productos")}
            className="flex items-center gap-3 w-full text-left text-neutral-700 hover:bg-neutral-100 p-3 rounded transition"
          >
            <Package size={20} /> Productos
          </button>
          <button
            onClick={() => handleNavigate("/clientes")}
            className="flex items-center gap-3 w-full text-left text-neutral-700 hover:bg-neutral-100 p-3 rounded transition"
          >
            <Users size={20} /> Clientes
          </button>
          <button
            onClick={() => handleNavigate("/facturas")}
            className="flex items-center gap-3 w-full text-left text-neutral-700 hover:bg-neutral-100 p-3 rounded transition"
          >
            <Receipt size={20} /> Facturas
          </button>
          <button
            onClick={() => handleNavigate("/caja")}
            className="flex items-center gap-3 w-full text-left text-neutral-700 hover:bg-neutral-100 p-3 rounded transition"
          >
            <DollarSign size={20} /> Caja
          </button>
          {usuarioActual?.rol === "admin" && (
            <button
              onClick={() => handleNavigate("/graficas")}
              className="flex items-center gap-3 w-full text-left text-neutral-700 hover:bg-neutral-100 p-3 rounded transition"
            >
              <BarChart3 size={20} /> Gráficas
            </button>
          )}

          <button
            onClick={() => handleNavigate("/configuracion")}
            className="flex items-center gap-3 w-full text-left text-neutral-700 hover:bg-neutral-100 p-3 rounded transition"
          >
            <Settings size={20} /> Configuración
          </button>
        </nav>
      </aside>
      <AlertasStockModal
        open={modalAlertasAbierto}
        onClose={() => setModalAlertasAbierto(false)}
        productos={productosBajoStock}
      />
    </>
  );
}

export default Sidebar;
