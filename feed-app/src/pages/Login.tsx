import { useState } from "react";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    const stored = localStorage.getItem("studevent_user");
    if (!stored) {
      alert("No account found");
      return;
    }

    const user = JSON.parse(stored);

    if (user.email === email && user.password === password) {
      window.location.href = "/feed";
    } else {
      alert("Invalid credentials");
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#000",
        color: "#fff",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div style={{ width: "300px" }}>
        <h2 style={{ marginBottom: "16px" }}>Login</h2>

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={{ width: "100%", padding: "8px", marginBottom: "10px" }}
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={{ width: "100%", padding: "8px", marginBottom: "16px" }}
        />

        <button
          onClick={handleLogin}
          style={{ width: "100%", padding: "10px" }}
        >
          Login
        </button>
      </div>
    </div>
  );
};

export default Login;
