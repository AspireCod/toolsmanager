import { X } from "lucide-react";

function RegistrarMovimientoModal({ open, onClose }) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-xl shadow-lg w-full max-w-lg p-6 relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-neutral-600 hover:text-red-600 transition"
          title="Cerrar"
        >
          <X size={28} />
        </button>

        <h2 className="text-2xl font-bold mb-6 text-neutral-900">Registrar movimiento manual</h2>

        <form className="space-y-4">
          <div>
            <label className="block text-neutral-700 mb-1">Tipo de movimiento</label>
            <select className="w-full border rounded p-2">
              <option value="ingreso">Ingreso</option>
              <option value="egreso">Egreso</option>
            </select>
          </div>

          <div>
            <label className="block text-neutral-700 mb-1">Monto</label>
            <input type="number" className="w-full border rounded p-2" placeholder="0.00" />
          </div>

          <div>
            <label className="block text-neutral-700 mb-1">Descripción</label>
            <textarea className="w-full border rounded p-2" placeholder="Descripción del movimiento..." />
          </div>

          <div>
            <label className="block text-neutral-700 mb-1">Forma de pago</label>
            <select className="w-full border rounded p-2">
              <option value="efectivo">Efectivo</option>
              <option value="transferencia">Transferencia</option>
              <option value="tarjeta">Tarjeta</option>
            </select>
          </div>

          <div className="flex justify-end">
            <button
              type="submit"
              className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700 transition"
            >
              Registrar movimiento
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default RegistrarMovimientoModal;
