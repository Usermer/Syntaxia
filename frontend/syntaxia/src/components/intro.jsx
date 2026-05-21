/* eslint-disable react-hooks/purity */
import { useState, useEffect, useRef, useCallback } from "react";
// import Math from "react-mathjax2";

const SCENES = [
  {
    id: 0,
    type: "black",
    duration: 1000,
    text: null,
  },
  {
    id: 1,
    type: "narration",
    duration: 3000,
    text: "Somewhere in a city that never sleeps...",
    sub: null,
  },
  {
    id: 2,
    type: "narration",
    duration: 3000,
    text: "2:37 AM.",
    sub: null,
  },
  {
    id: 3,
    type: "narration",
    duration: 4000,
    text: "Mira hasn't written a single line of code with her own hands tonight.",
    sub: null,
  },
  {
    id: 4,
    type: "chat",
    duration: 5500,
    messages: [
      { role: "user", text: "Generate me a complete REST API..." },
      { role: "ai", text: "Of course! Here's your API..." },
      { role: "user", text: "Now add the database." },
      { role: "ai", text: "With pleasure! Here's the schema..." },
    ],
  },
  {
    id: 5,
    type: "narration",
    duration: 4000,
    text: "Copy. Paste. Copy. Paste.",
    sub: "She called that 'working'.",
  },
  {
    id: 6,
    type: "glitch",
    duration: 3000,
    text: "Then something changed.",
    sub: null,
  },
  {
    id: 7,
    type: "light",
    duration: 3000,
    text:"A light — not from the screen.",
    sub: null,
  },
  {
    id: 8,
    type: "keys",
    duration: 4000,
    text: "The keys lit up one by one.",
    sub: "As if the stolen code wanted to speak to her.",
  },
  {
    id:9,
    type: "pixelize",
    duration: 4000,
    text: null,
    
  },
 
  
  {
    id: 10,
    type: "teleport",
    duration: 5000,
    text: null,
  },
  {
    id: 11,
    type: "title",
    duration: 99999,
    text: "Syntaxia presents — The Blind Coder",
    sub: "Learn. Grow. Return.",
  },
];

function useTypewriter(text, speed = 40, active = true) {
  const [displayed, setDisplayed] = useState("");
  useEffect(() => {
    if (!active || !text) return;
    let i = 0;
    const interval = setInterval(() => {
      i++;
      setDisplayed(text.slice(0, i));
      if (i >= text.length) clearInterval(interval);
    }, speed);
    return () => {
      clearInterval(interval);
      setDisplayed("");
    };
  }, [text, active, speed]);
  return displayed;
}

function Particles({ count = 60, color = "#00f5ff" }) {
  const particles = Array.from({ length: count }, (_, i) => ({
    id: i,
    // eslint-disable-next-line react-hooks/purity
    x: Math.random() * 100,
    // eslint-disable-next-line react-hooks/purity
    y: Math.random() * 100,
    size: Math.random() * 3 + 1,
    duration: Math.random() * 4 + 2,
    delay: Math.random() * 3,
    opacity: Math.random() * 0.7 + 0.2,
  }));
  return (
    <div style={{ position: "absolute", inset: 0, overflow: "hidden", pointerEvents: "none" }}>
      {particles.map((p) => (
        <div
          key={p.id}
          style={{
            position: "absolute",
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: p.size,
            height: p.size,
            borderRadius: "50%",
            background: color,
            opacity: p.opacity,
            animation: `floatUp ${p.duration}s ${p.delay}s infinite ease-in-out`,
            boxShadow: `0 0 ${p.size * 3}px ${color}`,
          }}
        />
      ))}
    </div>
  );
}


function GlitchText({ text, style = {} }) {
  return (
    <div style={{ position: "relative", display: "inline-block", ...style }}>
      <span style={{ position: "relative", zIndex: 2 }}>{text}</span>
      <span
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          color: "#ff003c",
          animation: "glitchR 0.3s infinite",
          clipPath: "polygon(0 20%, 100% 20%, 100% 40%, 0 40%)",
          opacity: 0.8,
        }}
      >
        {text}
      </span>
      <span
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          color: "#00f5ff",
          animation: "glitchL 0.3s 0.15s infinite",
          clipPath: "polygon(0 60%, 100% 60%, 100% 80%, 0 80%)",
          opacity: 0.8,
        }}
      >
        {text}
      </span>
    </div>
  );
}

