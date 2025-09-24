

import React, { useState, useEffect, useRef } from "react";
import "./App.css"; // import CSS file

const QUOTES = [
  {
    id: 1,
    text: "It is only with the heart that one can see rightly; what is essential is invisible to the eye.",
    author: "Antoine de Saint-Exupéry",
    book: "The Little Prince"
  },
  {
    id: 2,
    text: "The world breaks everyone, and afterward, some are strong at the broken places.",
    author: "Ernest Hemingway",
    book: "A Farewell to Arms"
  },
  {
    id: 3,
    text: "Not all those who wander are lost.",
    author: "J.R.R. Tolkien",
    book: "The Fellowship of the Ring"
  }
];

export default function BookQuoteShorts({ autoplay = true, autoplayInterval = 4000 }) {
  const [index, setIndex] = useState(0);
  const [liked, setLiked] = useState(() => new Set());
  const timerRef = useRef(null);

  useEffect(() => {
    if (!autoplay) return;
    
    startTimer();
    return stopTimer;
    // eslint-disable-next-line
  }, [index, autoplay]);

  function startTimer() {
    stopTimer();
    timerRef.current = setTimeout(() => handleNext(), autoplayInterval);
  }

  function stopTimer() {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
  }

  function handleNext() {
    setIndex((i) => (i + 1) % QUOTES.length);
  }

  function handlePrev() {
    setIndex((i) => (i - 1 + QUOTES.length) % QUOTES.length);
  }

  function toggleLike(id) {
    setLiked((prev) => {
      const copy = new Set(prev);
      if (copy.has(id)) copy.delete(id);
      else copy.add(id);
      return copy;
    });
  }

  function mockShare(q) {
    const payload = `"${q.text}" — ${q.author}, ${q.book}`;
    if (navigator.clipboard) navigator.clipboard.writeText(payload);
    alert("Copied quote text to clipboard (mock share):\n" + payload);
  }

  const current = QUOTES[index];

  return (
    <div className="app-container">
      <div className="quote-box">
        <div className="header">
          <h2>Book Quote Shorts</h2>
          <div className="controls">
            <button onClick={() => setIndex(0)}>Restart</button>
            <button onClick={() => (autoplay ? stopTimer() : startTimer())}>
              {autoplay ? "Auto" : "Play"}
            </button>
          </div>
        </div>

        <div className="quote-viewer">
          <div key={current.id} className="quote-content fade-in">
            <blockquote>“{current.text}”</blockquote>
            <p className="author">— {current.author}, <em>{current.book}</em></p>

            <div className="actions">
              <button
                onClick={() => toggleLike(current.id)}
                className={liked.has(current.id) ? "liked" : ""}
              >
                {liked.has(current.id) ? "♥ Liked" : "♡ Like"}
              </button>
              <button onClick={() => mockShare(current)}>Share</button>
            </div>
          </div>
        </div>

        <div className="footer">
          <div>
            <button onClick={handlePrev}>Prev</button>
            <button onClick={handleNext}>Next</button>
          </div>
          <span>{index + 1} / {QUOTES.length}</span>
        </div>
      </div>
    </div>
  );
}


