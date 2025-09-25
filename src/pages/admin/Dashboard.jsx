// src/pages/admin/Dashboard.jsx
import { Link, Outlet } from 'react-router-dom';
import { useAdmin } from '../../admin/AdminContext';

export default function Dashboard() {
  const { logout } = useAdmin();
  return (
    <div style={{display:'grid', gridTemplateColumns:'220px 1fr', minHeight:'80vh'}}>
      <aside style={{padding:'1rem', borderRight:'1px solid #ddd', background:'rgba(255,255,255,0.6)'}}>
        <h2 style={{marginTop:0}}>Admin</h2>
        <nav style={{display:'grid', gap:8}}>
          <Link to="/admin/home">Home</Link>
          <Link to="/admin/about">About</Link>
          <Link to="/admin/services">Services</Link>
          <Link to="/admin/industries">Industries</Link>
          <Link to="/admin/certifications">Certifications</Link>
          <Link to="/admin/clients">Clients</Link>
          <Link to="/admin/news">News</Link>
          <button onClick={logout} style={{marginTop:16}}>Logout</button>
        </nav>
      </aside>
      <main style={{padding:'1rem 2rem'}}><Outlet /></main>
    </div>
  );
}
