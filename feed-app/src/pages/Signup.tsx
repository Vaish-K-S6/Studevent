import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSignup = () => {
    if (!email || !password) {
      alert("Please fill all fields");
      return;
    }

    // store user credentials (temporary, MVP)
    localStorage.setItem(
      "studevent_user",
      JSON.stringify({ email, password })
    );

    // IMPORTANT: update global auth state
    login(email);

    // redirect to profile
    navigate("/profile");
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
        <h2 style={{ marginBottom: "16px" }}>Create Account</h2>

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
          onClick={handleSignup}
          style={{ width: "100%", padding: "10px" }}
        >
          Sign Up
        </button>
      </div>
    </div>
  );
};

export default Signup;
