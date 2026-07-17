import { useState } from "react";
import { loginuser } from "../services/authservice";
import { useNavigate } from "react-router-dom";
import "../styles/login.css";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await loginuser({
        email,
        password,
      });

      const token = response.data.token;
      localStorage.setItem("token", token);

      navigate("/dashboard");
    } catch (error) {
      setError(error.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <div >
        <button className="register-button" onClick={()=>navigate("./Register")}>Register</button>
      </div>
      <div className="login-box">
        <h1>Login</h1>

        <form onSubmit={handleSubmit} className="login-form">
          <input
            type="email"
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            type="password"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          {error ? <p className="error-text">{error}</p> : null}

          <button type="submit" disabled={loading}>
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;