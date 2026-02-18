import { useState } from "react";
import { useAuth } from "../context/AuthContext";

/* ---------------- MOCK EVENTS ---------------- */
const events = [
  {
    title: "IIT Hackathon",
    institute: "IIT Hyderabad",
    description:
      "National level hackathon for students across India. Build innovative solutions and win prizes.",
    deadline: "20 Jan",
    link: "https://example.com/iit-hack",
  },
  {
    title: "AI Workshop",
    institute: "IIT Bombay",
    description:
      "Hands-on AI workshop covering ML fundamentals and real-world use cases.",
    deadline: "25 Jan",
    link: "https://example.com/ai",
  },
  {
    title: "Startup Bootcamp",
    institute: "IIM Bangalore",
    description:
      "Intensive startup bootcamp focusing on ideation and pitching.",
    deadline: "30 Jan",
    link: "https://example.com/startup",
  },
  {
    title: "Web3 Meetup",
    institute: "IIT Madras",
    description:
      "Meetup discussing Web3, blockchain, NFTs and DAOs.",
    deadline: "5 Feb",
    link: "https://example.com/web3",
  },
  {
    title: "Design Sprint",
    institute: "NID",
    description:
      "UI/UX design sprint with prototyping and user testing.",
    deadline: "10 Feb",
    link: "https://example.com/design",
  },
];

/* ---------------- STYLES ---------------- */
const actionBtn = {
  width: "44px",
  height: "44px",
  borderRadius: "12px",
  background: "rgba(0,0,0,0.6)",
  color: "#fff",
  border: "1px solid rgba(255,255,255,0.15)",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  cursor: "pointer",
  position: "relative" as const,
};

const tooltip = {
  position: "absolute" as const,
  right: "54px",
  background: "#111",
  color: "#fff",
  padding: "4px 8px",
  borderRadius: "6px",
  fontSize: "11px",
  whiteSpace: "nowrap" as const,
  border: "1px solid rgba(255,255,255,0.15)",
};

const gridWrap = {
  display: "grid",
  gridTemplateColumns: "repeat(3, 1fr)",
  gap: "6px",
  marginTop: "12px",
};

const gridItem = {
  aspectRatio: "9 / 16",
  background: "linear-gradient(#222, #000)",
  borderRadius: "8px",
  cursor: "pointer",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  fontSize: "12px",
  color: "#aaa",
};

