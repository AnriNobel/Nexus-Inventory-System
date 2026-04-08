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

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5237/api/auth/login', { username, password });
      localStorage.setItem('token', res.data.token);
      setToken(res.data.token);
      window.location.reload();
    } catch (err) {
      alert('Login Gagal! Gunakan admin / admin123');
    }
  };

  const handleLogout = () => {
    localStorage.clear();
    setToken(null);
    window.location.reload();
  };

  useEffect(() => {
    if (token) {
      axios.get('http://localhost:5237/api/products', {
        headers: { "Authorization": "Bearer " + token }
      })
      .then(res => setProducts(res.data))
      .catch(err => {
        if(err.response?.status === 401) handleLogout();
      });
    }
  }, [token]);

  if (!token) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', width: '100vw', fontFamily: 'Arial, sans-serif', backgroundColor: '#1a202c', margin: 0 }}>
        <div style={{ textAlign: 'center' }}>
          {/* Teks Sambutan untuk Penguji */}
          <h2 style={{ color: '#ebf8ff', marginBottom: '10px', fontWeight: '300' }}>Selamat Datang</h2>
          <p style={{ color: '#a0aec0', marginBottom: '25px' }}>Silakan Login untuk Menguji Sistem</p>
          
          <form onSubmit={handleLogin} style={{ padding: '40px', background: '#ffffff', borderRadius: '12px', boxShadow: '0 10px 25px rgba(0,0,0,0.3)', width: '320px', textAlign: 'left' }}>
            <h2 style={{ textAlign: 'center', marginBottom: '25px', color: '#2d3748', fontSize: '22px', fontWeight: 'bold' }}>Nexus Login</h2>
            
            <div style={{ marginBottom: '15px' }}>
              <label style={{ display: 'block', color: '#4a5568', marginBottom: '5px', fontSize: '14px' }}>Username</label>
              <input type="text" placeholder="admin" style={{ width: '100%', padding: '12px', borderRadius: '6px', border: '1px solid #cbd5e0', boxSizing: 'border-box', color: '#2d3748' }} onChange={e => setUsername(e.target.value)} />
            </div>
            
            <div style={{ marginBottom: '25px' }}>
              <label style={{ display: 'block', color: '#4a5568', marginBottom: '5px', fontSize: '14px' }}>Password</label>
              <input type="password" placeholder="admin123" style={{ width: '100%', padding: '12px', borderRadius: '6px', border: '1px solid #cbd5e0', boxSizing: 'border-box', color: '#2d3748' }} onChange={e => setPassword(e.target.value)} />
            </div>
            
            <button style={{ width: '100%', padding: '12px', backgroundColor: '#3182ce', color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer', fontWeight: 'bold', fontSize: '16px' }}>SIGN IN</button>
            
            <p style={{ marginTop: '20px', fontSize: '12px', color: '#718096', textAlign: 'center' }}>
              Gunakan kredensial default untuk akses cepat.
            </p>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div style={{ padding: '40px', fontFamily: 'Arial, sans-serif', backgroundColor: '#f7fafc', minHeight: '100vh', color: '#2d3748' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px', borderBottom: '2px solid #e2e8f0', paddingBottom: '20px' }}>
        <h1 style={{ color: '#2c5282', margin: 0 }}>Nexus Inventory System</h1>
        <button onClick={handleLogout} style={{ padding: '10px 20px', backgroundColor: '#e53e3e', color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer', fontWeight: 'bold' }}>Logout</button>
      </div>
      <div style={{ backgroundColor: 'white', borderRadius: '8px', boxShadow: '0 4px 6px rgba(0,0,0,0.1)', overflow: 'hidden' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead style={{ backgroundColor: '#2d3748', color: 'white' }}>
            <tr>
              <th style={{ padding: '15px', textAlign: 'left' }}>Product Name</th>
              <th style={{ padding: '15px', textAlign: 'left' }}>Price</th>
              <th style={{ padding: '15px', textAlign: 'left' }}>Action</th>
            </tr>
          </thead>
          <tbody>
            {products.length > 0 ? products.map(p => (
              <tr key={p.id} style={{ borderBottom: '1px solid #edf2f7' }}>
                <td style={{ padding: '15px' }}>{p.name}</td>
                <td style={{ padding: '15px', fontWeight: 'bold', color: '#38a169' }}>${p.price}</td>
                <td style={{ padding: '15px', color: '#3182ce', cursor: 'pointer', fontWeight: '600' }}>Edit</td>
              </tr>
            )) : (
              <tr><td colSpan={3} style={{ padding: '30px', textAlign: 'center', color: '#718096' }}>No products found in database. Login successful!</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default App;