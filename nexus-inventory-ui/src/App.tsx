import React, { useEffect, useState } from 'react';
import axios from 'axios';

interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
}

function App() {
  const [products, setProducts] = useState<Product[]>([]);
  const [token, setToken] = useState<string | null>(localStorage.getItem('token'));
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState('');
  const [price, setPrice] = useState(0);

  const API_URL = "http://localhost:5237/api";

  const fetchProducts = async (search = "") => {
    if (!token) return;
    try {
      const url = search 
        ? `${API_URL}/products/search?name=${search}` 
        : `${API_URL}/products`;
      const res = await axios.get(url, {
        headers: { "Authorization": "Bearer " + token }
      });
      setProducts(res.data);
    } catch (err) {
      console.error("Fetch error:", err);
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axios.post(`${API_URL}/auth/login`, { username, password });
      localStorage.setItem('token', res.data.token);
      setToken(res.data.token);
    } catch (err) {
      alert('Login Gagal!');
    } finally {
      setLoading(false);
    }
  };

  const handleAddProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axios.post(`${API_URL}/products`, 
        { name, price, description: "Added from Nexus UI" },
        { headers: { "Authorization": "Bearer " + token } }
      );
      setName(''); setPrice(0);
      fetchProducts();
    } catch (err) {
      alert("Gagal tambah produk");
    }
  };

  const handleDelete = async (id: number) => {
    if (!window.confirm("Hapus produk ini?")) return;
    try {
      await axios.delete(`${API_URL}/products/${id}`, {
        headers: { "Authorization": "Bearer " + token }
      });
      fetchProducts();
    } catch (err) {
      alert("Gagal hapus");
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [token]);

  if (!token) {
    return (
      <div className="login-screen">
        <div className="card login-card">
          <h1>.NET Developer Technical Assessment</h1>
          <form onSubmit={handleLogin}>
            <div className="form-group">
              <label htmlFor="username">Username</label>
              <input 
                id="username"
                type="text" 
                placeholder="admin" 
                onChange={e => setUsername(e.target.value)} 
                required 
              />
            </div>
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input 
                id="password"
                type="password" 
                placeholder="admin123" 
                onChange={e => setPassword(e.target.value)} 
                required 
              />
            </div>
            <button type="submit" className="btn-primary full-width">
              {loading ? 'Logging in...' : 'SIGN IN'}
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div id="root">
      <nav className="nav-header">
        <h2>.NET Developer Technical Assessment</h2>
        <button onClick={() => { localStorage.removeItem('token'); setToken(null); }} className="btn-logout">Logout</button>
      </nav>

      <main className="main-content">
        <section className="card">
          <div className="section-header-flex">
            <h2>Products</h2>
            <input 
              type="text" 
              id="product-search"
              aria-label="Search product name"
              placeholder="Search product name..." 
              className="search-input" 
              onChange={(e) => fetchProducts(e.target.value)}
            />
          </div>
          
          <table>
            <thead>
              <tr>
                <th>NAME</th>
                <th>PRICE</th>
                <th className="text-right">ACTION</th>
              </tr>
            </thead>
            <tbody>
              {products.map(p => (
                <tr key={p.id}>
                  <td>{p.name}</td>
                  <td className="price-col">${p.price.toLocaleString()}</td>
                  <td className="text-right">
                    <button onClick={() => handleDelete(p.id)} className="btn-delete">Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {products.length === 0 && <p className="empty-state">No products found.</p>}
        </section>

        <section className="card side-form">
          <h2>Add Product</h2>
          <form onSubmit={handleAddProduct}>
            <div className="form-group">
              <label htmlFor="new-product-name">Product Name</label>
              <input 
                id="new-product-name"
                value={name} 
                placeholder="Enter name"
                onChange={e => setName(e.target.value)} 
                required 
              />
            </div>
            <div className="form-group">
              <label htmlFor="new-product-price">Price</label>
              <input 
                id="new-product-price"
                type="number" 
                value={price} 
                placeholder="0"
                onChange={e => setPrice(Number(e.target.value))} 
                required 
              />
            </div>
            <button type="submit" className="btn-primary full-width">SAVE PRODUCT</button>
          </form>
        </section>
      </main>
    </div>
  );
}

export default App;