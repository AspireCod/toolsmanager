import { X } from "lucide-react";

function VerHistorialModal({ open, onClose, cliente }) {
  if (!open || !cliente) return null;

  // Simulación de historial con datos de ejemplo:
  const historial = [
    {
      fecha: "2023-09-10",
      descripcion: "Pago parcial",
      monto: -500,
      deudaRestante: 2000,
    },
    {
      fecha: "2023-09-15",
      descripcion: "Aumento por compra adicional",
      monto: 1000,
      deudaRestante: 3000,
    },
    {
      fecha: "2023-09-20",
      descripcion: "Pago",
      monto: -500,
      deudaRestante: 2500,
    },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-xl shadow-lg w-full max-w-2xl p-6 relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-neutral-600 hover:text-red-600 transition"
          title="Cerrar"
        >
          <X size={28} />
        </button>

        <h2 className="text-2xl font-bold mb-6 text-neutral-900">
          Historial de {cliente.nombre}
        </h2>

        <div className="overflow-x-auto">
          <table className="w-full text-left bg-white rounded">
            <thead className="bg-neutral-200 text-neutral-700">
              <tr>
                <th className="p-3">Fecha</th>
                <th className="p-3">Descripción</th>
                <th className="p-3 text-right">Monto</th>
                <th className="p-3 text-right">Deuda restante</th>
              </tr>
            </thead>
            <tbody>
              {historial.map((h, i) => (
                <tr key={i} className="border-t hover:bg-neutral-50 transition">
                  <td className="p-3">{h.fecha}</td>
                  <td className="p-3">{h.descripcion}</td>
                  <td
                    className={`p-3 text-right ${
                      h.monto < 0 ? "text-green-600" : "text-red-600"
                    }`}
                  >
                    {h.monto < 0 ? `- $${Math.abs(h.monto)}` : `+ $${h.monto}`}
                  </td>
                  <td className="p-3 text-right">${h.deudaRestante}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="flex justify-end mt-6">
          <button
            onClick={onClose}
            className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition"
          >
            Cerrar
          </button>
        </div>
      </div>
    </div>
  );
}

export default VerHistorialModal;
