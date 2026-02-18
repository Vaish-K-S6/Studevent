import { useAuth } from "../../context/AuthContext";

const Profile = () => {
  const { isLoggedIn, userEmail, logout } = useAuth();

  if (!isLoggedIn) {
    window.location.href = "/signup";
    return null;
  }

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#000",
        color: "#fff",
        padding: "24px",
      }}
    >
      <h2 style={{ marginBottom: "20px" }}>My Profile</h2>

      <p>
        <strong>Email:</strong> {userEmail}
      </p>

      <p>
        <strong>Role:</strong> Student
      </p>

      <div style={{ marginTop: "24px", display: "flex", gap: "12px" }}>
        <button onClick={() => (window.location.href = "/saved")}>
          Saved Reels
        </button>

        <button
          onClick={() => {
            logout();
            window.location.href = "/feed";
          }}
          style={{ background: "#ff4444", color: "#fff" }}
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default Profile;
