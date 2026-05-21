import { useState, useRef, useEffect } from 'react'
import './App.css'
import BlindCoderIntro from './components/intro'
import WorldMap from './components/worldMap'
import IslandsCards from './components/IslandsCards'

function App() {
  const [view, setView] = useState('intro') // 'intro', 'map', or 'cards'
  const mapMusicRef = useRef(null)

  // Stop intro music when transitioning to map, and play map music
  useEffect(() => {
    if (view === 'map') {
      // Delay a bit to let intro music stop
      setTimeout(() => {
        if (mapMusicRef.current) {
          mapMusicRef.current.currentTime = 0
          mapMusicRef.current.play().catch((e) => console.log("Map music play error:", e))
        }
      }, 100)
    } else {
      // Stop map music when leaving
      if (mapMusicRef.current) {
        mapMusicRef.current.pause()
        mapMusicRef.current.currentTime = 0
      }
    }
  }, [view])

  return (
    <>
      {/* Map background music - hidden audio element */}
      <audio
        ref={mapMusicRef}
        src="/music/gamer-stream-music-rpg-_-adventure-background-music-9-476322 (1).mp3"
        loop
        volume={0.5}
      />

      {view === 'intro' && (
        <BlindCoderIntro onComplete={() => setView('map')} />
      )}
      {view === 'map' && (
        <div>
          <WorldMap />
          <button
            onClick={() => setView('cards')}
            style={{
              position: 'fixed',
              bottom: 16,
              right: 16,
              padding: '10px 20px',
              background: 'linear-gradient(135deg, #ffd700, #ffed4e)',
              border: 'none',
              borderRadius: 20,
              color: '#000',
              fontSize: 12,
              fontWeight: 'bold',
              cursor: 'pointer',
              zIndex: 100,
              boxShadow: '0 4px 12px rgba(0,0,0,0.3)',
            }}
          >
             View as Cards
          </button>
        </div>
      )}
      {view === 'cards' && (
        <div>
          <IslandsCards />
          <button
            onClick={() => setView('map')}
            style={{
              position: 'fixed',
              bottom: 16,
              right: 16,
              padding: '10px 20px',
              background: 'linear-gradient(135deg, #00f5ff, #00d4ff)',
              border: 'none',
              borderRadius: 20,
              color: '#000',
              fontSize: 12,
              fontWeight: 'bold',
              cursor: 'pointer',
              zIndex: 100,
              boxShadow: '0 4px 12px rgba(0,0,0,0.3)',
            }}
          >
             View as Map
          </button>
        </div>
      )}
    </>
  )
}

export default App

