import { cardStyle, activityLabelStyle } from "./Section";

export function HobbiesSection() {
  return (
    <>
      {/* Marathon */}
      <div style={{ marginBottom: "2rem" }}>
        <p style={activityLabelStyle}>Marathon Running</p>
        <p style={{ fontSize: "0.85rem", color: "#bbb", marginBottom: "0.9rem", lineHeight: "1.6" }}>
          Ran my first official 10K this year. Finished in{" "}
          <strong style={{ color: "#00ff88" }}>1:19:35</strong>. The last 2km
          were entirely mental — legs gave out, brain didn&apos;t.
        </p>
        <div style={{ ...cardStyle, maxWidth: "440px" }}>
          <img src="/marathon.jpg" alt="10K Marathon finish" style={{ width: "100%", display: "block" }} />
        </div>
      </div>

      {/* Bowling */}
      <div style={{ marginBottom: "2rem" }}>
        <p style={activityLabelStyle}>Bowling</p>
        <p style={{ fontSize: "0.85rem", color: "#bbb", marginBottom: "0.9rem", lineHeight: "1.6" }}>
          A hobby discovered over the last few months. Still working on that hook release.
        </p>
        <div style={{ ...cardStyle, maxWidth: "440px" }}>
          <video
            src="/bowling.mp4"
            controls
            autoPlay
            loop
            muted
            playsInline
            style={{ width: "100%", display: "block" }}
          />
        </div>
      </div>

      {/* Trekking */}
      <div>
        <p style={activityLabelStyle}>Trekking &amp; Outdoors</p>
        <p style={{ fontSize: "0.85rem", color: "#bbb", marginBottom: "0.9rem", lineHeight: "1.6" }}>
          Weekends on natural trails, stepping away from monitors.
        </p>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.75rem", maxWidth: "440px" }}>
          <div style={cardStyle}>
            <img src="/trek1.jpg" alt="Trek 1" style={{ width: "100%", display: "block" }} />
          </div>
          <div style={cardStyle}>
            <img src="/trek2.jpg" alt="Trek 2" style={{ width: "100%", display: "block" }} />
          </div>
        </div>
      </div>
    </>
  );
}
