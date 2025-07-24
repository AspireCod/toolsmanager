import { useState } from "react";
import { X, CheckCircle } from "lucide-react";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

function PagoVentaModal({ open, onClose, total, cliente, productos }) {
  const [formaPago, setFormaPago] = useState("efectivo");
  const [montoPagado, setMontoPagado] = useState(total);
  const [dejarAdeudo, setDejarAdeudo] = useState(false);
  const [imprimirFactura, setImprimirFactura] = useState(false);
  const [mostrarConfirmacion, setMostrarConfirmacion] = useState(false);
  const [mensajePago, setMensajePago] = useState("");

  if (!open) return null;

  const generarFacturaPDF = () => {
    const doc = new jsPDF();
    const fecha = new Date().toLocaleDateString();
    const hora = new Date().toLocaleTimeString();
    const numeroFactura = Date.now();

    doc.setFontSize(18);
    doc.text(`Factura #${numeroFactura}`, 14, 22);

    doc.setFontSize(12);
    doc.text(`Cliente: ${cliente.nombre}`, 14, 32);
    doc.text(`Fecha: ${fecha} ${hora}`, 14, 40);
    doc.text(`Forma de pago: ${formaPago}`, 14, 48);

    const bodyProductos = productos.map((p) => [
      p.codigo || "-",
      p.nombre,
      p.cantidad,
      `$${p.precio.toFixed(2)}`,
      `$${(p.precio * p.cantidad).toFixed(2)}`
    ]);

    autoTable(doc, {
      head: [["Código", "Nombre", "Cantidad", "Precio Unitario", "Total"]],
      body: bodyProductos,
      startY: 60,
      styles: { halign: "right" },
      headStyles: { fillColor: [52, 152, 219], halign: "center" },
      columnStyles: { 0: { halign: "left" }, 1: { halign: "left" } },
    });

    const subtotal = productos.reduce((acc, p) => acc + p.precio * p.cantidad, 0);
    const impuestos = subtotal * 0.16;
    const totalFinal = subtotal + impuestos;

    doc.text(`Subtotal: $${subtotal.toFixed(2)}`, 150, doc.lastAutoTable.finalY + 10, { align: "right" });
    doc.text(`Impuestos (16%): $${impuestos.toFixed(2)}`, 150, doc.lastAutoTable.finalY + 18, { align: "right" });
    doc.setFont(undefined, "bold");
    doc.text(`Total: $${totalFinal.toFixed(2)}`, 150, doc.lastAutoTable.finalY + 28, { align: "right" });

    doc.save(`Factura_${numeroFactura}.pdf`);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (montoPagado < 0) {
      alert("El monto pagado debe ser igual o mayor a 0.");
      return;
    }

    const montoAdeudo = total - montoPagado > 0 ? total - montoPagado : 0;
    const mensaje = `
Pago registrado para ${cliente.nombre}.
Monto pagado: $${montoPagado}
Forma de pago: ${formaPago}
${dejarAdeudo && montoAdeudo > 0 ? `Adeudo registrado: $${montoAdeudo}` : "Sin adeudo."}
    `;
    setMensajePago(mensaje.trim());
    setMostrarConfirmacion(true);

    if (imprimirFactura) {
      generarFacturaPDF();
    }
  };

  return (
    <>
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
        <div className="bg-white rounded-xl shadow-lg w-full max-w-md p-6 relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-neutral-600 hover:text-red-600 transition"
            title="Cerrar"
          >
            <X size={28} />
          </button>

          <h2 className="text-2xl font-bold mb-6 text-neutral-900">Pagar venta</h2>

          <div className="mb-4 text-lg text-neutral-700">
            <p className="mb-1">
              Cliente: <span className="font-semibold text-neutral-900">{cliente.nombre}</span>
            </p>
            <p>
              Total a pagar: <span className="font-bold text-neutral-900">${total.toFixed(2)}</span>
            </p>
          </div>

          <form className="space-y-4" onSubmit={handleSubmit}>
            <div>
              <label className="block text-neutral-700 mb-1">Forma de pago</label>
              <select
                className="w-full border rounded p-2"
                value={formaPago}
                onChange={(e) => setFormaPago(e.target.value)}
              >
                <option value="efectivo">Efectivo</option>
                <option value="tarjeta">Tarjeta</option>
                <option value="transferencia">Transferencia</option>
              </select>
            </div>

            <div>
              <label className="block text-neutral-700 mb-1">Monto pagado</label>
              <input
                type="number"
                className="w-full border rounded p-2"
                placeholder="0.00"
                value={montoPagado}
                onChange={(e) => setMontoPagado(Number(e.target.value))}
              />
            </div>

            <div className="flex flex-col gap-2">
              <label className="flex items-center gap-2 text-neutral-700">
                <input
                  type="checkbox"
                  checked={dejarAdeudo}
                  onChange={() => setDejarAdeudo(!dejarAdeudo)}
                />
                Dejar adeudo por el resto
              </label>

              <label className="flex items-center gap-2 text-neutral-700">
                <input
                  type="checkbox"
                  checked={imprimirFactura}
                  onChange={() => setImprimirFactura(!imprimirFactura)}
                />
                Imprimir factura
              </label>
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
                Confirmar pago
              </button>
            </div>
          </form>
        </div>
      </div>

      {mostrarConfirmacion && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-xl shadow-lg w-full max-w-md p-6 relative animate-bounce-in">
            <button
              onClick={() => {
                setMostrarConfirmacion(false);
                onClose();
              }}
              className="absolute top-4 right-4 text-neutral-600 hover:text-red-600 transition"
              title="Cerrar"
            >
              <X size={28} />
            </button>

            <div className="flex flex-col items-center justify-center mb-6">
              <CheckCircle className="text-green-600 animate-ping-once" size={60} />
              <h2 className="text-2xl font-bold mt-2 text-neutral-900">¡Pago registrado!</h2>
            </div>

            <pre className="whitespace-pre-wrap text-neutral-700 mb-6 text-center">{mensajePago}</pre>

            <div className="flex justify-center">
              <button
                onClick={() => {
                  setMostrarConfirmacion(false);
                  onClose();
                }}
                className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700 transition"
              >
                Cerrar
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default PagoVentaModal;
