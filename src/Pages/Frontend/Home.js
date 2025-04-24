import React from 'react'
import '../../SCSS/Pages/_home.scss'
import Header from 'Components/Header'
import { useNavigate } from 'react-router-dom'
export default function Home() {
  const navigate = useNavigate();
  return (
    <div className='home'>
      <Header />
      <section className="how-it-works mt-5 py-5">
        <div className="container text-center ">
          <h2 className="mb-4 fw-bold">How Moodify Works ?</h2>
          <div className="row">
            <div className="col-md-4">
              <div className="step p-4 shadow-sm mt-3">
                <div className="icon display-4 text-primary mb-3">😊</div>
                <h3 className="h5">Pick Your Mood</h3>
                <p>Choose an emoji that best represents your mood.</p>
              </div>
            </div>
            <div className="col-md-4">
              <div className="step p-4 shadow-sm mt-3">
                <div className="icon display-4 text-primary mb-3">✨</div>
                <h3 className="h5">Let Moodify Work Its Magic</h3>
                <p>Our AI curates a personalized playlist for you.</p>
              </div>
            </div>
            <div className="col-md-4">
              <div className="step p-4 shadow-sm mt-3">
                <div className="icon display-4 text-primary mb-3">🎵</div>
                <h3 className="h5">Hit Play and Enjoy</h3>
                <p>Immerse yourself in music that vibes with you.</p>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="mood-explorer py-5">
        <div className="container-fluid">
          <h2 className="text-center mb-4 fw-bold">Discover Your Mood !</h2>
          <div className="scroll-wrapper d-flex overflow-auto">
            <div className="mood-item happy d-flex flex-column align-items-center">
              <div className="emoji display-1">😊</div>
              <h5 className="fw-bold mt-3">Happy</h5>
              <p className="text-center px-3">Uplifting tunes to keep your spirits high.</p>
            </div>
            <div className="mood-item sad d-flex flex-column align-items-center">
              <div className="emoji display-1">😔</div>
              <h5 className="fw-bold mt-3">Sad</h5>
              <p className="text-center px-3">Reflective music for your thoughtful side.</p>
            </div>
            <div className="mood-item romantic d-flex flex-column align-items-center">
              <div className="emoji display-1">❤️</div>
              <h5 className="fw-bold mt-3">Romantic</h5>
              <p className="text-center px-3">Songs that speak to the heart.</p>
            </div>
            <div className="mood-item cool d-flex flex-column align-items-center">
              <div className="emoji display-1">😎</div>
              <h5 className="fw-bold mt-3">Confident</h5>
              <p className="text-center px-3">Bold beats to elevate your swagger.</p>
            </div>
            <div className="mood-item relaxed d-flex flex-column align-items-center">
              <div className="emoji display-1">🛋️</div>
              <h5 className="fw-bold mt-3">Relaxed</h5>
              <p className="text-center px-3">Chill vibes to help you unwind.</p>
            </div>
            <div className="mood-item energetic d-flex flex-column align-items-center">
              <div className="emoji display-1">💪</div>
              <h5 className="fw-bold mt-3">Energetic</h5>
              <p className="text-center px-3">High-energy beats to keep you moving.</p>
            </div>
          </div>
        </div>
      </section>
      <button className="cta mt-4 d-flex  align-items-center" onClick={() => {
        window.scrollTo(0, 0);
        navigate("/agent");
      }}>
        <span>Make Now</span>
        <svg width="15px" height="10px" viewBox="0 0 13 10">
          <path d="M1,5 L11,5"></path>
          <polyline points="8 1 12 5 8 9"></polyline>
        </svg>
      </button>
      {/* section 2 */}
      <section className="features py-5 ">
        <div className="container text-center">
          <h2 className="mb-4 fw-bold">Why Moodify ?</h2>
          <div className="row">
            <div className="col-md-4 mb-4">
              <div className="feature-box p-4 shadow-sm rounded">
                <h5 className="text-primary mb-3">🎭 Emoji-Based Mood Detection</h5>
                <p className="text-muted">Easily select your mood using fun and expressive emojis.</p>
              </div>
            </div>
            <div className="col-md-4 mb-4">
              <div className="feature-box p-4 shadow-sm rounded">
                <h5 className="text-success mb-3">🤖 AI-Powered Playlists</h5>
                <p className="text-muted">Get the perfect playlist tailored to your mood with smart AI.</p>
              </div>
            </div>
            <div className="col-md-4 mb-4">
              <div className="feature-box p-4 shadow-sm rounded">
                <h5 className="text-danger mb-3">🔗 Share with Friends</h5>
                <p className="text-muted">Instantly share your curated playlists with friends and family.</p>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-md-4 mb-4">
              <div className="feature-box p-4 shadow-sm rounded">
                <h5 className="text-warning mb-3">🔄 New Vibes Every Time</h5>
                <p className="text-muted">Enjoy a new selection of playlists with every mood change.</p>
              </div>
            </div>
            <div className="col-md-4 mb-4">
              <div className="feature-box p-4 shadow-sm rounded">
                <h5 className="text-info mb-3">📱 Cross-Platform Support</h5>
                <p className="text-muted">Use Moodify on any device seamlessly, anywhere.</p>
              </div>
            </div>
            <div className="col-md-4 mb-4">
              <div className="feature-box p-4 shadow-sm rounded">
                <h5 className="text-secondary mb-3">🎨 Mood-Based Themes</h5>
                <p className="text-muted">Enjoy a personalized visual experience based on your mood.</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
