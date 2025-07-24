import { useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../../assets/logo.png";

function ActivacionPage() {
  const [codigo, setCodigo] = useState("");
  const navigate = useNavigate();

  const handleActivate = (e) => {
    e.preventDefault();
    if (codigo.trim() !== "") {
      localStorage.setItem("activado", "true");
      navigate("/ventas");
    } else {
      alert("Debes ingresar un código de activación válido.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-neutral-100">
      <div className="bg-white shadow-2xl rounded-2xl p-10 w-full max-w-md">
        <h1 className="text-3xl font-extrabold mb-8 text-center text-neutral-900">
          Activar <span className="text-blue-600">ToolsManager</span>
        </h1>
        <div className="flex justify-center mb-6">
          <img
            src={logo}
            alt="Logo ToolsManager"
            className="h-20 w-20 object-contain"
          />
        </div>

        <form onSubmit={handleActivate} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-neutral-700 mb-2">
              Código de activación
            </label>
            <input
              type="text"
              className="w-full border border-neutral-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
              value={codigo}
              onChange={(e) => setCodigo(e.target.value)}
              placeholder="Ingresa tu código"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold text-lg hover:bg-blue-700 transition"
          >
            Activar
          </button>
        </form>
      </div>
    </div>
  );
}

export default ActivacionPage;
