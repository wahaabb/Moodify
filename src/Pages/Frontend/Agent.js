import React, { useState, useEffect } from "react";
import axios from "axios";
import "../../SCSS/Pages/_agent.scss";
import TopNav from '../../Components/Header/TopNav'
const moods = [
  { emoji: "😊", mood: "happy mood", bg: "#FFD700" },
  { emoji: "😢", mood: "sad music", bg: "#2C3E50" },
  { emoji: "❤️", mood: "love songs", bg: "red" },
  { emoji: "😎", mood: "chill music", bg: "#16A085" },
  { emoji: "💪", mood: "workout music", bg: "#FF5733" },
  { emoji: "🌙", mood: "sleep music", bg: "#1A237E" },
  { emoji: "🎉", mood: "party music", bg: "#E91E63" },
];
const CLIENT_ID = "27e991b142fc40c6b0ffbc84bafddb01";
const CLIENT_SECRET = "a0b19e6da7ff4daf98aa6bc343afab4a";
const Agent = () => {
  const [selectedMood, setSelectedMood] = useState(null);
  const [bgColor, setBgColor] = useState("#222");
  const [token, setToken] = useState("");
  const [playlists, setPlaylists] = useState([]);
  const [loading, setLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);
  const [offset, setOffset] = useState(0);
  // State for the embedded player
  const [currentPlaylistId, setCurrentPlaylistId] = useState(null);
  // Share message state
  const [shareMessage, setShareMessage] = useState("");
  const [showShareMessage, setShowShareMessage] = useState(false);
  // Get Spotify API Token
  useEffect(() => {
    axios
      .post(
        "https://accounts.spotify.com/api/token",
        "grant_type=client_credentials",
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            Authorization: `Basic ${btoa(CLIENT_ID + ":" + CLIENT_SECRET)}`,
          },
        }
      )
      .then((res) => {
        setToken(res.data.access_token);
      })
      .catch((err) => console.error("Error getting token:", err));
  }, []);
  // Reset share message after displaying
  useEffect(() => {
    if (showShareMessage) {
      const timer = setTimeout(() => {
        setShowShareMessage(false);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [showShareMessage]);
  // Handle mood selection & fetch playlists
  const handleMoodSelect = (mood, refreshing = false) => {
    const displayMood = mood.mood.split(' ')[0]; // Take first word for display
    setSelectedMood(displayMood);
    setBgColor(mood.bg);
    setLoading(true);
    setPlaylists([]);
    setHasSearched(true);
    // Reset the current playlist when selecting a new mood
    setCurrentPlaylistId(null);
    // If it's a new mood selection (not refreshing), reset offset
    if (!refreshing) {
      setOffset(0);
    }
    // Use the current offset for the API call
    const currentOffset = refreshing ? offset + 4 : 0;
    axios
      .get(`https://api.spotify.com/v1/search?q=${mood.mood}&type=playlist&limit=20&offset=${currentOffset}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        if (res.data.playlists && res.data.playlists.items) {
          // Filter out incomplete playlists
          const filteredPlaylists = res.data.playlists.items.filter(playlist =>
            playlist &&
            playlist.images &&
            playlist.images.length > 0 &&
            playlist.name &&
            playlist.external_urls &&
            playlist.external_urls.spotify
          );
          // Take only the first 4 complete playlists
          setPlaylists(filteredPlaylists.slice(0, 4));
          // Update offset for next refresh
          if (refreshing) {
            setOffset(currentOffset);
          }
        } else {
          setPlaylists([]);
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching playlists:", err);
        setLoading(false);
      });
  };
  // Handle refresh button click
  const handleRefresh = () => {
    // Find the current mood object
    const currentMood = moods.find(m => m.mood.split(' ')[0] === selectedMood);
    if (currentMood) {
      handleMoodSelect(currentMood, true); // Pass true to indicate we're refreshing
    }
  };
  // Helper function to extract playlist ID from Spotify URI or URL
  const extractPlaylistId = (uri) => {
    if (uri.includes('spotify:playlist:')) {
      return uri.split('spotify:playlist:')[1];
    } else if (uri.includes('open.spotify.com/playlist/')) {
      return uri.split('open.spotify.com/playlist/')[1].split('?')[0];
    }
    return uri;
  };
  // Function to play a playlist
  const handlePlaylistSelect = (playlistId) => {
    setCurrentPlaylistId(extractPlaylistId(playlistId));
  };
  // Function to close the embedded player
  const closePlayer = () => {
    setCurrentPlaylistId(null);
  };
  // Function to share playlist
  const handleSharePlaylist = (playlistUrl, playlistName) => {
    if (navigator.share) {
      // Use Web Share API if available
      navigator.share({
        title: `Check out this ${selectedMood} playlist!`,
        text: `I found this amazing playlist "${playlistName}" on Moodify that matches my ${selectedMood} mood!`,
        url: playlistUrl
      })
    } else {
      // Fallback for browsers that don't support Web Share API
      fallbackShare(playlistUrl, playlistName);
    }
  };
  // Fallback share function to copy to clipboard
  const fallbackShare = (playlistUrl, playlistName) => {
    navigator.clipboard.writeText(playlistUrl)
      .then(() => {
        setShareMessage(`Link for "${playlistName}" copied to clipboard!`);
        setShowShareMessage(true);
      })
      .catch(err => {
        console.error('Failed to copy:', err);
        setShareMessage("Couldn't copy link. Try again later.");
        setShowShareMessage(true);
      });
  };
  return (
    <>
      <TopNav />
      <div className="agent-page" style={{ background: `linear-gradient(to bottom, ${bgColor}, #121212)` }}>
        <div className="content-wrapper">
          <h1 className="display-4 fw-bold">Moodify</h1>
          <h2>How are you feeling today?</h2>
          <div className="emoji-container">
            {moods.map((mood, index) => (
              <button
                key={index}
                className={`emoji-btn ${selectedMood === mood.mood.split(' ')[0] ? 'selected' : ''}`}
                onClick={() => handleMoodSelect(mood)}
                style={{
                  boxShadow: selectedMood === mood.mood.split(' ')[0] ? `0 0 15px ${mood.bg}` : 'none',
                  background: selectedMood === mood.mood.split(' ')[0] ? 'rgba(255, 255, 255, 0.1)' : 'transparent',
                  borderRadius: '50%'
                }}
              >
                {mood.emoji}
              </button>
            ))}
          </div>
          {selectedMood && <h3>Playlists for {selectedMood} mood</h3>}
          {/* Share message notification */}
          {showShareMessage && (
            <div className="share-notification">
              {shareMessage}
            </div>
          )}
          {/* Loading indicator */}
          {loading && (
            <div className="loading-container">
              <div className="loading-spinner"></div>
              <p>Finding the perfect playlists...</p>
            </div>
          )}
          {/* Embedded Spotify Player */}
          {currentPlaylistId && (
            <div className="spotify-player-container">
              <div className="player-header">
                <h4>Now Playing</h4>
                <button className="close-player-btn" onClick={closePlayer}>
                  ✕
                </button>
              </div>
              <iframe
                src={`https://open.spotify.com/embed/playlist/${currentPlaylistId}?utm_source=generator&theme=0`}
                width="100%"
                height="380"
                frameBorder="0"
                allowtransparency="true"
                allow="encrypted-media"
                title="Spotify Player"
              ></iframe>
            </div>
          )}
          {/* Display Playlists */}
          <div className="playlist-container">
            {!loading && playlists && playlists.length > 0 ? (
              playlists.map((playlist, index) => (
                <div key={playlist.id} className="playlist-card">
                  <div className="playlist-image-container">
                    <img src={playlist.images[0].url} alt={playlist.name} />
                    <div className="play-overlay">
                      <div className="button-container">
                        <button
                          onClick={() => handlePlaylistSelect(playlist.id)}
                          className="play-button"
                        >
                          Play
                        </button>
                        <button
                          onClick={() => handleSharePlaylist(playlist.external_urls.spotify, playlist.name)}
                          className="share-button"
                          aria-label="Share playlist"
                        >
                          🔗
                        </button>
                      </div>
                    </div>
                  </div>
                  <p className="playlist-name">{playlist.name}</p>
                  <p className="playlist-tracks">{playlist.tracks?.total || '?'} tracks</p>
                </div>
              ))
            ) : (
              <div className="no-playlists">Playlists appear here!!</div>
            )}
          </div>
        </div>
        {/* Refresh Button */}
        {selectedMood && !loading && playlists.length > 0 && (
          <button className="refresh-button mt-5" onClick={handleRefresh}>
            🔄 Refresh Playlists
          </button>
        )}
      </div>
    </>
  );
};
export default Agent;