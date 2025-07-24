import { useState } from "react";
import Sidebar from "../../components/Sidebar";
import {
  Eye,
  Pencil,
  Trash2,
  Search,
  Plus,
  DollarSign,
  ArrowUpRight,
} from "lucide-react";

import { useNavigate } from "react-router-dom";
import AgregarClienteModal from "../../components/AgregarClienteModal";
import VerHistorialModal from "../../components/VerHistorialModal";
import EditarClienteModal from "../../components/EditarClienteModal";
import RegistrarPagoModal from "../../components/RegistrarPagoModal";
import AumentarDeudaModal from "../../components/AumentarDeudaModal";
import EliminarClienteModal from "../../components/EliminarClienteModal";

function ClientesPage() {
  const [modalAgregarAbierto, setModalAgregarAbierto] = useState(false);
  const [modalHistorialAbierto, setModalHistorialAbierto] = useState(false);
  const [clienteHistorial, setClienteHistorial] = useState(null);
  const [modalEditarAbierto, setModalEditarAbierto] = useState(false);
  const [clienteEditar, setClienteEditar] = useState(null);
  const [modalPagoAbierto, setModalPagoAbierto] = useState(false);
  const [modalAumentarAbierto, setModalAumentarAbierto] = useState(false);
  const [clienteSeleccionado, setClienteSeleccionado] = useState(null);
  const [modalEliminarAbierto, setModalEliminarAbierto] = useState(false);

  const [sidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate();
  const numeroFactura = 1001; // reuso para el header como en otras pantallas
  const [busqueda, setBusqueda] = useState("");

  const clientes = [
    {
      id: 1,
      nombre: "Construcciones Zamora",
      telefono: "555-123-4567",
      direccion: "Av. Reforma 123, Zamora",
      deuda: 2500,
      estadoDeuda: "Pendiente",
      ultimoPago: "2023-09-20",
      detallesExtra: "Cliente frecuente, pagos mensuales.",
    },
    {
      id: 2,
      nombre: "Ferretería del Centro",
      telefono: "555-987-6543",
      direccion: "Calle Principal 456, Zamora",
      deuda: 0,
      estadoDeuda: "Pagada",
      ultimoPago: "2023-09-10",
      detallesExtra: "Sin adeudos pendientes.",
    },
  ];

  const clientesFiltrados = clientes.filter((c) =>
    c.nombre.toLowerCase().includes(busqueda.toLowerCase())
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
          <h1 className="text-3xl font-bold text-neutral-900">Clientes</h1>
          <div className="flex items-center gap-2 w-full md:w-auto">
            <div className="relative flex-1 md:flex-none">
              <Search
                className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400"
                size={20}
              />
              <input
                type="text"
                placeholder="Buscar clientes..."
                className="w-full border rounded-lg pl-10 pr-4 py-2 text-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={busqueda}
                onChange={(e) => setBusqueda(e.target.value)}
              />
            </div>
            <button
              onClick={() => setModalAgregarAbierto(true)}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-blue-700 transition"
            >
              <Plus size={20} /> <span>Agregar cliente</span>
            </button>
          </div>
        </div>

        <div className="overflow-x-auto bg-white rounded-xl shadow">
          <table className="w-full text-left">
            <thead className="bg-neutral-200 text-neutral-700">
              <tr>
                <th className="p-3">Nombre</th>
                <th className="p-3">Teléfono</th>
                <th className="p-3">Dirección</th>
                <th className="p-3 text-right">Deuda</th>
                <th className="p-3 text-center">Estado de deuda</th>
                <th className="p-3 text-center">Último pago</th>
                <th className="p-3 text-center">Historial</th>
                <th className="p-3 text-center w-24"></th>
              </tr>
            </thead>
            <tbody>
              {clientesFiltrados.map((c) => (
                <tr
                  key={c.id}
                  className="border-t hover:bg-neutral-50 transition group relative"
                >
                  <td className="p-3">{c.nombre}</td>
                  <td className="p-3">{c.telefono}</td>
                  <td className="p-3">{c.direccion}</td>
                  <td className="p-3 text-right">${c.deuda.toFixed(2)}</td>
                  <td
                    className={`p-3 text-center font-semibold ${
                      c.estadoDeuda === "Pendiente"
                        ? "text-red-600"
                        : "text-green-600"
                    }`}
                  >
                    {c.estadoDeuda}
                  </td>
                  <td className="p-3 text-center">{c.ultimoPago}</td>
                  <td className="p-3 text-center">
                    <button
                      className="text-blue-500 hover:text-blue-700 transition"
                      title="Ver historial de movimientos"
                      onClick={() => {
                        setClienteHistorial(c);
                        setModalHistorialAbierto(true);
                      }}
                    >
                      <Eye size={22} />
                    </button>
                  </td>
                  <td className="p-3 hidden group-hover:table-cell">
                    <div className="flex gap-3 justify-center">
                      <button
                        onClick={() => {
                          setClienteEditar(c);
                          setModalEditarAbierto(true);
                        }}
                        className="text-blue-500 hover:text-blue-700 transition"
                        title="Editar cliente"
                      >
                        <Pencil size={24} />
                      </button>
                      <button
                        onClick={() => {
                          setClienteSeleccionado(c);
                          setModalPagoAbierto(true);
                        }}
                        className="text-green-600 hover:text-green-800 transition"
                        title="Registrar pago"
                      >
                        <DollarSign size={22} />
                      </button>

                      <button
                        onClick={() => {
                          setClienteSeleccionado(c);
                          setModalAumentarAbierto(true);
                        }}
                        className="text-orange-500 hover:text-orange-700 transition"
                        title="Aumentar deuda"
                      >
                        <ArrowUpRight size={22} />
                      </button>

                      <button
                        onClick={() => {
                          setClienteSeleccionado(c);
                          setModalEliminarAbierto(true);
                        }}
                        className="text-red-500 hover:text-red-700 transition"
                        title="Eliminar cliente"
                      >
                        <Trash2 size={24} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {clientesFiltrados.length === 0 && (
                <tr>
                  <td colSpan="8" className="p-6 text-center text-neutral-500">
                    No se encontraron clientes.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        <AgregarClienteModal
          open={modalAgregarAbierto}
          onClose={() => setModalAgregarAbierto(false)}
        />
        <VerHistorialModal
          open={modalHistorialAbierto}
          onClose={() => setModalHistorialAbierto(false)}
          cliente={clienteHistorial}
        />
        <EditarClienteModal
          open={modalEditarAbierto}
          onClose={() => setModalEditarAbierto(false)}
          cliente={clienteEditar}
        />
        <RegistrarPagoModal
          open={modalPagoAbierto}
          onClose={() => setModalPagoAbierto(false)}
          cliente={clienteSeleccionado}
        />

        <AumentarDeudaModal
          open={modalAumentarAbierto}
          onClose={() => setModalAumentarAbierto(false)}
          cliente={clienteSeleccionado}
        />
        <EliminarClienteModal
          open={modalEliminarAbierto}
          onClose={() => setModalEliminarAbierto(false)}
          cliente={clienteSeleccionado}
        />
      </main>
    </>
  );
}

export default ClientesPage;
