import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { apiClient, setToken } from "../../data/api/apiClient";
import { persistSessionUsername } from "../../data/auth/jwtUsername";

function messageForLoginError(err) {
  const status = err?.status ?? 0;
  const msg = (err?.error || "").toString().toLowerCase();
  if (status === 0 || status >= 500) return "Something went wrong";
  if (status === 401) return "Invalid credentials";
  if (msg.includes("invalid") && msg.includes("credential")) return "Invalid credentials";
  if (msg.includes("bad credentials") || msg.includes("unauthorized")) return "Invalid credentials";
  return "Invalid credentials";
}

export default function Login() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSubmitting(true);
    try {
      const data = await apiClient.post(
        "/auth/login",
        { username, password },
        { public: true }
      );
      const token = data.token ?? data.accessToken;
      if (token) {
        setToken(token);
        persistSessionUsername(token);
        window.dispatchEvent(new Event("authchange"));
        navigate("/", { replace: true });
      } else {
        setError("Something went wrong");
      }
    } catch (err) {
      setError(messageForLoginError(err));
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-card glass-panel">
        <div className="auth-header">
          <h1>Sign in</h1>
          <p className="auth-subtitle">Enter your username and password to continue.</p>
        </div>
        <form onSubmit={handleSubmit} className="auth-form" noValidate>
          {error ? (
            <p className="auth-error" role="alert">
              {error}
            </p>
          ) : null}
          <div className="auth-field">
            <label htmlFor="login-username">
              <span>Username</span>
              <input
                id="login-username"
                className="search-input"
                autoComplete="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </label>
          </div>
          <div className="auth-field">
            <label htmlFor="login-password">
              <span>Password</span>
              <input
                id="login-password"
                type="password"
                className="search-input"
                autoComplete="current-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </label>
          </div>
          <button type="submit" className="btn btn-primary auth-submit" disabled={submitting}>
            {submitting ? "Signing in…" : "Sign in"}
          </button>
        </form>
        <p className="auth-footer">
          New here? <Link to="/register">Create an account</Link>
        </p>
        <p className="auth-footer auth-footer-muted">
          <Link to="/">Back to home</Link>
        </p>
      </div>
    </div>
  );
}
