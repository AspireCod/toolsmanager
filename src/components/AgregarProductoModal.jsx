import { useState } from "react";
import { X } from "lucide-react";

function AgregarProductoModal({ open, onClose }) {
  const [modalCategoriaAbierto, setModalCategoriaAbierto] = useState(false);
const [nuevaCategoria, setNuevaCategoria] = useState("");

  const [producto, setProducto] = useState({
    codigo: "",
    nombre: "",
    categoria: "",
    precioCompra: "",
    precioVenta: "",
    stock: "",
    limite: "",
    unidad: "",
    imagen: null,
  });

  if (!open) return null;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProducto((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProducto((prev) => ({ ...prev, imagen: file }));
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-xl shadow-lg w-full max-w-2xl p-6 relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-neutral-600 hover:text-red-600 transition"
          title="Cerrar"
        >
          <X size={28} />
        </button>

        <h2 className="text-2xl font-bold mb-6 text-neutral-900">Agregar nuevo producto</h2>
<form className="flex flex-col md:flex-row gap-8">
  {/* Columna de campos */}
  <div className="flex-1 space-y-4">
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div>
        <label className="block text-neutral-700 mb-1">Código</label>
        <input
          type="text"
          name="codigo"
          className="w-full border rounded p-2"
          placeholder="Ej: CEM001"
          value={producto.codigo}
          onChange={handleInputChange}
        />
      </div>

      <div>
        <label className="block text-neutral-700 mb-1">Nombre del producto</label>
        <input
          type="text"
          name="nombre"
          className="w-full border rounded p-2"
          placeholder="Cemento gris"
          value={producto.nombre}
          onChange={handleInputChange}
        />
      </div>
    </div>

    <div>
      <label className="block text-neutral-700 mb-1">Categoría</label>
      <div className="flex gap-2">
        <select
          name="categoria"
          className="w-full border rounded p-2 flex-1"
          value={producto.categoria}
          onChange={handleInputChange}
        >
          <option value="">Seleccione categoría</option>
          <option value="Material">Material</option>
          <option value="Herramienta">Herramienta</option>
          <option value="Accesorio">Accesorio</option>
        </select>
        <button
          type="button" onClick={() => setModalCategoriaAbierto(true)}
          className="bg-blue-600 text-white px-3 rounded hover:bg-blue-700 transition"
          title="Agregar nueva categoría"
        >
          +
        </button>
      </div>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div>
        <label className="block text-neutral-700 mb-1">Precio de compra</label>
        <input
          type="number"
          name="precioCompra"
          className="w-full border rounded p-2"
          placeholder="$0.00"
          value={producto.precioCompra}
          onChange={handleInputChange}
        />
      </div>

      <div>
        <label className="block text-neutral-700 mb-1">Precio de venta</label>
        <input
          type="number"
          name="precioVenta"
          className="w-full border rounded p-2"
          placeholder="$0.00"
          value={producto.precioVenta}
          onChange={handleInputChange}
        />
      </div>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div>
        <label className="block text-neutral-700 mb-1">Stock inicial</label>
        <input
          type="number"
          name="stock"
          className="w-full border rounded p-2"
          placeholder="0"
          value={producto.stock}
          onChange={handleInputChange}
        />
      </div>

      <div>
        <label className="block text-neutral-700 mb-1">Cantidad límite para alerta</label>
        <input
          type="number"
          name="limite"
          className="w-full border rounded p-2"
          placeholder="5"
          value={producto.limite}
          onChange={handleInputChange}
        />
      </div>
    </div>

    <div>
      <label className="block text-neutral-700 mb-1">Unidad de medida</label>
      <select
        name="unidad"
        className="w-full border rounded p-2"
        value={producto.unidad}
        onChange={handleInputChange}
      >
        <option value="">Seleccione unidad</option>
        <option value="pieza">Pieza</option>
        <option value="litros">Litros</option>
        <option value="metros">Metros</option>
        <option value="kilos">Kilos</option>
      </select>
    </div>

    <div>
      <label className="block text-neutral-700 mb-1">Imagen del producto</label>
      <input
        type="file"
        accept="image/*"
        className="w-full border rounded p-2"
        onChange={handleImageChange}
      />
    </div>
  </div>

  {/* Columna de imagen */}
  <div className="flex flex-col items-center justify-center md:w-1/3 border rounded-lg p-4 h-full bg-neutral-50">
    {producto.imagen ? (
      <img
        src={URL.createObjectURL(producto.imagen)}
        alt="Preview"
        className="h-48 object-contain rounded"
      />
    ) : (
      <span className="text-neutral-400 text-center">Vista previa de la imagen</span>
    )}
  </div>
</form>
{modalCategoriaAbierto && (
  <div className="fixed inset-0 z-60 flex items-center justify-center bg-black bg-opacity-50">
    <div className="bg-white rounded-xl shadow-lg w-full max-w-sm p-6 relative">
      <button
        onClick={() => setModalCategoriaAbierto(false)}
        className="absolute top-4 right-4 text-neutral-600 hover:text-red-600 transition"
        title="Cerrar"
      >
        <X size={24} />
      </button>

      <h3 className="text-xl font-bold mb-4 text-neutral-900">Agregar categoría</h3>

      <input
        type="text"
        className="w-full border rounded p-2 mb-4"
        placeholder="Nombre de la categoría"
        value={nuevaCategoria}
        onChange={(e) => setNuevaCategoria(e.target.value)}
      />

      <div className="flex justify-end gap-3">
        <button
          type="button"
          onClick={() => setModalCategoriaAbierto(false)}
          className="bg-gray-300 text-neutral-700 px-4 py-2 rounded hover:bg-gray-400 transition"
        >
          Cancelar
        </button>
        <button
          type="button"
          onClick={() => {
            // Aquí podrías agregar la lógica real para guardar la categoría
            alert(`Categoría "${nuevaCategoria}" agregada!`);
            setNuevaCategoria("");
            setModalCategoriaAbierto(false);
          }}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
        >
          Guardar
        </button>
      </div>
    </div>
  </div>
)}



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
          >
            Guardar producto
          </button>
        </div>
      </div>
    </div>
  );
}

export default AgregarProductoModal;
