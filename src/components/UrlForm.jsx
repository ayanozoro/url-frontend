import React, { useState } from "react";
import axios from "axios";
import { API_BASE_URL } from "../config";
import "./UrlForm.css"; // Import the new CSS file

const UrlForm = () => {
  const [longUrl, setLongUrl] = useState("");
  const [shortUrl, setShortUrl] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  const isValidUrl = (url) => {
    try {
      new URL(url);
      return true;
    } catch (err) {
      return false;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setShortUrl("");
    setCopied(false);

    if (!longUrl.trim()) {
      setError("⚠️ Please enter a URL");
      return;
    }

    if (!isValidUrl(longUrl)) {
      setError("⚠️ Please enter a valid URL (include http:// or https://)");
      return;
    }

    setLoading(true);
    try {
      const res = await axios.post(`${API_BASE_URL}/api/shorten`, {
        longUrl,
      });
      setShortUrl(res.data.shortUrl);
    } catch (err) {
      setError(err.response?.data?.error || "❌ Failed to shorten URL. Try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(shortUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="url-container">
      <div className="url-card">
        <h2 className="url-title">🔗 URL Shortener</h2>
        <form onSubmit={handleSubmit} className="url-form">
          <input
            type="url"
            placeholder="Enter your long URL here..."
            value={longUrl}
            onChange={(e) => setLongUrl(e.target.value)}
            required
            className={`url-input ${error ? "error" : ""}`}
          />
          <button type="submit" className="url-btn" disabled={loading}>
            {loading ? "⏳ Shortening..." : "⚡ Shorten"}
          </button>
        </form>

        {error && <p className="url-error">{error}</p>}

        {shortUrl && (
          <div className="url-result">
            <p style={{color:'black'}}>✅ Your Short URL:</p>
            <div className="short-url-box">
              <a href={shortUrl} target="_blank" rel="noreferrer">
                {shortUrl}
              </a>
              <button className="copy-btn" onClick={handleCopy}>
                {copied ? "✔ Copied" : "📋 Copy"}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default UrlForm;
