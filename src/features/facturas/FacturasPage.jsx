import { useState } from "react";
import Sidebar from "../../components/Sidebar";
import { Eye, Download, Search } from "lucide-react";
import { useNavigate } from "react-router-dom";
import VerFacturaModal from "../../components/VerFacturaModal";
import DescargarFacturaModal from "../../components/DescargarFacturaModal";

function FacturasPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate();
  const numeroFactura = 1001;
  const [busqueda, setBusqueda] = useState("");
  const [modalFacturaAbierto, setModalFacturaAbierto] = useState(false);
  const [facturaSeleccionada, setFacturaSeleccionada] = useState(null);
  const [modalDescargarAbierto, setModalDescargarAbierto] = useState(false);

  const facturas = [
    {
      id: 1,
      numero: 1001,
      cliente: "Construcciones Zamora",
      fecha: "2023-09-20",
      total: 2500,
    },
    {
      id: 2,
      numero: 1000,
      cliente: "Ferretería del Centro",
      fecha: "2023-09-15",
      total: 1800,
    },
  ];

  const facturasFiltradas = facturas.filter(
    (f) =>
      f.numero.toString().includes(busqueda) ||
      f.cliente.toLowerCase().includes(busqueda.toLowerCase()) ||
      f.fecha.includes(busqueda)
  );

  return (
    <>
      <Sidebar
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
        numeroFactura={numeroFactura}
        navigate={navigate}
      />

      <main className="pt-16 p-6 min-h-screen bg-neutral-100">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
          <h1 className="text-3xl font-bold text-neutral-900">Facturas</h1>

          <div className="flex items-center gap-2 w-full md:w-auto">
            <div className="relative flex-1 md:flex-none">
              <Search
                className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400"
                size={20}
              />
              <input
                type="text"
                placeholder="Buscar facturas..."
                className="w-full border rounded-lg pl-10 pr-4 py-2 text-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={busqueda}
                onChange={(e) => setBusqueda(e.target.value)}
              />
            </div>
          </div>
        </div>

        <div className="overflow-x-auto bg-white rounded-xl shadow">
          <table className="w-full text-left">
            <thead className="bg-neutral-200 text-neutral-700">
              <tr>
                <th className="p-3">#Factura</th>
                <th className="p-3">Cliente</th>
                <th className="p-3">Fecha</th>
                <th className="p-3 text-right">Total</th>
                <th className="p-3 text-center w-24"></th>
              </tr>
            </thead>
            <tbody>
              {facturasFiltradas.map((f) => (
                <tr
                  key={f.id}
                  className="border-t hover:bg-neutral-50 transition group relative"
                >
                  <td className="p-3">{f.numero}</td>
                  <td className="p-3">{f.cliente}</td>
                  <td className="p-3">{f.fecha}</td>
                  <td className="p-3 text-right">${f.total.toFixed(2)}</td>
                  <td className="p-3 hidden group-hover:table-cell">
                    <div className="flex gap-3 justify-center">
                      <button
                        onClick={() => {
                          setFacturaSeleccionada(f);
                          setModalFacturaAbierto(true);
                        }}
                        className="text-blue-500 hover:text-blue-700 transition"
                        title="Ver detalles"
                      >
                        <Eye size={22} />
                      </button>
                      <button
                        onClick={() => {
                          setFacturaSeleccionada(f);
                          setModalDescargarAbierto(true);
                        }}
                        className="text-green-600 hover:text-green-800 transition"
                        title="Descargar PDF"
                      >
                        <Download size={22} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {facturasFiltradas.length === 0 && (
                <tr>
                  <td colSpan="5" className="p-6 text-center text-neutral-500">
                    No se encontraron facturas.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        <VerFacturaModal
          open={modalFacturaAbierto}
          onClose={() => setModalFacturaAbierto(false)}
          factura={facturaSeleccionada}
        />
        <DescargarFacturaModal
          open={modalDescargarAbierto}
          onClose={() => setModalDescargarAbierto(false)}
          factura={facturaSeleccionada}
        />
      </main>
    </>
  );
}

export default FacturasPage;
