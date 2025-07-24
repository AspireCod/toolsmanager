import { useState } from "react";
import Sidebar from "../../components/Sidebar";
import { useNavigate } from "react-router-dom";
import { X } from "lucide-react";

function ConfiguracionPage() {
  const [usuarioSeleccionado, setUsuarioSeleccionado] = useState(null);
  const [usuarioAEliminar, setUsuarioAEliminar] = useState(null);

  const [sidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate();
  const numeroFactura = 1001;

  const [usuarioActual, setUsuarioActual] = useState(
    JSON.parse(localStorage.getItem("usuarioActual"))
  );
  const [permitirRegistro, setPermitirRegistro] = useState(true);

  // Datos del negocio simulados
  const [datosNegocio, setDatosNegocio] = useState({
    nombre: "Mi Ferretería",
    direccion: "Av. Principal 123",
    telefono: "555-000-1111",
    rfc: "FER010203ABC",
    impuesto: 16,
    leyenda:
      "Gracias por su compra. No se aceptan devoluciones después de 15 días.",
  });

  const [usuarios, setUsuarios] = useState([
    { id: 1, nombre: "Leonardo", rol: "admin" },
    { id: 2, nombre: "Carlos", rol: "empleado" },
  ]);

  const handleGuardarNegocio = () => {
    alert("Datos del negocio guardados correctamente.");
  };

  const handleLogin = () => {
    localStorage.setItem(
      "usuarioActual",
      JSON.stringify({ nombre: "Leonardo", rol: "admin" })
    );
    setUsuarioActual({ nombre: "Leonardo", rol: "admin" });
  };

  const handleLogout = () => {
    localStorage.removeItem("usuarioActual");
    setUsuarioActual(null);
  };

  return (
    <>
      <Sidebar
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
        numeroFactura={numeroFactura}
        navigate={navigate}
      />

      <main className="pt-16 p-6 min-h-screen bg-neutral-100">
        <h1 className="text-3xl font-bold text-neutral-900 mb-6">
          Configuración
        </h1>

        {/* Autenticación */}
{/* Autenticación */}
<div className="bg-white rounded-xl shadow p-6 mb-6">
  <h2 className="text-2xl font-bold text-neutral-800 mb-4">Autenticación</h2>

  {!usuarioActual ? (
    <div className="space-y-4">
      <p className="text-neutral-700">
        Inicia sesión para acceder al sistema.
      </p>

      <input
        type="email"
        placeholder="Correo electrónico"
        className="w-full border rounded p-2"
        defaultValue="leonardoespinozamares@gmail.com"
        id="emailInput"
      />
      <input
        type="password"
        placeholder="Contraseña"
        className="w-full border rounded p-2"
        defaultValue="123456"
        id="passwordInput"
      />
      <button
        onClick={() => {
          const email = document.getElementById("emailInput").value;
          const password = document.getElementById("passwordInput").value;

          if (email === "leonardoespinozamares@gmail.com" && password === "123456") {
            const nuevoUsuario = { nombre: "Leonardo", rol: "admin", email };
            localStorage.setItem("usuarioActual", JSON.stringify(nuevoUsuario));
            setUsuarioActual(nuevoUsuario);
          } else {
            alert("Correo o contraseña incorrectos.");
          }
        }}
        className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition"
      >
        Iniciar sesión
      </button>
    </div>
  ) : (
    <div className="space-y-4">
      <p className="text-neutral-700">
        Sesión iniciada como:{" "}
        <span className="font-bold">
          {usuarioActual.nombre} ({usuarioActual.rol})
        </span>
      </p>
      <p className="text-neutral-700">
        Correo: <span className="font-medium">{usuarioActual.email}</span>
      </p>

      <div className="flex gap-4 flex-wrap">
        <button
          onClick={handleLogout}
          className="bg-red-600 text-white px-6 py-2 rounded hover:bg-red-700 transition"
        >
          Cerrar sesión
        </button>
      </div>
    </div>
  )}

</div>


        {/* Datos del negocio */}
        <div className="bg-white rounded-xl shadow p-6 mb-6">
          <h2 className="text-2xl font-bold text-neutral-800 mb-4">
            Datos del negocio
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              type="text"
              className="border rounded p-2"
              placeholder="Nombre de la ferretería"
              value={datosNegocio.nombre}
              onChange={(e) =>
                setDatosNegocio({ ...datosNegocio, nombre: e.target.value })
              }
            />
            <input
              type="text"
              className="border rounded p-2"
              placeholder="Dirección"
              value={datosNegocio.direccion}
              onChange={(e) =>
                setDatosNegocio({ ...datosNegocio, direccion: e.target.value })
              }
            />
            <input
              type="text"
              className="border rounded p-2"
              placeholder="Teléfono"
              value={datosNegocio.telefono}
              onChange={(e) =>
                setDatosNegocio({ ...datosNegocio, telefono: e.target.value })
              }
            />
            <input
              type="text"
              className="border rounded p-2"
              placeholder="RFC"
              value={datosNegocio.rfc}
              onChange={(e) =>
                setDatosNegocio({ ...datosNegocio, rfc: e.target.value })
              }
            />
            <input
              type="number"
              className="border rounded p-2"
              placeholder="Impuesto %"
              value={datosNegocio.impuesto}
              onChange={(e) =>
                setDatosNegocio({
                  ...datosNegocio,
                  impuesto: Number(e.target.value),
                })
              }
            />
            <textarea
              className="border rounded p-2 md:col-span-2"
              placeholder="Leyenda de ticket o factura"
              value={datosNegocio.leyenda}
              onChange={(e) =>
                setDatosNegocio({ ...datosNegocio, leyenda: e.target.value })
              }
            />
          </div>
          <div className="flex justify-end mt-4">
            <button
              onClick={handleGuardarNegocio}
              disabled={usuarioActual?.rol !== "admin"}
              className={`${
                usuarioActual?.rol !== "admin"
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-green-600 hover:bg-green-700"
              } text-white px-6 py-2 rounded transition`}
            >
              Guardar cambios
            </button>
          </div>
        </div>

        {/* Seguridad */}
        {usuarioActual?.rol === "admin" && (
  <div className="bg-white rounded-xl shadow p-6 mb-6">
    <h2 className="text-2xl font-bold text-neutral-800 mb-4">Seguridad</h2>
    <label className="flex items-center gap-2 text-neutral-700">
      <input
        type="checkbox"
        checked={permitirRegistro}
        onChange={() => setPermitirRegistro(!permitirRegistro)}
      />
      Permitir registro de nuevos usuarios
    </label>
  </div>
)}


        {/* Administración avanzada (solo para admin) */}
{usuarioActual?.rol === "admin" && (
  <div className="bg-white rounded-xl shadow p-6">
    <div className="flex items-center justify-between mb-4">
      <h2 className="text-2xl font-bold text-neutral-800">Administración de usuarios</h2>
      <button
        onClick={() => setUsuarioSeleccionado({ nombre: "", email: "", rol: "empleado" })}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition text-sm"
      >
        Agregar usuario
      </button>
    </div>

    <table className="w-full text-left">
      <thead className="bg-neutral-200 text-neutral-700">
        <tr>
          <th className="p-3">Nombre</th>
          <th className="p-3">Rol</th>
          <th className="p-3 text-center">Acciones</th>
        </tr>
      </thead>
      <tbody>
        {usuarios.map((u) => (
          <tr key={u.id} className="border-t hover:bg-neutral-50 transition">
            <td className="p-3">{u.nombre}</td>
            <td className="p-3 capitalize">{u.rol}</td>
            <td className="p-3 text-center">
              <button
                onClick={() => setUsuarioSeleccionado(u)}
                className="text-blue-500 hover:text-blue-700 transition mr-3"
              >
                Cambiar rol
              </button>
              <button
                onClick={() => setUsuarioAEliminar(u)}
                className="text-red-500 hover:text-red-700 transition"
              >
                Eliminar
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>

    {/* Modal Agregar o Editar Usuario */}
    {usuarioSeleccionado && (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
        <div className="bg-white rounded-xl shadow-lg w-full max-w-md p-6 relative">
          <button
            onClick={() => setUsuarioSeleccionado(null)}
            className="absolute top-4 right-4 text-neutral-600 hover:text-red-600 transition"
          >
            <X size={28} />
          </button>

          <h2 className="text-2xl font-bold mb-4 text-neutral-900">
            {usuarioSeleccionado.id ? "Editar usuario" : "Agregar usuario"}
          </h2>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              if (!usuarioSeleccionado.nombre || !usuarioSeleccionado.email) {
                alert("Completa todos los campos.");
                return;
              }
              if (usuarioSeleccionado.id) {
                // Edición existente
                setUsuarios(usuarios.map((u) =>
                  u.id === usuarioSeleccionado.id ? usuarioSeleccionado : u
                ));
              } else {
                // Nuevo usuario
                setUsuarios([...usuarios, {
                  ...usuarioSeleccionado,
                  id: Date.now(),
                }]);
              }
              setUsuarioSeleccionado(null);
            }}
            className="space-y-4"
          >
            <div>
              <label className="block text-neutral-700 mb-1">Nombre</label>
              <input
                type="text"
                className="w-full border rounded p-2"
                value={usuarioSeleccionado.nombre}
                onChange={(e) =>
                  setUsuarioSeleccionado({ ...usuarioSeleccionado, nombre: e.target.value })
                }
              />
            </div>

            <div>
              <label className="block text-neutral-700 mb-1">Correo electrónico</label>
              <input
                type="email"
                className="w-full border rounded p-2"
                value={usuarioSeleccionado.email}
                onChange={(e) =>
                  setUsuarioSeleccionado({ ...usuarioSeleccionado, email: e.target.value })
                }
              />
            </div>

            <div>
              <label className="block text-neutral-700 mb-1">Rol</label>
              <select
                className="w-full border rounded p-2"
                value={usuarioSeleccionado.rol}
                onChange={(e) =>
                  setUsuarioSeleccionado({ ...usuarioSeleccionado, rol: e.target.value })
                }
              >
                <option value="admin">Admin</option>
                <option value="empleado">Empleado</option>
              </select>
            </div>

            <div className="flex justify-end gap-4 mt-6">
              <button
                type="button"
                onClick={() => setUsuarioSeleccionado(null)}
                className="bg-gray-300 text-neutral-700 px-6 py-2 rounded hover:bg-gray-400 transition"
              >
                Cancelar
              </button>
              <button
                type="submit"
                className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700 transition"
              >
                {usuarioSeleccionado.id ? "Guardar cambios" : "Agregar usuario"}
              </button>
            </div>
          </form>
        </div>
      </div>
    )}

    {/* Modal Eliminar Usuario */}
    {usuarioAEliminar && (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
        <div className="bg-white rounded-xl shadow-lg w-full max-w-md p-6 relative">
          <button
            onClick={() => setUsuarioAEliminar(null)}
            className="absolute top-4 right-4 text-neutral-600 hover:text-red-600 transition"
          >
            <X size={28} />
          </button>

          <h2 className="text-2xl font-bold mb-4 text-neutral-900">Eliminar usuario</h2>
          <p className="mb-6 text-neutral-700">
            ¿Seguro que deseas eliminar al usuario{" "}
            <span className="font-semibold">{usuarioAEliminar.nombre}</span>?
          </p>

          <div className="flex justify-end gap-4">
            <button
              onClick={() => setUsuarioAEliminar(null)}
              className="bg-gray-300 text-neutral-700 px-6 py-2 rounded hover:bg-gray-400 transition"
            >
              Cancelar
            </button>
            <button
              onClick={() => {
                setUsuarios(usuarios.filter((u) => u.id !== usuarioAEliminar.id));
                setUsuarioAEliminar(null);
              }}
              className="bg-red-600 text-white px-6 py-2 rounded hover:bg-red-700 transition"
            >
              Eliminar
            </button>
          </div>
        </div>
      </div>
    )}
  </div>
)}

      </main>
    </>
  );
}

export default ConfiguracionPage;
