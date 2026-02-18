import { useParams } from "react-router-dom";

const institutes: Record<string, any> = {
  "IIT Hyderabad": {
    verified: true,
    events: [{ title: "IIT Hackathon", deadline: "20 Jan" }],
  },
  "Tech University": {
    verified: false,
    events: [{ title: "AI Workshop", deadline: "25 Jan" }],
  },
};

const InstituteProfile = () => {
  const { name } = useParams();
  const institute = institutes[name || ""];

  if (!institute) return <h2 style={{ color: "#fff" }}>Not found</h2>;

  return (
    <div style={{ background: "#000", color: "#fff", padding: "24px" }}>
      <h1>
        {name} {institute.verified && "✔️"}
      </h1>
      <p>{institute.verified ? "Verified Institute" : "Unverified"}</p>

      <h3 style={{ marginTop: "20px" }}>Events</h3>
      {institute.events.map((e: any, i: number) => (
        <div key={i} style={{ background: "#111", padding: "12px", marginTop: "8px" }}>
          <h4>{e.title}</h4>
          <p>Deadline: {e.deadline}</p>
        </div>
      ))}
    </div>
  );
};

export default InstituteProfile;