/* ---------------- COMPONENT ---------------- */
const Feed = () => {
  const { isLoggedIn, savedReels, toggleSaveReel, logout } = useAuth();

  const [search, setSearch] = useState("");
  const [expanded, setExpanded] = useState<number | null>(null);
  const [hovered, setHovered] = useState<string | null>(null);
  const [showProfile, setShowProfile] = useState(false);
  const [openSavedId, setOpenSavedId] = useState<number | null>(null);

  const filteredEvents = events
    .map((event, id) => ({ ...event, id }))
    .filter(
      (e) =>
        e.title.toLowerCase().includes(search.toLowerCase()) ||
        e.institute.toLowerCase().includes(search.toLowerCase())
    );

  return (
    <div style={{ background: "#000", minHeight: "100vh", display: "flex", justifyContent: "center" }}>
      {/* PHONE FRAME */}
      <div style={{ width: "390px", height: "100vh", position: "relative", overflow: "hidden" }}>
        {/* TOP BAR */}
        <div style={{ position: "absolute", top: 0, width: "100%", padding: "8px", background: "#000", zIndex: 10, display: "flex", gap: "8px" }}>
          <input
            placeholder="Search event or institute"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{ flex: 1, padding: "8px", borderRadius: "6px", border: "none" }}
          />
          {isLoggedIn && (
            <button onClick={() => setShowProfile(true)} style={{ background: "none", border: "none", color: "#fff", fontSize: "20px" }}>
              👤
            </button>
          )}
        </div>

        {/* FEED */}
        <div style={{ height: "100%", overflowY: "scroll", scrollSnapType: "y mandatory", paddingTop: "52px" }}>
          {filteredEvents.map((event, renderIndex) => {
            if (!isLoggedIn && renderIndex >= 4) {
              return (
                <div key={renderIndex} style={{ height: "100vh", scrollSnapAlign: "start", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", color: "#fff" }}>
                  <h3>Create a free account to unlock all events</h3>
                  <button onClick={() => (window.location.href = "/signup")} style={{ marginTop: "12px" }}>
                    Sign Up
                  </button>
                </div>
              );
            }

            const isExpanded = expanded === event.id;
            const shortText = event.description.slice(0, 60);

            return (
              <div key={event.id} style={{ height: "100vh", scrollSnapAlign: "start", position: "relative", background: "linear-gradient(#111, #000)", color: "#fff" }}>
                {/* CAPTION */}
                <div style={{ position: "absolute", left: "14px", bottom: "40px", maxWidth: "250px" }}>
                  <h3 style={{ fontSize: "16px" }}>{event.title}</h3>
                  <p style={{ fontSize: "12px", color: "#4da3ff" }}>{event.institute}</p>
                  <p style={{ fontSize: "13px" }}>
                    {isExpanded ? event.description : shortText}
                    {!isExpanded && event.description.length > 60 && (
                      <span style={{ color: "#aaa", cursor: "pointer" }} onClick={() => setExpanded(event.id)}>
                        {" "}...Read more
                      </span>
                    )}
                  </p>
                </div>

                {/* ACTION BUTTONS */}
                <div style={{ position: "absolute", right: "12px", bottom: "70px", display: "flex", flexDirection: "column", gap: "10px" }}>
                  {/* SAVE */}
                  <button
                    style={actionBtn}
                    onMouseEnter={() => setHovered("save")}
                    onMouseLeave={() => setHovered(null)}
                    onClick={() => toggleSaveReel(event.id)}
                  >
                    🔖
                    {hovered === "save" && <span style={tooltip}>Save</span>}
                  </button>

                  {/* SHARE */}
                  <button
                    style={actionBtn}
                    onMouseEnter={() => setHovered("share")}
                    onMouseLeave={() => setHovered(null)}
                    onClick={() => {
                      navigator.clipboard.writeText(event.link);
                      alert("Link copied!");
                    }}
                  >
                    📤
                    {hovered === "share" && <span style={tooltip}>Share</span>}
                  </button>

                  {/* REGISTER */}
                  <button
                    style={actionBtn}
                    onMouseEnter={() => setHovered("register")}
                    onMouseLeave={() => setHovered(null)}
                    onClick={() => window.open(event.link, "_blank")}
                  >
                    🧾
                    {hovered === "register" && <span style={tooltip}>Register</span>}
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* PROFILE MODAL */}
        {showProfile && (
          <div style={{ position: "fixed", top: 0, right: 0, width: "320px", height: "100vh", background: "#111", color: "#fff", padding: "16px", zIndex: 9999 }}>
            <button onClick={() => setShowProfile(false)} style={{ float: "right", background: "none", border: "none", color: "#fff" }}>✕</button>
            <h3>Profile</h3>

            <button style={{ width: "100%", marginTop: "8px" }}>Change Password</button>
            <button style={{ width: "100%", marginTop: "8px" }} onClick={logout}>Logout</button>

            <h4 style={{ marginTop: "16px" }}>Saved</h4>

            {savedReels.length === 0 ? (
              <p style={{ fontSize: "12px", color: "#777" }}>No saved events yet</p>
            ) : (
              <div style={gridWrap}>
                {savedReels.map((id) => (
                  <div key={id} style={gridItem} onClick={() => setOpenSavedId(id)}>
                    Event {id + 1}
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* SAVED REEL VIEWER */}
        {openSavedId !== null && (
          <div onClick={() => setOpenSavedId(null)} style={{ position: "fixed", inset: 0, background: "#000", zIndex: 99999, display: "flex", alignItems: "center", justifyContent: "center", color: "#fff" }}>
            <h2>Saved Event {openSavedId + 1}</h2>
          </div>
        )}
      </div>
    </div>
  );
};

export default Feed;
