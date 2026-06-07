import { activityLabelStyle, mediaLinkCardStyle } from "./Section";

const books = [
  {
    id: "book-1",
    title: "The Metamorphosis",
    author: "Franz kafka",
    link: "https://www.goodreads.com/book/show/485894.The_Metamorphosis",
    currentlyReading: false,
  },
  {
    id: "book-2",
    title: "Blood Meridian",
    author: "Conon McCarthy",
    link: "https://www.goodreads.com/book/show/394535.Blood_Meridian_or_the_Evening_Redness_in_the_West",
    currentlyReading: true,
  },
];

interface MediaItem {
  id: string;
  title: string;
  type: "movie" | "show";
  link: string;
  note?: string;
}

const media: MediaItem[] = [
  // {
  //   id: "media-1",
  //   title: "Interstellar",
  //   type: "movie",
  //   link: "https://www.imdb.com/title/tt0816692/",
  //   note: "Christopher Nolan's masterpiece on time, love, and survival.",
  // },
];

export function MiscSection() {
  return (
    <>
      {/* Books */}
      <div style={{ marginBottom: "1.8rem" }}>
        <p style={{ ...activityLabelStyle, marginBottom: "0.8rem" }}>Books</p>
        <div style={{ display: "flex", flexDirection: "column", gap: "0.6rem" }}>
          {books.map((book) => (
            <a key={book.id} href={book.link} target="_blank" rel="noopener noreferrer" style={{ textDecoration: "none" }}>
              <div style={{ ...mediaLinkCardStyle, borderColor: book.currentlyReading ? "#00ff8830" : "#1e1e1e" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", flexWrap: "wrap" }}>
                  <span style={{ fontSize: "0.88rem", color: "#d4d4d4", fontWeight: 500 }}>{book.title}</span>
                  {book.currentlyReading && (
                    <span style={{
                      fontSize: "0.6rem",
                      letterSpacing: "0.08em",
                      textTransform: "uppercase",
                      background: "#00ff8815",
                      border: "1px solid #00ff8840",
                      color: "#00ff88",
                      padding: "0.1rem 0.4rem",
                      borderRadius: "2px",
                    }}>
                      currently reading
                    </span>
                  )}
                </div>
                <span style={{ fontSize: "0.76rem", color: "#555" }}>{book.author}</span>
              </div>
            </a>
          ))}
        </div>
      </div>

      {/* <div>
        <p style={{ ...activityLabelStyle, marginBottom: "0.8rem" }}>Movies &amp; Shows</p>
        <div style={{ display: "flex", flexDirection: "column", gap: "0.6rem" }}>
          {media.map((item) => (
            <a key={item.id} href={item.link} target="_blank" rel="noopener noreferrer" style={{ textDecoration: "none" }}>
              <div style={mediaLinkCardStyle}>
                <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", flexWrap: "wrap" }}>
                  <span style={{ fontSize: "0.88rem", color: "#d4d4d4", fontWeight: 500 }}>{item.title}</span>
                  <span style={{
                    fontSize: "0.6rem",
                    letterSpacing: "0.08em",
                    textTransform: "uppercase",
                    color: "#555",
                    border: "1px solid #2a2a2a",
                    padding: "0.1rem 0.4rem",
                    borderRadius: "2px",
                  }}>
                    {item.type}
                  </span>
                </div>
                {item.note && <span style={{ fontSize: "0.76rem", color: "#666" }}>{item.note}</span>}
              </div>
            </a>
          ))}
        </div>
      </div> */}
    </>
  );
}
