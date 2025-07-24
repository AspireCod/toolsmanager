import { useState } from "react";
import Sidebar from "../../components/Sidebar";
import cementoImg from "../../assets/cemento.jpg";
import martilloImg from "../../assets/martillo.jpg";
import metroImg from "../../assets/metro.jpg";
import { Pencil, Trash2, X } from "lucide-react"; // 👈 importa los íconos al inicio
import { useNavigate } from "react-router-dom";
import PagoVentaModal from "../../components/PagoVentaModal";


function VentasPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [modalPagoAbierto, setModalPagoAbierto] = useState(false);
  const [modalCancelarAbierto, setModalCancelarAbierto] = useState(false);




  const clientes = [
    { id: 1, nombre: "Cliente General" },
    { id: 2, nombre: "Construcciones Zamora" },
    { id: 3, nombre: "Ferretería del Centro" },
  ];
  const [clienteSeleccionado, setClienteSeleccionado] = useState(clientes[0]);
  const [numeroFactura, setNumeroFactura] = useState(1001);
  // Catálogo de productos simulados
  const catalogo = [
    {
      codigo: "CEM001",
      nombre: "Cemento",
      precio: 150,
      stock: 20,
      imagen: cementoImg,
    },
    {
      codigo: "MAR001",
      nombre: "Martillo",
      precio: 80,
      stock: 15,
      imagen: martilloImg,
    },
    {
      codigo: "MET001",
      nombre: "Metro",
      precio: 25,
      stock: 30,
      imagen: metroImg,
    },
  ];

  const [codigo, setCodigo] = useState("");
  const [productos, setProductos] = useState([]);

  const handleBuscarProducto = (e) => {
    e.preventDefault();
    if (!codigo.trim()) return;

    const productoCatalogo = catalogo.find(
      (p) => p.codigo.toUpperCase() === codigo.trim().toUpperCase()
    );

    if (!productoCatalogo) {
      alert("Producto no encontrado");
      return;
    }

    const existente = productos.find(
      (p) => p.codigo === productoCatalogo.codigo
    );

    if (existente) {
      const actualizado = productos.map((p) =>
        p.codigo === productoCatalogo.codigo
          ? {
              ...p,
              cantidad: p.cantidad + 1,
            }
          : p
      );
      setProductos(actualizado);
    } else {
      setProductos([...productos, { ...productoCatalogo, cantidad: 1 }]);
    }

    setCodigo("");
  };

  const subtotal = productos.reduce((acc, p) => acc + p.precio * p.cantidad, 0);
  const impuestos = subtotal * 0.16;
  const total = subtotal + impuestos;
  const navigate = useNavigate();
  return (
      <>
    <Sidebar
      sidebarOpen={sidebarOpen}
      setSidebarOpen={setSidebarOpen}
      numeroFactura={numeroFactura}
      navigate={navigate}
    />

    <main className="pt-16 p-6"> {/* Ajusta el contenido principal */}
    <div className="min-h-screen flex flex-col bg-neutral-100 p-8">

      {/* Buscador */}
      <form onSubmit={handleBuscarProducto} className="flex gap-4 mb-4">
        <input
          type="text"
          className="flex-1 border border-neutral-300 p-4 rounded-lg text-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
          placeholder="Ingresa el código del producto (ej. CEM001)"
          value={codigo}
          onChange={(e) => setCodigo(e.target.value)}
        />
        <button
          type="submit"
          className="bg-blue-600 text-white px-6 rounded-lg text-lg hover:bg-blue-700 transition"
        >
          Agregar
        </button>
      </form>
      <div className="flex justify-between items-center mb-4">
  <div className="flex items-center gap-4">
    <label className="font-medium text-neutral-700">Cliente:</label>
    <select
      className="border border-neutral-300 rounded-lg p-2 text-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
      value={clienteSeleccionado.id}
      onChange={(e) =>
        setClienteSeleccionado(
          clientes.find((c) => c.id === Number(e.target.value))
        )
      }
    >
      {clientes.map((cliente) => (
        <option key={cliente.id} value={cliente.id}>
          {cliente.nombre}
        </option>
      ))}
    </select>
  </div>

  <div className="text-right font-semibold text-neutral-700">
    Número de Factura: <span className="text-neutral-900">{numeroFactura}</span>
  </div>
</div>


      {/* Tabla de productos */}
      <div className="overflow-x-auto mb-4">
        <table className="w-full bg-white rounded-xl shadow">
          <thead className="bg-neutral-200 text-neutral-700">
            <tr>
              <th className="p-2 text-left">Imagen</th>
              <th className="p-2 text-left">Código</th>
              <th className="p-2 text-left">Nombre</th>
              <th className="p-2 text-right">Cantidad</th>
              <th className="p-2 text-right">Precio Unitario</th>
              <th className="p-2 text-right">Total</th>
              <th className="p-2 text-center w-24">
                {" "}
                {/* dejamos espacio fijo pero vacía */}
                {/* Opciones */}
              </th>
            </tr>
          </thead>

          <tbody>
            {productos.map((p, idx) => (
              <tr
                key={p.codigo}
                className="border-t group hover:bg-neutral-100 transition relative"
              >
                <td className="p-2">
                  <img
                    src={p.imagen}
                    alt={p.nombre}
                    className="h-20 w-20 object-contain"
                  />
                </td>
                <td className="p-2">{p.codigo}</td>
                <td className="p-2">{p.nombre}</td>
                <td
                  className="p-2 text-right cursor-pointer select-none"
                  onClick={() => {
                    const actualizado = productos.map((prod, i) =>
                      i === idx ? { ...prod, editando: true } : prod
                    );
                    setProductos(actualizado);
                  }}
                >
                  {p.editando ? (
                    <input
                      type="number"
                      className="w-20 border rounded text-right p-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      value={p.cantidad}
                      onChange={(e) => {
                        const actualizado = productos.map((prod, i) =>
                          i === idx
                            ? { ...prod, cantidad: Number(e.target.value) }
                            : prod
                        );
                        setProductos(actualizado);
                      }}
                      onBlur={() => {
                        const actualizado = productos.map((prod, i) =>
                          i === idx ? { ...prod, editando: false } : prod
                        );
                        setProductos(actualizado);
                      }}
                      autoFocus
                    />
                  ) : (
                    p.cantidad
                  )}
                </td>
                <td className="p-2 text-right">${p.precio.toFixed(2)}</td>
                <td className="p-2 text-right">
                  ${(p.precio * p.cantidad).toFixed(2)}
                </td>
                <td className="p-2 hidden group-hover:table-cell">
                  <div className="flex gap-3 justify-center">
                    <button
                      onClick={() => {
                        const actualizado = productos.map((prod, i) =>
                          i === idx ? { ...prod, editando: true } : prod
                        );
                        setProductos(actualizado);
                      }}
                      className="text-blue-500 hover:text-blue-700 transition"
                      title="Editar cantidad"
                    >
                      <Pencil size={28} />
                    </button>
                    <button
                      onClick={() => {
                        setProductos(productos.filter((_, i) => i !== idx));
                      }}
                      className="text-red-500 hover:text-red-700 transition"
                      title="Eliminar producto"
                    >
                      <Trash2 size={28} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
            {productos.length === 0 && (
              <tr>
                <td colSpan="7" className="p-4 text-center text-neutral-500">
                  No hay productos agregados.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Totales */}
      <div className="bg-white p-4 rounded-xl shadow mb-4 w-full max-w-md self-end">
        <div className="flex justify-between mb-2">
          <span className="text-neutral-700">Subtotal:</span>
          <span className="font-medium">${subtotal.toFixed(2)}</span>
        </div>
        <div className="flex justify-between mb-2">
          <span className="text-neutral-700">Impuestos (16%):</span>
          <span className="font-medium">${impuestos.toFixed(2)}</span>
        </div>
        <div className="flex justify-between font-bold text-xl border-t pt-2 text-neutral-900">
          <span>Total a Pagar:</span>
          <span>${total.toFixed(2)}</span>
        </div>
      </div>

      {/* Botones */}
      <div className="flex gap-4 self-end">
        <button
  onClick={() => setModalPagoAbierto(true)}
  className="bg-green-600 text-white py-4 px-8 rounded-lg text-lg hover:bg-green-700 transition"
>
  Pagar
</button>
       <button
  onClick={() => setModalCancelarAbierto(true)}
  className="bg-red-600 text-white py-4 px-8 rounded-lg text-lg hover:bg-red-700 transition"
>
  Cancelar Venta
</button>


      </div>
    </div>
    <PagoVentaModal
  open={modalPagoAbierto}
  onClose={() => setModalPagoAbierto(false)}
  total={total}
  cliente={clienteSeleccionado}
  productos={productos}
/>
{modalCancelarAbierto && (
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
    <div className="bg-white rounded-xl shadow-lg w-full max-w-md p-6 relative">
      <button
        onClick={() => setModalCancelarAbierto(false)}
        className="absolute top-4 right-4 text-neutral-600 hover:text-red-600 transition"
        title="Cerrar"
      >
        <X size={28} />
      </button>

      <h2 className="text-2xl font-bold mb-4 text-neutral-900">Confirmar cancelación</h2>
      <p className="text-neutral-700 mb-6">¿Estás seguro de que deseas cancelar la venta actual? Todos los productos seleccionados se eliminarán y el cliente se restablecerá a "Cliente General".</p>

      <div className="flex justify-end gap-4">
        <button
          onClick={() => setModalCancelarAbierto(false)}
          className="bg-gray-300 text-neutral-700 px-6 py-2 rounded hover:bg-gray-400 transition"
        >
          No, volver
        </button>
        <button
          onClick={() => {
            setProductos([]);
            setClienteSeleccionado(clientes[0]);
            setModalCancelarAbierto(false);
          }}
          className="bg-red-600 text-white px-6 py-2 rounded hover:bg-red-700 transition"
        >
          Sí, cancelar venta
        </button>
      </div>
    </div>
  </div>
)}


       </main>
  </>
  );
}

export default VentasPage;
