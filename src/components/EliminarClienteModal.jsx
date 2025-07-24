import { X } from "lucide-react";

function EliminarClienteModal({ open, onClose, cliente }) {
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

        <h2 className="text-2xl font-bold mb-6 text-neutral-900">Eliminar cliente</h2>

        <p className="text-neutral-700 mb-6">
          ¿Estás seguro de que quieres eliminar al cliente{" "}
          <span className="font-semibold text-neutral-900">{cliente.nombre}</span>?
          Esta acción no se puede deshacer.
        </p>

        <div className="flex justify-end gap-4">
          <button
            onClick={onClose}
            className="bg-gray-300 text-neutral-700 px-6 py-2 rounded hover:bg-gray-400 transition"
          >
            Cancelar
          </button>
          <button
            onClick={() => {
              alert(`Cliente "${cliente.nombre}" eliminado.`);
              onClose();
            }}
            className="bg-red-600 text-white px-6 py-2 rounded hover:bg-red-700 transition"
          >
            Eliminar
          </button>
        </div>
      </div>
    </div>
  );
}

export default EliminarClienteModal;
