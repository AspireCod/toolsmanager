import { useState } from "react";
import Sidebar from "../../components/Sidebar";
import { Plus, Calendar, RefreshCw, Search } from "lucide-react";
import { useNavigate } from "react-router-dom";
import RegistrarMovimientoModal from "../../components/RegistrarMovimientoModal";
import RegistrarCorteModal from "../../components/RegistrarCorteModal";
import VerCortesModal from "../../components/VerCortesModal";

function CajaPage() {
  const usuarioActual = JSON.parse(localStorage.getItem("usuarioActual"));
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate();
  const numeroFactura = 1001;
  const [fecha, setFecha] = useState(new Date().toISOString().split("T")[0]);
  const [modalMovimientoAbierto, setModalMovimientoAbierto] = useState(false);

  const movimientos = [
    {
      tipo: "ingreso",
      descripcion: "Pago de deuda del cliente Yair",
      monto: 300,
      formaPago: "efectivo",
      fecha: "2025-07-01",
      hora: "12:43:48",
    },
    {
      tipo: "ingreso",
      descripcion: "Pago de deuda del cliente Leo",
      monto: 100,
      formaPago: "efectivo",
      fecha: "2025-07-01",
      hora: "11:22:10",
    },
    {
      tipo: "egreso",
      descripcion: "Pago de servicios: Luz y agua",
      monto: -300,
      formaPago: "transferencia",
      fecha: "2025-07-01",
      hora: "10:05:30",
    },
    {
      tipo: "ingreso",
      descripcion: "Pago parcial del cliente Manuel",
      monto: 500,
      formaPago: "tarjeta",
      fecha: "2025-07-01",
      hora: "09:30:00",
    },
    {
      tipo: "egreso",
      descripcion: "Compra de tornillería",
      monto: -200,
      formaPago: "efectivo",
      fecha: "2025-07-01",
      hora: "08:50:00",
    },
    {
      tipo: "ingreso",
      descripcion: "Pago de cliente Luis",
      monto: 1500,
      formaPago: "transferencia",
      fecha: "2025-07-01",
      hora: "08:20:00",
    },
    {
      tipo: "egreso",
      descripcion: "Reembolso a cliente Pedro",
      monto: -100,
      formaPago: "efectivo",
      fecha: "2025-07-01",
      hora: "08:10:00",
    },
    {
      tipo: "ingreso",
      descripcion: "Ingreso por venta factura #33",
      monto: 200,
      formaPago: "efectivo",
      fecha: "2025-07-01",
      hora: "07:55:00",
    },
  ];
  const [modalCorteAbierto, setModalCorteAbierto] = useState(false);

  const movimientosFiltrados = movimientos.filter((m) => m.fecha === fecha);
  const [modalVerCortesAbierto, setModalVerCortesAbierto] = useState(false);

  const cortes = [
    {
      fechaHora: "2025-06-30 18:45",
      efectivo: 1500,
      observaciones: "Corte parcial de la tarde",
    },
    { fechaHora: "2025-06-29 20:00", efectivo: 2000, observaciones: "" },
  ];

  return (
    <>
      <Sidebar
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
        numeroFactura={numeroFactura}
        navigate={navigate}
      />

      <main className="pt-16 p-6 min-h-screen bg-neutral-100">
        {/* Botones principales */}
        <div className="flex flex-wrap gap-2 mb-6">
          <button
            onClick={() => setModalMovimientoAbierto(true)}
            className="bg-blue-600 text-white px-4 py-2 rounded flex items-center gap-2 hover:bg-blue-700 transition text-sm"
          >
            <Plus size={16} /> Movimiento
          </button>

          <button
            onClick={() => setModalCorteAbierto(true)}
            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition text-sm"
          >
            Registrar corte
          </button>
{usuarioActual?.rol === "admin" && (
          <button
            onClick={() => setModalVerCortesAbierto(true)}
            className="bg-orange-600 text-white px-4 py-2 rounded hover:bg-orange-700 transition text-sm"
          >
            Ver cortes
          </button>)}
        </div>

        {/* Controles debajo de Resumen */}
        <div className="flex flex-wrap items-center gap-2 mb-4">
          <button className="bg-green-600 text-white px-4 py-2 rounded flex items-center gap-2 hover:bg-green-700 transition text-sm">
            <RefreshCw size={16} /> Actualizar
          </button>

          <div className="flex items-center border rounded-lg p-2 bg-white">
            <Calendar className="text-neutral-400 mr-2" size={16} />
            <input
              type="date"
              className="outline-none text-sm"
              value={fecha}
              onChange={(e) => setFecha(e.target.value)}
            />
          </div>
        </div>

        {/* Tabla de Movimientos */}
        <div className="overflow-x-auto bg-white rounded-xl shadow mb-6">
          <table className="w-full text-left">
            <thead className="bg-neutral-200 text-neutral-700">
              <tr>
                <th className="p-3">Tipo</th>
                <th className="p-3">Descripción</th>
                <th className="p-3 text-right">Monto</th>
                <th className="p-3">Forma de pago</th>
                <th className="p-3">Fecha</th>
                <th className="p-3">Hora</th>
              </tr>
            </thead>
            <tbody>
              {movimientosFiltrados.map((m, i) => (
                <tr key={i} className="border-t hover:bg-neutral-50 transition">
                  <td
                    className={`p-3 font-bold ${
                      m.tipo === "ingreso" ? "text-green-600" : "text-red-600"
                    }`}
                  >
                    {m.tipo}
                  </td>
                  <td className="p-3">{m.descripcion}</td>
                  <td className="p-3 text-right">
                    {m.monto >= 0 ? `+ $${m.monto}` : `- $${Math.abs(m.monto)}`}
                  </td>
                  <td className="p-3">{m.formaPago}</td>
                  <td className="p-3">{m.fecha}</td>
                  <td className="p-3">{m.hora}</td>
                </tr>
              ))}
              {movimientosFiltrados.length === 0 && (
                <tr>
                  <td colSpan="6" className="p-6 text-center text-neutral-500">
                    No hay movimientos para esta fecha.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <RegistrarMovimientoModal
          open={modalMovimientoAbierto}
          onClose={() => setModalMovimientoAbierto(false)}
        />
        <RegistrarCorteModal
          open={modalCorteAbierto}
          onClose={() => setModalCorteAbierto(false)}
        />
        <VerCortesModal
          open={modalVerCortesAbierto}
          onClose={() => setModalVerCortesAbierto(false)}
          cortes={cortes}
        />
      </main>
    </>
  );
}

export default CajaPage;
