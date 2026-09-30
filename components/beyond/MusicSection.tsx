const spotifyPlaylists = [
  {
    id: "spotify-1",
    embedUrl: "https://open.spotify.com/embed/playlist/37i9dQZF1DXcBWIGoYBM5M",
    label: "Today's Top Hits",
  },
];

export function MusicSection() {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
      {spotifyPlaylists.map((pl) => (
        <div key={pl.id}>
          {pl.label && (
            <p style={{ fontSize: "0.75rem", color: "#555", marginBottom: "0.4rem" }}>{pl.label}</p>
          )}
          <div style={{ borderRadius: "8px", overflow: "hidden" }}>
            <iframe
              src={pl.embedUrl}
              width="100%"
              height="152"
              allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
              loading="lazy"
              style={{ border: "none", display: "block", borderRadius: "8px" }}
              title={pl.label}
            />
          </div>
        </div>
      ))}
    </div>
  );
}
