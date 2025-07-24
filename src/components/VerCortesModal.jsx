import { useState, useEffect } from "react";
import { X, Calendar } from "lucide-react";

function VerCortesModal({ open, onClose, cortes }) {
  const [filtroSemana, setFiltroSemana] = useState("");

  useEffect(() => {
    if (open) {
      const hoy = new Date();
      const año = hoy.getFullYear();
      const primeraSemana = new Date(año, 0, 1);
      const dias = Math.floor((hoy - primeraSemana) / 86400000);
      const semanaActual = Math.ceil((dias + primeraSemana.getDay() + 1) / 7);
      setFiltroSemana(`${año}-W${semanaActual.toString().padStart(2, "0")}`);
    }
  }, [open]);

  if (!open) return null;

  const cortesFiltrados = cortes.filter((c) => {
    const fechaCorte = new Date(c.fechaHora.replace(" ", "T"));
    const [anioFiltro, semanaFiltro] = filtroSemana.split("-W");
    const anioCorte = fechaCorte.getFullYear();

    const diaInicioAnio = new Date(anioCorte, 0, 1);
    const diasTranscurridos = (fechaCorte - diaInicioAnio) / 86400000;
    const semanaCorte = Math.ceil((diasTranscurridos + diaInicioAnio.getDay() + 1) / 7);

    return (
      anioCorte.toString() === anioFiltro &&
      semanaCorte.toString() === semanaFiltro
    );
  });

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

        <h2 className="text-2xl font-bold mb-4 text-neutral-900">Historial de cortes</h2>

        <div className="flex items-center gap-2 mb-4">
          <div className="flex items-center border rounded-lg p-2 bg-white">
            <Calendar className="text-neutral-400 mr-2" size={20} />
            <input
              type="week"
              className="outline-none text-sm"
              value={filtroSemana}
              onChange={(e) => setFiltroSemana(e.target.value)}
            />
          </div>
        </div>

        {cortesFiltrados.length === 0 ? (
          <p className="text-neutral-600">No hay cortes para la semana seleccionada.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left bg-white rounded">
              <thead className="bg-neutral-200 text-neutral-700">
                <tr>
                  <th className="p-3">Fecha y hora</th>
                  <th className="p-3 text-right">Efectivo registrado</th>
                  <th className="p-3">Observaciones</th>
                </tr>
              </thead>
              <tbody>
                {cortesFiltrados.map((c, i) => (
                  <tr key={i} className="border-t hover:bg-neutral-50 transition">
                    <td className="p-3">{c.fechaHora}</td>
                    <td className="p-3 text-right">${c.efectivo}</td>
                    <td className="p-3">{c.observaciones || "Sin observaciones."}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
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

export default VerCortesModal;
