import { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

export default function EditarProducto() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [producto, setProducto] = useState({
    nombre: '',
    descripcion: '',
    precio: '',
    imagen_url: '',
    categoria_id: ''
  });

  useEffect(() => {
    axios.get(`http://localhost:3001/productos/${id}`)
      .then(res => setProducto(res.data))
      .catch(err => console.error('Error al obtener producto:', err));
  }, [id]);

  const handleChange = (e) => {
    setProducto({ ...producto, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const token = localStorage.getItem('token');
    axios.put(`${import.meta.env.VITE_BACKEND_URL}/admin/productos/${id}`, producto, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    .then(() => {
      alert('Producto actualizado ✅');
      navigate('/admin'); // vuelve al panel admin
    })
    .catch(err => {
      console.error('Error al actualizar producto:', err);
      alert('Error al actualizar ❌');
    });
  };

  return (
    <div className="max-w-xl mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Editar Producto</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input name="nombre" value={producto.nombre} onChange={handleChange} placeholder="Nombre" className="w-full p-2 border rounded" />
        <textarea name="descripcion" value={producto.descripcion} onChange={handleChange} placeholder="Descripción" className="w-full p-2 border rounded" />
        <input name="precio" value={producto.precio} onChange={handleChange} placeholder="Precio" type="number" step="0.01" className="w-full p-2 border rounded" />
        <input name="imagen_url" value={producto.imagen_url} onChange={handleChange} placeholder="URL Imagen" className="w-full p-2 border rounded" />
        <input name="categoria_id" value={producto.categoria_id} onChange={handleChange} placeholder="ID Categoría" type="number" className="w-full p-2 border rounded" />
        <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded">Guardar Cambios</button>
      </form>
    </div>
  );
}
