import { useState } from "react";
import Sidebar from "../../components/Sidebar";
import { useNavigate } from "react-router-dom";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, LineChart, Line,
} from "recharts";

function GraficasPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate();
  const numeroFactura = 1001; // por consistencia con tu header

  // Datos simulados:
  const gananciasNetas = [
    { mes: "Ene", ganancia: 5000 },
    { mes: "Feb", ganancia: 4500 },
    { mes: "Mar", ganancia: 8000 },
    { mes: "Abr", ganancia: 3000 },
    { mes: "May", ganancia: 7000 },
  ];

  const articulosVendidos = [
    { articulo: "Cemento", cantidad: 120 },
    { articulo: "Martillo", cantidad: 90 },
    { articulo: "Metro", cantidad: 60 },
    { articulo: "Pintura", cantidad: 40 },
    { articulo: "Desarmador", cantidad: 30 },
  ];

  const deudasClientes = [
    { cliente: "Construcciones Zamora", deuda: 2500 },
    { cliente: "Ferretería del Centro", deuda: 2000 },
    { cliente: "Carpintería López", deuda: 1500 },
    { cliente: "Herrería Martínez", deuda: 1200 },
    { cliente: "Mecánica Ruiz", deuda: 800 },
  ];

  const ventasDiarias = [
    { dia: "Lun", total: 1200 },
    { dia: "Mar", total: 2000 },
    { dia: "Mié", total: 1800 },
    { dia: "Jue", total: 2200 },
    { dia: "Vie", total: 2500 },
    { dia: "Sáb", total: 3000 },
  ];

  const formasPago = [
    { forma: "Efectivo", porcentaje: 60 },
    { forma: "Tarjeta", porcentaje: 25 },
    { forma: "Transferencia", porcentaje: 15 },
  ];

  const coloresPago = ["#4ade80", "#60a5fa", "#facc15"];

  return (
    <>
      <Sidebar
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
        numeroFactura={numeroFactura}
        navigate={navigate}
      />

      <main className="pt-16 p-6 min-h-screen bg-neutral-100">
        <h1 className="text-3xl font-bold text-neutral-900 mb-6">Dashboard de Gráficas</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Ganancias netas */}
          <div className="bg-white rounded-xl shadow p-4">
            <h2 className="text-xl font-bold text-neutral-800 mb-4">Ganancias netas mensuales</h2>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={gananciasNetas}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="mes" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="ganancia" fill="#4ade80" />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Artículos vendidos */}
          <div className="bg-white rounded-xl shadow p-4">
            <h2 className="text-xl font-bold text-neutral-800 mb-4">Top 5 artículos vendidos</h2>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={articulosVendidos} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis type="number" />
                <YAxis type="category" dataKey="articulo" />
                <Tooltip />
                <Bar dataKey="cantidad" fill="#60a5fa" />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Deudas de clientes */}
          <div className="bg-white rounded-xl shadow p-4">
            <h2 className="text-xl font-bold text-neutral-800 mb-4">Top 5 clientes con más deuda</h2>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={deudasClientes}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="cliente" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="deuda" fill="#f87171" />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Ventas diarias */}
          <div className="bg-white rounded-xl shadow p-4">
            <h2 className="text-xl font-bold text-neutral-800 mb-4">Ventas de la semana</h2>
            <ResponsiveContainer width="100%" height={250}>
              <LineChart data={ventasDiarias}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="dia" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="total" stroke="#f59e0b" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Distribución formas de pago */}
          <div className="bg-white rounded-xl shadow p-4 md:col-span-2">
            <h2 className="text-xl font-bold text-neutral-800 mb-4">Distribución de formas de pago</h2>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={formasPago}
                  dataKey="porcentaje"
                  nameKey="forma"
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  label
                >
                  {formasPago.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={coloresPago[index % coloresPago.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </main>
    </>
  );
}

export default GraficasPage;
