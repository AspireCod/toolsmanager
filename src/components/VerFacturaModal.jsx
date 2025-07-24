import { X } from "lucide-react";

function VerFacturaModal({ open, onClose, factura }) {
  if (!open || !factura) return null;

  // Simulación de detalles de factura:
  const productos = [
    { codigo: "CEM001", nombre: "Cemento Gris", cantidad: 5, precio: 150 },
    { codigo: "MAR001", nombre: "Martillo", cantidad: 2, precio: 80 },
  ];

  const subtotal = productos.reduce((acc, p) => acc + p.cantidad * p.precio, 0);
  const impuestos = subtotal * 0.16;
  const total = subtotal + impuestos;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-xl shadow-lg w-full max-w-3xl p-6 relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-neutral-600 hover:text-red-600 transition"
          title="Cerrar"
        >
          <X size={28} />
        </button>

        <h2 className="text-2xl font-bold mb-6 text-neutral-900">
          Detalles de factura #{factura.numero}
        </h2>

        <div className="mb-6">
          <p className="text-neutral-700"><strong>Cliente:</strong> {factura.cliente}</p>
          <p className="text-neutral-700"><strong>Fecha de emisión:</strong> {factura.fecha}</p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left bg-white rounded">
            <thead className="bg-neutral-200 text-neutral-700">
              <tr>
                <th className="p-3">Código</th>
                <th className="p-3">Nombre</th>
                <th className="p-3 text-right">Cantidad</th>
                <th className="p-3 text-right">Precio Unitario</th>
                <th className="p-3 text-right">Total</th>
              </tr>
            </thead>
            <tbody>
              {productos.map((p, i) => (
                <tr key={i} className="border-t hover:bg-neutral-50 transition">
                  <td className="p-3">{p.codigo}</td>
                  <td className="p-3">{p.nombre}</td>
                  <td className="p-3 text-right">{p.cantidad}</td>
                  <td className="p-3 text-right">${p.precio.toFixed(2)}</td>
                  <td className="p-3 text-right">${(p.cantidad * p.precio).toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="bg-neutral-100 p-4 rounded-xl mt-6 max-w-sm ml-auto">
          <div className="flex justify-between mb-2">
            <span>Subtotal:</span>
            <span>${subtotal.toFixed(2)}</span>
          </div>
          <div className="flex justify-between mb-2">
            <span>Impuestos (16%):</span>
            <span>${impuestos.toFixed(2)}</span>
          </div>
          <div className="flex justify-between font-bold text-xl border-t pt-2">
            <span>Total:</span>
            <span>${total.toFixed(2)}</span>
          </div>
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

export default VerFacturaModal;
