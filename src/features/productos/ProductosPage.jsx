import { useState } from "react";
import Sidebar from "../../components/Sidebar";
import { Pencil, Trash2, Search, Plus } from "lucide-react";
import { useNavigate } from "react-router-dom";
import cementoImg from "../../assets/cemento.jpg";
import martilloImg from "../../assets/martillo.jpg";
import metroImg from "../../assets/metro.jpg";
import AgregarProductoModal from "../../components/AgregarProductoModal";
import EditarProductoModal from "../../components/EditarProductoModal";



function ProductosPage() {
  const [modalEliminarAbierto, setModalEliminarAbierto] = useState(false);
const [productoAEliminar, setProductoAEliminar] = useState(null);

  const [sidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate();
  const numeroFactura = 1001; // para mostrar en el header igual que en ventas
  const [modalAbierto, setModalAbierto] = useState(false);


  const [busqueda, setBusqueda] = useState("");
  const productos = [
    {
      id: 1,
      imagen: cementoImg,
      codigo: "CEM001",
      nombre: "Cemento Gris",
      categoria: "Material",
      stock: 2,
      precio: 150,
    },
    {
      id: 2,
      imagen: martilloImg,
      codigo: "MAR001",
      nombre: "Martillo",
      categoria: "Herramienta",
      stock: 1,
      precio: 80,
    },
  ];

  const productosFiltrados = productos.filter((p) =>
    p.nombre.toLowerCase().includes(busqueda.toLowerCase())
  );
  const [modalEditarAbierto, setModalEditarAbierto] = useState(false);


  return (
    <>
      <Sidebar
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
        numeroFactura={numeroFactura}
        navigate={navigate}
      />

      <main className="pt-16 p-6 min-h-screen bg-neutral-100">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
          <h1 className="text-3xl font-bold text-neutral-900">Productos</h1>

          <div className="flex items-center gap-2 w-full md:w-auto">
            <div className="relative flex-1 md:flex-none">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400" size={20} />
              <input
                type="text"
                placeholder="Buscar productos..."
                className="w-full border rounded-lg pl-10 pr-4 py-2 text-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={busqueda}
                onChange={(e) => setBusqueda(e.target.value)}
              />
            </div>
            <button onClick={() => setModalAbierto(true)} className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-blue-700 transition">
              <Plus size={20} /> <span>Agregar producto</span>
            </button>
          </div>
        </div>

        <div className="overflow-x-auto bg-white rounded-xl shadow">
          <table className="w-full text-left">
            <thead className="bg-neutral-200 text-neutral-700">
              <tr>
                <th className="p-3">Imagen</th>
                <th className="p-3">Código</th>
                <th className="p-3">Nombre</th>
                <th className="p-3">Categoría</th>
                <th className="p-3 text-right">Stock</th>
                <th className="p-3 text-right">Precio</th>
                <th className="p-3 text-center w-24"></th>
              </tr>
            </thead>
            <tbody>
              {productosFiltrados.map((p) => (
                <tr key={p.id} className="border-t hover:bg-neutral-50 transition group relative">
                  <td className="p-3">
                    <img src={p.imagen} alt={p.nombre} className="h-20 w-20 object-contain rounded" />
                  </td>
                  <td className="p-3">{p.codigo}</td>
                  <td className="p-3">{p.nombre}</td>
                  <td className="p-3">{p.categoria}</td>
                  <td className="p-3 text-right">{p.stock}</td>
                  <td className="p-3 text-right">${p.precio.toFixed(2)}</td>
                  <td className="p-3 hidden group-hover:table-cell">
                    <div className="flex gap-3 justify-center">
                      <button onClick={() => setModalEditarAbierto(true)} className="text-blue-500 hover:text-blue-700 transition" title="Editar">
                        <Pencil size={28} />
                      </button>
                      <button onClick={() => {
    setProductoAEliminar(p);
    setModalEliminarAbierto(true);
  }}className="text-red-500 hover:text-red-700 transition" title="Eliminar">
                        <Trash2 size={28} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {productosFiltrados.length === 0 && (
                <tr>
                  <td colSpan="7" className="p-6 text-center text-neutral-500">
                    No se encontraron productos.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        <AgregarProductoModal open={modalAbierto} onClose={() => setModalAbierto(false)} />
          <EditarProductoModal open={modalEditarAbierto} onClose={() => setModalEditarAbierto(false)} />
            {modalEliminarAbierto && (
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
    <div className="bg-white rounded-xl shadow-lg w-full max-w-sm p-6 relative">
      <h3 className="text-xl font-bold mb-4 text-neutral-900">Confirmar eliminación</h3>
      <p className="text-neutral-700 mb-6">
        ¿Estás seguro de que quieres eliminar el producto{" "}
        <span className="font-semibold text-neutral-900">
          {productoAEliminar?.nombre}
        </span>
        ?
      </p>
      <div className="flex justify-end gap-3">
        <button
          onClick={() => setModalEliminarAbierto(false)}
          className="bg-gray-300 text-neutral-700 px-4 py-2 rounded hover:bg-gray-400 transition"
        >
          Cancelar
        </button>
        <button
          onClick={() => {
            alert(`Producto "${productoAEliminar?.nombre}" eliminado.`);
            setModalEliminarAbierto(false);
          }}
          className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition"
        >
          Eliminar
        </button>
      </div>
    </div>
  </div>
)}


      </main>
    </>
  );
}

export default ProductosPage;
