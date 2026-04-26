import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { apiClient, setToken } from "../../data/api/apiClient";
import { persistSessionUsername } from "../../data/auth/jwtUsername";

function messageForRegisterError(err) {
  const status = err?.status ?? 0;
  const msg = (err?.error || "").toString().toLowerCase();
  if (status === 409) return "User already exists";
  if (msg.includes("already") && (msg.includes("user") || msg.includes("exists")))
    return "User already exists";
  if (status === 0 || status >= 500) return "Something went wrong";
  if (status === 400 && msg) return "Something went wrong";
  return "Something went wrong";
}

export default function Register() {
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
        "/auth/register",
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
      setError(messageForRegisterError(err));
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-card glass-panel">
        <div className="auth-header">
          <h1>Create account</h1>
          <p className="auth-subtitle">Choose a username and password to get started.</p>
        </div>
        <form onSubmit={handleSubmit} className="auth-form" noValidate>
          {error ? (
            <p className="auth-error" role="alert">
              {error}
            </p>
          ) : null}
          <div className="auth-field">
            <label htmlFor="register-username">
              <span>Username</span>
              <input
                id="register-username"
                className="search-input"
                autoComplete="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </label>
          </div>
          <div className="auth-field">
            <label htmlFor="register-password">
              <span>Password</span>
              <input
                id="register-password"
                type="password"
                className="search-input"
                autoComplete="new-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </label>
          </div>
          <button type="submit" className="btn btn-primary auth-submit" disabled={submitting}>
            {submitting ? "Creating account…" : "Register"}
          </button>
        </form>
        <p className="auth-footer">
          Already have an account? <Link to="/login">Log in</Link>
        </p>
        <p className="auth-footer auth-footer-muted">
          <Link to="/">Back to home</Link>
        </p>
      </div>
    </div>
  );
}
