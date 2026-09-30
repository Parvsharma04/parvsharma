import { activityLabelStyle } from "./Section";

const timestampStyle: React.CSSProperties = {
  fontSize: "0.72rem",
  color: "#555",
  fontWeight: 400,
  textTransform: "none",
  letterSpacing: "normal",
};

export function HobbiesSection() {
  return (
    <>
      {/* Swimming */}
      <div style={{ marginBottom: "2rem" }}>
        <p style={activityLabelStyle}>
          Swimming <span style={timestampStyle}>— Aug 2026</span>
        </p>
        <p style={{ fontSize: "0.85rem", color: "#bbb", lineHeight: "1.6" }}>
          Recently got into swimming. Learnt breaststroke from scratch and got
          decent at freestyle since.
        </p>
      </div>

      {/* Marathon */}
      <div style={{ marginBottom: "2rem" }}>
        <p style={activityLabelStyle}>
          Marathon Running <span style={timestampStyle}>— 14 Dec 2025</span>
        </p>
        <p style={{ fontSize: "0.85rem", color: "#bbb", lineHeight: "1.6" }}>
          Ran my first official 10K this year. Finished in{" "}
          <strong style={{ color: "#00ff88" }}>1:19:35</strong>. The last 2km
          were entirely mental — legs gave out, brain didn&apos;t.
        </p>
      </div>

      {/* Bowling */}
      <div style={{ marginBottom: "2rem" }}>
        <p style={activityLabelStyle}>
          Bowling <span style={timestampStyle}>— Aug 2025</span>
        </p>
        <p style={{ fontSize: "0.85rem", color: "#bbb", lineHeight: "1.6" }}>
          A hobby discovered over the last few months. Still working on that hook release.
        </p>
      </div>

      {/* Trekking */}
      <div style={{ marginBottom: "2rem" }}>
        <p style={activityLabelStyle}>
          Trekking &amp; Outdoors <span style={timestampStyle}>— Aug 2025</span>
        </p>
        <p style={{ fontSize: "0.85rem", color: "#bbb", lineHeight: "1.6" }}>
          Weekends on natural trails, stepping away from monitors.
        </p>
      </div>

      {/* Guitar */}
      <div>
        <p style={activityLabelStyle}>Guitar</p>
        <p style={{ fontSize: "0.85rem", color: "#bbb", lineHeight: "1.6" }}>
          Blues, rock, metal, and the occasional Bollywood tune. Playing on a{" "}
          <strong style={{ color: "#00ff88" }}>Fender Frontman 10G</strong> amp
          through a <strong style={{ color: "#00ff88" }}>Jackson Dinky JS22</strong>.
        </p>
      </div>
    </>
  );
}
