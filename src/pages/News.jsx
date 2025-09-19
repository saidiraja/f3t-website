// src/pages/News.jsx
import { useEffect, useMemo, useState } from "react";
import SEO from "../components/SEO";
import { useI18n } from "../i18n/useI18n";
import { api } from "../api";

export default function News() {
  const { lang } = useI18n();
  const [posts, setPosts] = useState([]);
  const [state, setState] = useState({ loading: true, error: "" });

  const T = (fr, en) => (lang === "fr" ? fr : en);

  useEffect(() => {
    let mounted = true;
    api
      .getNews()
      .then((data) => {
        if (!mounted) return;
        setPosts(Array.isArray(data) ? data : []);
        setState({ loading: false, error: "" });
      })
      .catch(() => {
        if (!mounted) return;
        setPosts([]);
        setState({ loading: false, error: "fetch" });
      });
    return () => {
      mounted = false;
    };
  }, []);

  const pageTitle = T("Actualités", "News");
  const pageDesc = T("Dernières nouvelles F3T", "Latest F3T updates");

  const sorted = useMemo(
    () =>
      posts
        .slice()
        .sort(
          (a, b) =>
            new Date(b?.created_at || 0) - new Date(a?.created_at || 0)
        ),
    [posts]
  );

  return (
    <main className="container">
      <SEO title={pageTitle} description={pageDesc} />
      <section className="card" style={{ marginBottom: 16 }}>
        <h1 style={{ marginBottom: 8 }}>{pageTitle}</h1>
        <p style={{ opacity: 0.85 }}>{pageDesc}</p>
      </section>

      {state.loading && (
        <section className="card" aria-busy="true">
          <p>{T("Chargement des actualités…", "Loading news…")}</p>
        </section>
      )}

      {!state.loading && state.error && (
        <section className="card">
          <p style={{ color: "crimson" }}>
            {T(
              "Impossible de charger les actualités pour le moment.",
              "Unable to load news right now."
            )}
          </p>
        </section>
      )}

      {!state.loading && !state.error && sorted.length === 0 && (
        <section className="card">
          <p>{T("Aucune actualité pour le moment.", "No news yet.")}</p>
        </section>
      )}

      {!state.loading && !state.error && sorted.length > 0 && (
        <div
          className="grid"
          style={{
            display: "grid",
            gap: 16,
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
          }}
        >
          {sorted.map((p) => {
            const title = T(p.title_fr, p.title_en) || T("Sans titre", "Untitled");
            const body = T(p.body_fr, p.body_en) || "";
            const date =
              p.created_at &&
              new Date(p.created_at).toLocaleDateString(
                lang === "fr" ? "fr-FR" : "en-US",
                { year: "numeric", month: "long", day: "numeric" }
              );

            return (
              <article key={p.id} className="card" style={{ overflow: "hidden" }}>
                {p.image_url ? (
                  <img
                    src={p.image_url}
                    alt=""
                    loading="lazy"
                    style={{
                      width: "100%",
                      height: 180,
                      objectFit: "cover",
                      display: "block",
                    }}
                  />
                ) : null}
                <div style={{ paddingTop: 8 }}>
                  <h3 style={{ marginBottom: 6 }}>{title}</h3>
                  {date && (
                    <small style={{ opacity: 0.7, display: "block", marginBottom: 8 }}>
                      {date}
                    </small>
                  )}
                  <p style={{ whiteSpace: "pre-line" }}>{body}</p>
                </div>
              </article>
            );
          })}
        </div>
      )}
    </main>
  );
}
