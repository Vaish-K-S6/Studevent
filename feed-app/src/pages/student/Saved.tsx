import { useEffect, useState } from "react";

const Saved = () => {
  const [savedReels, setSavedReels] = useState<number[]>([]);

  useEffect(() => {
    const saved = localStorage.getItem("saved_reels");
    if (saved) {
      setSavedReels(JSON.parse(saved));
    }
  }, []);

  return (
    <div
      style={{
        background: "#000",
        color: "#fff",
        minHeight: "100vh",
        padding: "24px",
      }}
    >
      <h2>Saved Events</h2>

      {savedReels.length === 0 ? (
        <p style={{ marginTop: "16px" }}>No saved events yet.</p>
      ) : (
        savedReels.map((id) => (
          <div
            key={id}
            style={{
              marginTop: "16px",
              padding: "12px",
              background: "#111",
              borderRadius: "8px",
            }}
          >
            Saved Event #{id + 1}
          </div>
        ))
      )}
    </div>
  );
};

export default Saved;
