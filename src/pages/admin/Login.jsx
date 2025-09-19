// src/pages/admin/Login.jsx
import { useState } from "react";
import { useAdmin } from "../../admin/AdminContext";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const { login } = useAdmin();
  const navigate = useNavigate();

  const [email, setEmail] = useState("admin@f3t.tn");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState("");

  const submit = async (e) => {
    e.preventDefault();
    setErr("");
    try {
      await login(email, password);
      navigate("/admin/home", { replace: true });
    } catch (e) {
      setErr(e?.message || "Invalid credentials");
    }
  };

  return (
    <div className="container" style={{ maxWidth: 420, margin: "4rem auto" }}>
      <h1>Admin Login</h1>
      <form onSubmit={submit}>
        <label>Email<input value={email} onChange={(e) => setEmail(e.target.value)} /></label>
        <label>Password<input type="password" value={password} onChange={(e) => setPassword(e.target.value)} /></label>
        {err && <p style={{ color: "crimson" }}>{err}</p>}
        <button type="submit">Login</button>
      </form>
      <style>{`label{display:block;margin:12px 0} input{width:100%;padding:8px}`}</style>
    </div>
  );
}
