import { X } from "lucide-react";

function AlertasStockModal({ open, onClose, productos }) {
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

        <h2 className="text-2xl font-bold mb-6 text-neutral-900">
          Productos con stock bajo
        </h2>

        {productos.length === 0 ? (
          <p className="text-neutral-600">No hay productos con stock bajo.</p>
        ) : (
          <ul className="space-y-4">
            {productos.map((p, i) => (
              <li key={i} className="border-b pb-2 flex justify-between items-center">
                <div>
                  <p className="font-medium text-neutral-900">{p.nombre}</p>
                  <p className="text-neutral-600 text-sm">Stock actual: {p.stock}</p>
                </div>
                <p className="text-red-600 font-bold">¡Reponer!</p>
              </li>
            ))}
          </ul>
        )}

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

export default AlertasStockModal;
