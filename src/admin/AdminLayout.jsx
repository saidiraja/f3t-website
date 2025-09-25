import { Link, NavLink, Outlet, useNavigate } from "react-router-dom";
import { useEffect } from "react";

export default function AdminLayout() {
  const navigate = useNavigate();

  useEffect(() => {
    // redirect to /admin/texts by default
    if (location.hash.endsWith("/admin") || location.hash.endsWith("/admin/")) {
      navigate("/admin/texts", { replace: true });
    }
  }, [navigate]);

  return (
    <div style={{ display: "grid", gridTemplateColumns: "240px 1fr", minHeight: "100vh" }}>
      <aside style={s.aside}>
        <div style={s.brand}><Link to="/#/">F3T Admin</Link></div>
        <nav>
          <Section title="Content">
            <Item to="/admin/texts" icon="fa-pen">Text Slots</Item>
            {/* you already have pages for Services/Industries/Clients/News CRUD */}
            <Item to="/#/admin/services" icon="fa-cubes">Services</Item>
            <Item to="/#/admin/industries" icon="fa-industry">Industries</Item>
            <Item to="/#/admin/clients" icon="fa-handshake">Clients</Item>
            <Item to="/#/admin/news" icon="fa-newspaper">News</Item>
          </Section>
          <Section title="Site">
            <Item to="/#/" icon="fa-globe">View site</Item>
          </Section>
        </nav>
      </aside>
      <main style={s.main}>
        <header style={s.header}>
          <div />
          <button onClick={() => { localStorage.removeItem("f3t_token"); navigate("/#/admin/login"); }} style={s.logout}>
            <i className="fa fa-sign-out" /> Logout
          </button>
        </header>
        <div style={s.content}>
          <Outlet />
        </div>
      </main>
    </div>
  );
}

function Section({ title, children }) {
  return (
    <div style={{ marginBottom: 18 }}>
      <div style={s.sectionTitle}>{title}</div>
      <ul style={s.menu}>{children}</ul>
    </div>
  );
}

function Item({ to, icon, children }) {
  return (
    <li>
      <NavLink to={to} style={({ isActive }) => ({
        ...s.link, ...(isActive ? s.linkActive : {})
      })}>
        <i className={`fa ${icon}`} style={{ marginRight: 8 }} /> {children}
      </NavLink>
    </li>
  );
}

const s = {
  aside: {
    background: "#0b1a2f",
    color: "#e5e7eb",
    padding: "18px 14px",
    borderRight: "1px solid #0f264a"
  },
  brand: { fontWeight: 800, color: "#fff", margin: "8px 6px 18px" },
  sectionTitle: { fontSize: 12, letterSpacing: 1, textTransform: "uppercase", opacity: .7, margin: "10px 8px" },
  menu: { listStyle: "none", padding: 0, margin: 0 },
  link: {
    display: "block", padding: "8px 10px", borderRadius: 8,
    color: "#dbe1ea", textDecoration: "none"
  },
  linkActive: { background: "#133058", color: "#fff" },
  main: { background: "#0a0f1a", color: "#e5e7eb" },
  header: {
    display: "flex", justifyContent: "space-between", alignItems: "center",
    padding: "12px 18px", borderBottom: "1px solid #10213d", position: "sticky", top: 0
  },
  logout: { background: "#d51820", border: "none", color: "#fff", padding: "8px 12px", borderRadius: 8, cursor: "pointer" },
  content: { padding: 18, maxWidth: 1100, margin: "0 auto" }
};

