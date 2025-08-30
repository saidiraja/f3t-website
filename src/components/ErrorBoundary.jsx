// src/components/ErrorBoundary.jsx
import React from "react";

export default class ErrorBoundary extends React.Component {
  constructor(p){ super(p); this.state = { hasError:false, err:null, info:null }; }
  static getDerivedStateFromError(err){ return { hasError:true, err }; }
  componentDidCatch(err, info){ this.setState({ info }); console.error("App crash:", err, info); }
  render(){
    if (this.state.hasError) {
      return (
        <div style={{ padding:"2rem", fontFamily:"system-ui" }}>
          <h1>Something went wrong.</h1>
          <pre style={{ whiteSpace:"pre-wrap" }}>{String(this.state.err)}</pre>
        </div>
      );
    }
    return this.props.children;
  }
}
