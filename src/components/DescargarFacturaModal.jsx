import { X } from "lucide-react";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

function DescargarFacturaModal({ open, onClose, factura }) {
  if (!open || !factura) return null;

  const generarPDF = () => {
    const doc = new jsPDF();

    // Título
    doc.setFontSize(18);
    doc.text(`Factura #${factura.numero}`, 14, 22);

    // Datos del cliente
    doc.setFontSize(12);
    doc.text(`Cliente: ${factura.cliente}`, 14, 32);
    doc.text(`Fecha de emisión: ${factura.fecha}`, 14, 40);

    // Productos simulados
    const productos = [
      ["CEM001", "Cemento Gris", 5, "$150", "$750"],
      ["MAR001", "Martillo", 2, "$80", "$160"],
    ];

    autoTable(doc, {
      head: [["Código", "Nombre", "Cantidad", "Precio Unitario", "Total"]],
      body: productos,
      startY: 50,
      styles: { halign: "right" },
      headStyles: { fillColor: [52, 152, 219], halign: "center" },
      columnStyles: {
        0: { halign: "left" },
        1: { halign: "left" },
      },
    });

    // Totales simulados
    const subtotal = 910; // ejemplo
    const impuestos = subtotal * 0.16;
    const total = subtotal + impuestos;

    doc.text(`Subtotal: $${subtotal.toFixed(2)}`, 150, doc.lastAutoTable.finalY + 10, { align: "right" });
    doc.text(`Impuestos (16%): $${impuestos.toFixed(2)}`, 150, doc.lastAutoTable.finalY + 18, { align: "right" });
    doc.setFont(undefined, "bold");
    doc.text(`Total: $${total.toFixed(2)}`, 150, doc.lastAutoTable.finalY + 28, { align: "right" });

    // Guardar archivo
    doc.save(`Factura_${factura.numero}.pdf`);
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

        <h2 className="text-2xl font-bold mb-6 text-neutral-900">Descargar factura</h2>

        <p className="text-neutral-700 mb-6">
          ¿Deseas descargar la factura{" "}
          <span className="font-semibold text-neutral-900">#{factura.numero}</span>{" "}
          para el cliente{" "}
          <span className="font-semibold text-neutral-900">{factura.cliente}</span>?
        </p>

        <div className="flex justify-end gap-4">
          <button
            onClick={onClose}
            className="bg-gray-300 text-neutral-700 px-6 py-2 rounded hover:bg-gray-400 transition"
          >
            Cancelar
          </button>
          <button
            onClick={generarPDF}
            className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700 transition"
          >
            Descargar PDF
          </button>
        </div>
      </div>
    </div>
  );
}

export default DescargarFacturaModal;
