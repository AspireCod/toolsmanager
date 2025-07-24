import { useState } from "react";
import { X } from "lucide-react";

function AgregarClienteModal({ open, onClose }) {
  const [cliente, setCliente] = useState({
    nombre: "",
    telefono: "",
    direccion: "",
    detalles: "",
  });

  if (!open) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCliente((prev) => ({ ...prev, [name]: value }));
  };

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

        <h2 className="text-2xl font-bold mb-6 text-neutral-900">Agregar nuevo cliente</h2>

        <form className="space-y-4">
          <div>
            <label className="block text-neutral-700 mb-1">Nombre</label>
            <input
              type="text"
              name="nombre"
              className="w-full border rounded p-2"
              placeholder="Ej: Juan Pérez"
              value={cliente.nombre}
              onChange={handleChange}
            />
          </div>

          <div>
            <label className="block text-neutral-700 mb-1">Teléfono</label>
            <input
              type="text"
              name="telefono"
              className="w-full border rounded p-2"
              placeholder="555-000-0000"
              value={cliente.telefono}
              onChange={handleChange}
            />
          </div>

          <div>
            <label className="block text-neutral-700 mb-1">Dirección</label>
            <input
              type="text"
              name="direccion"
              className="w-full border rounded p-2"
              placeholder="Calle Ejemplo 123"
              value={cliente.direccion}
              onChange={handleChange}
            />
          </div>

          <div>
            <label className="block text-neutral-700 mb-1">Detalles extra</label>
            <textarea
              name="detalles"
              className="w-full border rounded p-2"
              placeholder="Observaciones..."
              value={cliente.detalles}
              onChange={handleChange}
            />
          </div>
        </form>

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
            className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition"
            onClick={() => {
              alert(`Cliente "${cliente.nombre}" agregado.`);
              onClose();
            }}
          >
            Guardar cliente
          </button>
        </div>
      </div>
    </div>
  );
}

export default AgregarClienteModal;
