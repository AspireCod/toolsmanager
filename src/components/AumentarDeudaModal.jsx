import { useState, useEffect } from "react";
import { X } from "lucide-react";

function AumentarDeudaModal({ open, onClose, cliente }) {
  const [monto, setMonto] = useState("");
  const [razon, setRazon] = useState("");

  useEffect(() => {
    setMonto("");
    setRazon("");
  }, [cliente]);

  if (!open || !cliente) return null;

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

        <h2 className="text-2xl font-bold mb-6 text-neutral-900">Aumentar deuda de {cliente.nombre}</h2>

        <form className="space-y-4">
          <div>
            <label className="block text-neutral-700 mb-1">Monto a aumentar</label>
            <input
              type="number"
              className="w-full border rounded p-2"
              placeholder="Ej: 1000"
              value={monto}
              onChange={(e) => setMonto(e.target.value)}
            />
          </div>

          <div>
            <label className="block text-neutral-700 mb-1">Razón u observación</label>
            <textarea
              className="w-full border rounded p-2"
              placeholder="Ej: Compra adicional de materiales"
              value={razon}
              onChange={(e) => setRazon(e.target.value)}
            />
          </div>
        </form>

        <div className="flex justify-end gap-4 mt-6">
          <button
            onClick={onClose}
            className="bg-gray-300 text-neutral-700 px-6 py-2 rounded hover:bg-gray-400 transition"
          >
            Cancelar
          </button>
          <button
            onClick={() => {
              alert(`Deuda de ${cliente.nombre} aumentada en $${monto}.\nRazón: ${razon || "Sin razón"}`);
              onClose();
            }}
            className="bg-orange-600 text-white px-6 py-2 rounded hover:bg-orange-700 transition"
          >
            Aumentar deuda
          </button>
        </div>
      </div>
    </div>
  );
}

export default AumentarDeudaModal;
