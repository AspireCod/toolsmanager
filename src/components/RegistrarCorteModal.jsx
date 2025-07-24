import { useState } from "react";
import { X } from "lucide-react";

function RegistrarCorteModal({ open, onClose }) {
  const [efectivo, setEfectivo] = useState("");
  const [observaciones, setObservaciones] = useState("");

  const sugerencia = 1500; // 🔹 Simula el total esperado en caja

  if (!open) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Corte registrado con efectivo: $${efectivo}\nObservaciones: ${observaciones || "Sin observaciones."}`);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-xl shadow-lg w-full max-w-md p-6 relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-neutral-600 hover:text-red-600 transition"
          title="Cerrar"
        >
          <X size={28} />
        </button>

        <h2 className="text-2xl font-bold mb-6 text-neutral-900">Registrar corte de caja</h2>

        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label className="block text-neutral-700 mb-1">Efectivo en caja</label>
            <div className="flex items-center gap-2">
              <input
                type="number"
                className="w-full border rounded p-2"
                placeholder="Ej: 1000"
                value={efectivo}
                onChange={(e) => setEfectivo(e.target.value)}
              />
              <span
                className="text-neutral-500 text-sm whitespace-nowrap"
                title="Sugerencia basada en movimientos del día"
              >
                Sugerido:{" "}
                <span className="font-semibold text-neutral-900">
                  ${sugerencia.toFixed(2)}
                </span>
              </span>
            </div>
          </div>

          <div>
            <label className="block text-neutral-700 mb-1">Observaciones</label>
            <textarea
              className="w-full border rounded p-2"
              placeholder="Detalles u observaciones del corte..."
              value={observaciones}
              onChange={(e) => setObservaciones(e.target.value)}
            />
          </div>

          <div className="flex justify-end gap-4 mt-6">
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-300 text-neutral-700 px-6 py-2 rounded hover:bg-gray-400 transition"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700 transition"
            >
              Guardar corte
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default RegistrarCorteModal;