function Keyboard({ activeKeys = [] }) {
  const rows = [
    ["Q","W","E","R","T","Y","U","I","O","P"],
    ["A","S","D","F","G","H","J","K","L"],
    ["Z","X","C","V","B","N","M"],
  ];
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 6, alignItems: "center" }}>
      {rows.map((row, ri) => (
        <div key={ri} style={{ display: "flex", gap: 5 }}>
          {row.map((k) => {
            const lit = activeKeys.includes(k);
            return (
              <div
                key={k}
                style={{
                  width: 36,
                  height: 36,
                  borderRadius: 6,
                  background: lit ? "rgba(0,245,255,0.2)" : "rgba(255,255,255,0.03)",
                  border: `1px solid ${lit ? "#00f5ff" : "rgba(255,255,255,0.1)"}`,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 11,
                  color: lit ? "#00f5ff" : "rgba(255,255,255,0.3)",
                  boxShadow: lit ? "0 0 12px #00f5ff, 0 0 24px rgba(0,245,255,0.4)" : "none",
                  transition: "all 0.2s ease",
                  fontFamily: "monospace",
                  fontWeight: lit ? "bold" : "normal",
                }}
              >
                {k}
              </div>
            );
          })}
        </div>
      ))}
    </div>
  );
}

function ChatScene({ messages, visible }) {
  const [shown, setShown] = useState(0);
  useEffect(() => {
    if (!visible) return;
    let i = 0;
    const t = setInterval(() => {
      i++;
      setShown(i);
      if (i >= messages.length) clearInterval(t);
    }, 900);
    return () => {
      clearInterval(t);
      setShown(0);
    };
  }, [visible, messages.length]);

  return (
    <div style={{
      width: "100%",
      maxWidth: 500,
      background: "rgba(0,0,0,0.7)",
      border: "1px solid rgba(0,245,255,0.2)",
      borderRadius: 12,
      padding: "20px",
      backdropFilter: "blur(10px)",
    }}>
      <div style={{
        display: "flex",
        alignItems: "center",
        gap: 8,
        marginBottom: 16,
        borderBottom: "1px solid rgba(255,255,255,0.05)",
        paddingBottom: 12,
      }}>
        <div style={{ width: 10, height: 10, borderRadius: "50%", background: "#00f5ff", boxShadow: "0 0 8px #00f5ff" }} />
        <span style={{ fontSize: 12, color: "rgba(255,255,255,0.5)", fontFamily: "monospace" }}>AI Assistant — Connected</span>
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        {messages.slice(0, shown).map((m, i) => (
          <div key={i} style={{
            display: "flex",
            justifyContent: m.role === "user" ? "flex-end" : "flex-start",
            animation: "fadeSlideUp 0.4s ease",
          }}>
            <div style={{
              maxWidth: "80%",
              padding: "8px 14px",
              borderRadius: m.role === "user" ? "16px 16px 4px 16px" : "16px 16px 16px 4px",
              background: m.role === "user"
                ? "linear-gradient(135deg, rgba(0,245,255,0.2), rgba(0,150,255,0.2))"
                : "rgba(255,255,255,0.05)",
              border: `1px solid ${m.role === "user" ? "rgba(0,245,255,0.3)" : "rgba(255,255,255,0.1)"}`,
              color: m.role === "user" ? "#e0f9ff" : "rgba(255,255,255,0.7)",
              fontSize: 13,
              fontFamily: "'Courier New', monospace",
            }}>
              {m.text}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function PixelizeEffect() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const COLS = 40;
    const ROWS = 25;
    const pw = canvas.width / COLS;
    const ph = canvas.height / ROWS;

    // Génère les pixels avec couleurs Syntaxia
    const pixels = [];
    for (let r = 0; r < ROWS; r++) {
      for (let c = 0; c < COLS; c++) {
        const palette = ["#00f5ff","#0a0a2e","#001a3a","#ffd700","#ffffff","#003366"];
        pixels.push({
          x: c * pw,
          y: r * ph,
          w: pw,
          h: ph,
          color: palette[Math.floor(Math.random() * palette.length)],
          opacity: 1,
          // Chaque pixel s'envole dans une direction aléatoire
          vx: (Math.random() - 0.5) * 12,
          vy: (Math.random() - 0.5) * 12,
          delay: Math.random() * 1500, // délai avant de s'envoler
          startTime: null,
        });
      }
    }

    const FLY_DURATION = 1800;
    let animStart = null;

    const animate = (timestamp) => {
      if (!animStart) animStart = timestamp;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = "#000";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      let allGone = true;

      pixels.forEach((p) => {
        const elapsed = timestamp - animStart;
        if (elapsed < p.delay) {
          // Pixel encore en place — petit tremblement
          const shake = Math.sin(elapsed * 0.05 + p.x) * 2;
          ctx.globalAlpha = 1;
          ctx.fillStyle = p.color;
          ctx.fillRect(p.x + shake, p.y, p.w - 1, p.h - 1);
          allGone = false;
          return;
        }

        if (!p.startTime) p.startTime = timestamp;
        const t = (timestamp - p.startTime) / FLY_DURATION;

        if (t < 1) {
          allGone = false;
          const ease = t * t; // accélération
          ctx.globalAlpha = Math.max(0, 1 - t * 1.2);
          ctx.fillStyle = p.color;
          ctx.fillRect(
            p.x + p.vx * ease * 80,
            p.y + p.vy * ease * 80,
            p.w * (1 - t * 0.5),
            p.h * (1 - t * 0.5)
          );
        }
      });

      ctx.globalAlpha = 1;

      if (!allGone) requestAnimationFrame(animate);
      else {
        // Flash blanc à la fin avant téléportation
        ctx.fillStyle = "#ffffff";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
      }
    };

    requestAnimationFrame(animate);

    return () => ctx.clearRect(0, 0, canvas.width, canvas.height);
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 50,
        pointerEvents: "none",
      }}
    />
  );
}

export default function BlindCoderIntro({ onComplete }) {
  const [sceneIdx, setSceneIdx] = useState(0);
  const [fadeIn, setFadeIn] = useState(true);
  const [started, setStarted] = useState(false);
  const [activeKeys, setActiveKeys] = useState([]);
  const [isMuted, setIsMuted] = useState(false);
  const timerRef = useRef(null);
  const keyTimerRef = useRef(null);
  const audioRef = useRef(null);

  const allKeys = "QWERTYUIOPASDFGHJKLZXCVBNM".split("");

  const scene = SCENES[sceneIdx];

  const nextScene = useCallback(() => {
    setFadeIn(false);
    setTimeout(() => {
      setSceneIdx((prev) => Math.min(prev + 1, SCENES.length - 1));
      setFadeIn(true);
    }, 600);
  }, []);

  useEffect(() => {
    if (!started) return;
    if (scene.duration === 99999) return;
    timerRef.current = setTimeout(nextScene, scene.duration);
    return () => clearTimeout(timerRef.current);
  }, [sceneIdx, started, scene.duration, nextScene]);

  useEffect(() => {
    if (!started) return;
    if (scene.type === "keys") {
      const cycle = () => {
        const count = Math.floor(Math.random() * 5) + 2;
        const keys = Array.from({ length: count }, () => allKeys[Math.floor(Math.random() * allKeys.length)]);
        setActiveKeys(keys);
        keyTimerRef.current = setTimeout(cycle, 250);
      };
      cycle();
      return () => clearTimeout(keyTimerRef.current);
    }
    return () => setActiveKeys([]);
  }, [sceneIdx, started, scene.type, allKeys]);

  // Gestion de l'audio
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    if (started && !isMuted) {
      audio.play().catch((e) => console.log("Audio play error:", e));
    } else {
      audio.pause();
    }
  }, [started, isMuted]);


  const mainText = useTypewriter(
    scene.type === "narration" || scene.type === "glitch" || scene.type === "light" || scene.type === "keys"
      ? scene.text
      : null,
    45,
    fadeIn && started
  );

  const subText = useTypewriter(
    scene.sub || null,
    35,
    fadeIn && started && mainText?.length === (scene.text?.length || 0)
  );

  if (!started) {
    return (
      <div style={{
        width: "100vw", height: "100vh",
        background: "#000",
        display: "flex", flexDirection: "column",
        alignItems: "center", justifyContent: "center",
        fontFamily: "'Georgia', serif",
        cursor: "default",
        position: "relative",
        overflow: "hidden",
      }}>
        <style>{`
          @import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@400;700;900&family=Crimson+Text:ital,wght@0,400;1,400&display=swap');
          @keyframes floatUp {
            0%, 100% { transform: translateY(0px) scale(1); opacity: 0.3; }
            50% { transform: translateY(-20px) scale(1.2); opacity: 0.8; }
          }
          @keyframes pulseGlow {
            0%, 100% { box-shadow: 0 0 20px rgba(0,245,255,0.3), 0 0 60px rgba(0,245,255,0.1); }
            50% { box-shadow: 0 0 40px rgba(0,245,255,0.6), 0 0 100px rgba(0,245,255,0.3); }
          }
          @keyframes fadeIn { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
          @keyframes shimmer {
            0% { background-position: -200% center; }
            100% { background-position: 200% center; }
          }
        `}</style>
        <Particles count={40} color="#00f5ff" />
        <Particles count={20} color="#ffd700" />

        <div style={{
          textAlign: "center",
          animation: "fadeIn 2s ease",
          zIndex: 10,
        }}>
          <div style={{
            fontSize: 11,
            letterSpacing: 8,
            color: "rgba(0,245,255,0.6)",
            fontFamily: "'Cinzel', serif",
            marginBottom: 20,
            textTransform: "uppercase",
          }}>
            A Story of Code and Light
          </div>

          <h1 style={{
            padding:"20px 30px",
            fontSize: "clamp(16px, 8vw, 72px)",
            fontFamily: "'Cinzel', serif",
            fontWeight: 700,
            letterSpacing: 6,
            background: "linear-gradient(135deg, #ffd700 0%, #fff8dc 40%, #ffd700 60%, #b8860b 100%)",
            backgroundSize: "400% auto",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            animation: "shimmer 3s linear infinite",
            margin: "0 0 8px 0",
            textShadow: "none",
          }}>
            THE BLIND CODER
          </h1>

          <div style={{
            width: 200,
            height: 1,
            background: "linear-gradient(90deg, transparent, #ffd700, transparent)",
            margin: "0 auto 24px",
          }} />

          <p style={{
            fontFamily: "'Crimson Text', serif",
            fontStyle: "italic",
            color: "rgba(255,248,220,0.5)",
            fontSize: 16,
            marginBottom: 50,
            letterSpacing: 1,
          }}>
            Learn. Grow. Return.
          </p>

          <button
            onClick={() => setStarted(true)}
            style={{
              background: "transparent",
              border: "1px solid rgba(255,215,0,0.4)",
              color: "#ffd700",
              padding: "14px 48px",
              fontSize: 13,
              letterSpacing: 5,
              fontFamily: "'Cinzel', serif",
              cursor: "pointer",
              textTransform: "uppercase",
              transition: "all 0.3s ease",
              animation: "pulseGlow 2s ease-in-out infinite",
            }}
            onMouseEnter={(e) => {
              e.target.style.background = "rgba(255,215,0,0.1)";
              e.target.style.borderColor = "#ffd700";
            }}
            onMouseLeave={(e) => {
              e.target.style.background = "transparent";
              e.target.style.borderColor = "rgba(255,215,0,0.4)";
            }}
          >
            Start
          </button>
        </div>
      </div>
    );
  }

  return (
    <div style={{
      width: "100vw",
      height: "100vh",
      background: scene.type === "teleport"
        ? "radial-gradient(ellipse at center, #001a3a 0%, #000 60%)"
        : scene.type === "title"
        ? "radial-gradient(ellipse at center, #0a0a1a 0%, #000 70%)"
        : "#000",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      position: "relative",
      overflow: "hidden",
      transition: "background 1s ease",
    }}>
      <audio
        ref={audioRef}
        src="/music/tunetank-80s-retro-arcade-music-347245.mp3"
        loop
        volume="0.5"
        style={{ display: "none" }}
      />
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@400;700;900&family=Crimson+Text:ital,wght@0,400;1,400&display=swap');

        @keyframes floatUp {
          0%, 100% { transform: translateY(0px); opacity: 0.3; }
          50% { transform: translateY(-30px); opacity: 0.9; }
        }
        @keyframes glitchR {
          0% { transform: translate(2px, 0); }
          33% { transform: translate(-2px, 1px); }
          66% { transform: translate(1px, -1px); }
          100% { transform: translate(2px, 0); }
        }
        @keyframes glitchL {
          0% { transform: translate(-2px, 0); }
          33% { transform: translate(2px, -1px); }
          66% { transform: translate(-1px, 1px); }
          100% { transform: translate(-2px, 0); }
        }
        @keyframes fadeSlideUp {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes sceneIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes teleportPulse {
          0% { transform: scale(0.5); opacity: 0; }
          50% { transform: scale(1.2); opacity: 1; }
          100% { transform: scale(1); opacity: 0.8; }
        }
        @keyframes ringExpand {
          0% { transform: scale(0); opacity: 1; }
          100% { transform: scale(4); opacity: 0; }
        }
        @keyframes titleReveal {
          0% { opacity: 0; transform: scale(0.8) translateY(30px); filter: blur(20px); }
          100% { opacity: 1; transform: scale(1) translateY(0); filter: blur(0); }
        }
        @keyframes shimmer {
          0% { background-position: -200% center; }
          100% { background-position: 200% center; }
        }
        @keyframes scanline {
          0% { top: -5%; }
          100% { top: 105%; }
        }
        @keyframes flicker {
          0%, 95%, 100% { opacity: 1; }
          96% { opacity: 0.4; }
          98% { opacity: 0.8; }
        }
        .scene-wrapper {
          animation: sceneIn 0.6s ease;
          opacity: ${fadeIn ? 1 : 0};
          transition: opacity 0.6s ease;
        }
      `}</style>

      {/* Scanline overlay */}
      {scene.type !== "title" && (
        <div style={{
          position: "absolute",
          inset: 0,
          background: "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.03) 2px, rgba(0,0,0,0.03) 4px)",
          pointerEvents: "none",
          zIndex: 20,
        }} />
      )}

      {/* Moving scanline */}
      {(scene.type === "glitch" || scene.type === "keys") && (
        <div style={{
          position: "absolute",
          left: 0, right: 0,
          height: "3px",
          background: "linear-gradient(90deg, transparent, rgba(0,245,255,0.4), transparent)",
          animation: "scanline 2s linear infinite",
          pointerEvents: "none",
          zIndex: 21,
        }} />
      )}

      {/* Particles for light/teleport scenes */}
      {(scene.type === "light" || scene.type === "teleport" || scene.type === "title") && (
        <Particles count={50} color={scene.type === "title" ? "#ffd700" : "#00f5ff"} />
      )}

      <div className="scene-wrapper" style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: 40,
        maxWidth: 700,
        textAlign: "center",
        zIndex: 10,
        width: "100%",
      }}>

        {/* BLACK */}
        {scene.type === "black" && (
          <div />
        )}

        {/* NARRATION */}
        {scene.type === "narration" && (
          <div>
            <p style={{
              fontFamily: "'Crimson Text', serif",
              fontSize: "clamp(20px, 4vw, 30px)",
              color: "rgba(255,248,220,0.9)",
              fontStyle: "italic",
              lineHeight: 1.6,
              letterSpacing: 1,
              marginBottom: scene.sub ? 20 : 0,
              animation: "flicker 8s infinite",
            }}>
              {mainText}
              <span style={{ opacity: 0.5 }}>|</span>
            </p>
            {scene.sub && subText && (
              <p style={{
                fontFamily: "'Crimson Text', serif",
                fontSize: "clamp(14px, 2.5vw, 18px)",
                color: "rgba(255,255,255,0.35)",
                fontStyle: "italic",
                letterSpacing: 1,
              }}>
                {subText}
              </p>
            )}
          </div>
        )}

        {/* CHAT */}
        {scene.type === "chat" && (
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 20 }}>
            <p style={{
              fontFamily: "'Crimson Text', serif",
              fontSize: 16,
              color: "rgba(255,255,255,0.3)",
              fontStyle: "italic",
              letterSpacing: 2,
            }}>
              Tonight like every other night...
            </p>
            <ChatScene messages={scene.messages} visible={fadeIn} />
          </div>
        )}

        {/* GLITCH */}
        {scene.type === "glitch" && (
          <div>
            <GlitchText
              text={mainText}
              style={{
                fontFamily: "'Cinzel', serif",
                fontSize: "clamp(22px, 5vw, 38px)",
                color: "#fff",
                fontWeight: 700,
                letterSpacing: 3,
              }}
            />
          </div>
        )}

        {/* LIGHT */}
        {scene.type === "light" && (
          <div style={{ textAlign: "center" }}>
            <div style={{
              width: 80,
              height: 80,
              borderRadius: "50%",
              background: "radial-gradient(circle, #ffffff 0%, #00f5ff 40%, transparent 70%)",
              margin: "0 auto 30px",
              boxShadow: "0 0 60px #00f5ff, 0 0 120px rgba(0,245,255,0.5)",
              animation: "teleportPulse 2s ease-in-out infinite",
            }} />
            <p style={{
              fontFamily: "'Crimson Text', serif",
              fontSize: "clamp(18px, 3.5vw, 26px)",
              color: "rgba(255,255,255,0.9)",
              fontStyle: "italic",
              letterSpacing: 1,
            }}>
              {mainText}
            </p>
          </div>
        )}

        {/* KEYS */}
        {scene.type === "keys" && (
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 30 }}>
            <Keyboard activeKeys={activeKeys} />
            <div>
              <p style={{
                fontFamily: "'Crimson Text', serif",
                fontSize: "clamp(16px, 3vw, 22px)",
                color: "rgba(255,248,220,0.85)",
                fontStyle: "italic",
                marginBottom: 8,
              }}>
                {mainText}
              </p>
              {subText && (
                <p style={{
                  fontFamily: "'Crimson Text', serif",
                  fontSize: 15,
                  color: "rgba(0,245,255,0.5)",
                  fontStyle: "italic",
                }}>
                  {subText}
                </p>
              )}
            </div>
          </div>
        )}

        {scene.type === "pixelize" && (<PixelizeEffect />)}
        {/* TELEPORT */}
        {scene.type === "teleport" && (
          <div style={{ position: "relative", display: "flex", alignItems: "center", justifyContent: "center" }}>
            {[0, 1, 2, 3].map((i) => (
              <div key={i} style={{
                position: "absolute",
                width: 100,
                height: 100,
                borderRadius: "50%",
                border: "2px solid rgba(0,245,255,0.6)",
                animation: `ringExpand ${1.5}s ${i * 0.35}s infinite ease-out`,
              }} />
            ))}
            <div style={{
              width: 60,
              height: 60,
              borderRadius: "50%",
              background: "radial-gradient(circle, #ffffff 0%, #00f5ff 50%, transparent 70%)",
              boxShadow: "0 0 40px #00f5ff, 0 0 80px rgba(0,245,255,0.8)",
            }} />
            <div style={{
              position: "absolute",
              bottom: -80,
              fontFamily: "'Cinzel', serif",
              fontSize: 13,
              letterSpacing: 6,
              color: "rgba(0,245,255,0.6)",
              textTransform: "uppercase",
              animation: "fadeIn 1s 1s both ease",
            }}>
              Welcome to Syntaxia
            </div>
          </div>
        )}

        {/* TITLE */}
        {scene.type === "title" && (
          <div style={{ textAlign: "center", animation: "titleReveal 2s ease both" }}>
            <div style={{
              fontSize: 8,
              letterSpacing: 2,
              color: "rgba(255,215,0,0.5)",
              fontFamily: "'Cinzel', serif",
              marginBottom: 5,
              textTransform: "uppercase",
            }}>
              Chapter I
            </div>
            <div style={{
              position: "relative",
              height: "auto",
              margin: "0 0 60px 0",
            }}>
              <h1 style={{
                padding:"10px 40px 0px 40px",
                fontFamily: "'Cinzel', serif",
                fontWeight: 700,
                fontSize: "clamp(16px, 5vw, 68px)",
                letterSpacing: 1,
                background: "linear-gradient(135deg, #ffd700 0%, #fff8dc 40%, #ffd700 60%, #b8860b 100%)",
                backgroundSize: "400% 100%",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                animation: "shimmer 3s linear infinite",
                margin: "0",
                lineHeight: "0.9",
              }}>
                Syntaxia Presents —
              </h1>
              <h1 style={{
                padding:"0px 40px 10px 40px",
                fontFamily: "'Cinzel', serif",
                fontWeight: 700,
                fontSize: "clamp(16px, 5vw, 68px)",
                letterSpacing: 1,
                background: "linear-gradient(135deg, #ffd700 0%, #fff8dc 40%, #ffd700 60%, #b8860b 100%)",
                backgroundSize: "400% 100%",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                animation: "shimmer 3s linear infinite",
                margin: "-0.2em 0 0 0",
                lineHeight: "0.9",
              }}>
                The Blind Coder
              </h1>
            </div>
            <div style={{
              width: 900,
              height: 3,
              background: "linear-gradient(90deg, transparent, #ffd700, transparent)",
              margin: "0 auto 20px",
            }} />
            <p style={{
              fontFamily: "'Crimson Text', serif",
              fontStyle: "italic",
              color: "rgba(255,248,220,0.45)",
              fontSize: 14,
              letterSpacing: 2,
              marginBottom: 40,
            }}>
              Learn. Grow. Return.
            </p>
            <button
              onClick={onComplete}
              style={{
                background: "transparent",
                border: "1px solid rgba(255,215,0,0.4)",
                color: "#ffd700",
                padding: "14px 48px",
                fontSize: 12,
                letterSpacing: 5,
                fontFamily: "'Cinzel', serif",
                cursor: "pointer",
                textTransform: "uppercase",
                transition: "all 0.3s ease",
                marginRight: 16,
              }}
              onMouseEnter={(e) => e.target.style.background = "rgba(255,215,0,0.1)"}
              onMouseLeave={(e) => e.target.style.background = "transparent"}
            >
              Play
            </button>
            <button
              onClick={() => { setSceneIdx(0); setFadeIn(true); }}
              style={{
                background: "transparent",
                border: "1px solid rgba(255,255,255,0.15)",
                color: "rgba(255,255,255,0.35)",
                padding: "14px 32px",
                fontSize: 12,
                letterSpacing: 5,
                fontFamily: "'Cinzel', serif",
                cursor: "pointer",
                textTransform: "uppercase",
                transition: "all 0.3s ease",
              }}
              onMouseEnter={(e) => e.target.style.color = "rgba(255,255,255,0.7)"}
              onMouseLeave={(e) => e.target.style.color = "rgba(255,255,255,0.35)"}
            >
              Replay
            </button>
          </div>
        )}
      </div>

      {/* Mute button */}
      {started && (
        <button
          onClick={() => setIsMuted(!isMuted)}
          style={{
            position: "absolute",
            top: 30,
            right: 30,
            background: "transparent",
            border: "1px solid rgba(255,255,255,0.1)",
            color: isMuted ? "rgba(255,255,255,0.4)" : "rgba(255,255,255,0.25)",
            padding: "8px 16px",
            fontSize: 11,
            letterSpacing: 4,
            fontFamily: "'Cinzel', serif",
            cursor: "pointer",
            textTransform: "uppercase",
            transition: "all 0.3s ease",
            zIndex: 30,
          }}
          onMouseEnter={(e) => e.target.style.color = "rgba(255,255,255,0.6)"}
          onMouseLeave={(e) => e.target.style.color = isMuted ? "rgba(255,255,255,0.4)" : "rgba(255,255,255,0.25)"}
        >
          {isMuted ? "🔇 Muted" : "🔊 Sound"}
        </button>
      )}

      {/* Skip button */}
      {started && scene.type !== "title" && (
        <button
          onClick={() => setSceneIdx(SCENES.length - 1)}
          style={{
            position: "absolute",
            bottom: 30,
            right: 30,
            background: "transparent",
            border: "1px solid rgba(255,255,255,0.1)",
            color: "rgba(255,255,255,0.25)",
            padding: "8px 20px",
            fontSize: 11,
            letterSpacing: 4,
            fontFamily: "'Cinzel', serif",
            cursor: "pointer",
            textTransform: "uppercase",
            transition: "all 0.3s ease",
            zIndex: 30,
          }}
          onMouseEnter={(e) => e.target.style.color = "rgba(255,255,255,0.6)"}
          onMouseLeave={(e) => e.target.style.color = "rgba(255,255,255,0.25)"}
        >
          Skip →
        </button>
      )}

      {/* Scene indicator */}
      <div style={{
        position: "absolute",
        bottom: 30,
        left: "50%",
        transform: "translateX(-50%)",
        display: "flex",
        gap: 6,
        zIndex: 30,
      }}>
        {SCENES.filter(s => s.type !== "black").map((_, i) => (
          <div key={i} style={{
            width: i === sceneIdx ? 20 : 6,
            height: 2,
            background: i === sceneIdx ? "#ffd700" : "rgba(255,255,255,0.15)",
            borderRadius: 1,
            transition: "all 0.3s ease",
          }} />
        ))}
      </div>
    </div>
  );
}