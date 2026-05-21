import { useState, useEffect } from "react";
import MagicCard from "./MagicCard";

const MAP_IMAGE = "../../public/map.png";

const ISLANDS = [
  {
    id: 1,
    name: "The Basics Island",
    subtitle: "Where it all begins",
    theme: "Variables, types, conditions, loops",
    color: "rgb(18, 137, 48)",
    glow: "rgba(19, 161, 76, 0.8)",
    icon: "🌿",
    x: 32, y: 76,
    status: "completed",
    progress: 100,
    challenges: 8,
    completed: 8,
    guardian: "The Primitive Guardian",
    description: "The foundations of code. Here, every variable counts, every loop breathes.",
    lumiHint: "You have mastered the basics. The world recognizes you as a developer.",
  },
  {
    id: 2,
    name: "The Function Archipelago",
    subtitle: "Divide to rule better",
    theme: "Logic, decomposition, recursion",
    color: "#7eb87e",
    glow: "rgba(126,184,126,0.8)",
    icon: "🌳",
    x: 32, y: 57,
    status: "active",
    progress: 45,
    challenges: 10,
    completed: 4,
    guardian: "The Recursive Guardian",
    description: "Each function is a promise. Decompose chaos into perfect order.",
    lumiHint: "You're halfway there. Recursion still resists you — but not for long.",
  },
  {
    id: 3,
    name: "The Swamp of Structures",
    subtitle: "Hidden order in chaos",
    theme: "Arrays, lists, dictionaries",
    color: "#5a7a5a",
    glow: "rgba(90,122,90,0.8)",
    icon: "🌑",
    x: 50, y: 54,
    status: "locked",
    progress: 0,
    challenges: 9,
    completed: 0,
    guardian: "The Guardian of Collections",
    description: "Data structures sleep under the marshes. Learn to organize them.",
    lumiHint: "Finish the Archipelago first. Structures await you in the mists.",
  },
  {
    id: 4,
    name: "The Fortress of Algorithms",
    subtitle: "The war of efficiency",
    theme: "Sorting, searching, complexity",
    color: "#c0834a",
    glow: "rgba(192,131,74,0.8)",
    icon: "🏰",
    x: 68, y: 50,
    status: "locked",
    progress: 0,
    challenges: 12,
    completed: 0,
    guardian: "The Guardian of Complexity",
    description: "Here, brute force is not enough. Think. Optimize. Conquer.",
    lumiHint: "This fortress has never been taken lightly. Prepare yourself.",
  },
  {
    id: 5,
    name: "The Tower of Objects",
    subtitle: "The art of abstraction",
    theme: "OOP, inheritance, abstraction",
    color: "#a0b8c8",
    glow: "rgba(160,184,200,0.8)",
    icon: "🗼",
    x: 52, y: 22,
    status: "locked",
    progress: 0,
    challenges: 11,
    completed: 0,
    guardian: "The Polymorphic Guardian",
    description: "A tower where each floor is a class. Climb to the summit.",
    lumiHint: "Inheritance is a weapon. Learn to use it wisely.",
  },
  {
    id: 6,
    name: "The Labyrinth of Networks",
    subtitle: "Connecting worlds",
    theme: "APIs, requests, authentication",
    color: "#8fba6a",
    glow: "rgba(143,186,106,0.8)",
    icon: "🌐",
    x: 30, y: 36,
    status: "locked",
    progress: 0,
    challenges: 10,
    completed: 0,
    guardian: "The Guardian of Protocols",
    description: "The network is alive. Each request is a breath, each response a truth.",
    lumiHint: "You must know how to speak to machines before entering here.",
  },
  {
    id: 7,
    name: "The Core",
    subtitle: "The heart of Syntaxia",
    theme: "Everything — rewrite the world",
    color: "#c084e8",
    glow: "rgba(192,132,232,0.9)",
    icon: "💎",
    x: 11, y: 14,
    status: "locked",
    progress: 0,
    challenges: 15,
    completed: 0,
    guardian: "The Original Bug",
    description: "The origin of everything. The bug devouring Syntaxia for years. Are you ready?",
    lumiHint: "No one has ever gone this far. But you... maybe.",
  },
];

export default function WorldMap() {
  const [selected, setSelected] = useState(null);
  const [hovered, setHovered] = useState(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => { setTimeout(() => setLoaded(true), 200); }, []);

  return (
    <div style={{
      width: "100vw", height: "100vh",
      position: "relative", overflow: "hidden",
      background: "#1a1208",
      fontFamily: "'Palatino Linotype', Georgia, serif",
    }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@400;700;900&display=swap');
        @keyframes fadeIn { from { opacity:0; } to { opacity:1; } }
        @keyframes pulse { 0%,100% { transform:scale(1); opacity:0.85; } 50% { transform:scale(1.18); opacity:1; } }
        @keyframes activeGlow { 0%,100% { box-shadow: 0 0 16px var(--g), 0 0 32px var(--g); } 50% { box-shadow: 0 0 32px var(--g), 0 0 64px var(--g); } }
        @keyframes ripple { 0% { transform:translate(-50%,-50%) scale(1); opacity:0.7; } 100% { transform:translate(-50%,-50%) scale(2.8); opacity:0; } }
        @keyframes float { 0%,100% { transform:translate(-50%,-50%) translateY(0); } 50% { transform:translate(-50%,-50%) translateY(-5px); } }
        @keyframes lumiPulse { 0%,100% { opacity:0.7; transform:scale(1); } 50% { opacity:1; transform:scale(1.1); } }
        @keyframes shimmer { 0% { background-position:-200% center; } 100% { background-position:200% center; } }
      `}</style>

      {/* Map image — fills screen */}
      <img
        src={MAP_IMAGE}
        alt="Syntaxia Map"
        style={{
          position: "absolute", inset: 0,
          width: "100%", height: "100%",
          objectFit: "fill",
          objectPosition: "center",
          opacity: loaded ? 1 : 0,
          transition: "opacity 0.8s ease",
        }}
      />

      {/* Subtle darkening vignette */}
      <div style={{
        position: "absolute", inset: 0, pointerEvents: "none",
        background: "radial-gradient(ellipse at center, transparent 40%, rgba(0,0,0,0.45) 100%)",
      }} />

      {/* Island hotspots */}
      {ISLANDS.map((island, idx) => {
        const isLocked = island.status === "locked";
        const isActive = island.status === "active";
        const isCompleted = island.status === "completed";
        const isHov = hovered?.id === island.id;

        return (
          <div
            key={island.id}
            style={{
              position: "absolute",
              left: `${island.x}%`,
              top: `${island.y}%`,
              transform: "translate(-50%, -50%)",
              zIndex: 10,
              opacity: loaded ? 1 : 0,
              transition: `opacity 0.5s ease ${idx * 0.08}s`,
              cursor: "pointer",
            }}
            onMouseEnter={() => setHovered(island)}
            onMouseLeave={() => setHovered(null)}
            onClick={() => setSelected(island)}
          >
            {/* Ripple rings for active island */}
            {isActive && [0, 1].map(i => (
              <div key={i} style={{
                position: "absolute",
                left: "50%", top: "50%",
                width: 48, height: 48,
                borderRadius: "50%",
                border: `2px solid ${island.color}`,
                animation: `ripple 2s ${i * 0.8}s ease-out infinite`,
                pointerEvents: "none",
              }} />
            ))}

            {/* Main dot */}
            <div style={{
              width: isActive ? 22 : island.id === 7 ? 20 : 16,
              height: isActive ? 22 : island.id === 7 ? 20 : 16,
              borderRadius: "50%",
              background: isLocked
                ? "rgba(100,80,40,0.5)"
                : `radial-gradient(circle at 35% 35%, ${island.color}, ${island.color}88)`,
              border: `2px solid ${isLocked ? "rgba(200,160,80,0.25)" : island.color}`,
              boxShadow: isLocked
                ? "none"
                : isHov
                ? `0 0 24px ${island.glow}, 0 0 48px ${island.glow}66`
                : `0 0 12px ${island.glow}88`,
              transition: "all 0.25s ease",
              transform: isHov ? "scale(1.4)" : "scale(1)",
              animation: isActive ? `activeGlow 2s ease-in-out infinite` : "none",
              "--g": island.glow,
              position: "relative",
            }}>
              {/* Completed star */}
              {isCompleted && (
                <div style={{
                  position: "absolute", top: -6, right: -6,
                  width: 14, height: 14, borderRadius: "50%",
                  background: "#ffd700",
                  border: "1px solid #2a1f0e",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: 8, boxShadow: "0 0 8px rgba(255,215,0,0.9)",
                }}>✓</div>
              )}
            </div>

            {/* Coordinates label */}
            <div style={{
              position: "absolute",
              top: "100%", left: "50%",
              transform: "translateX(-50%)",
              marginTop: 6,
              background: "rgba(30,20,8,0.85)",
              border: `1px solid ${island.color}44`,
              borderRadius: 2,
              padding: "2px 6px",
              fontSize: 9,
              color: island.color,
              fontFamily: "monospace",
              letterSpacing: 1,
              whiteSpace: "nowrap",
              pointerEvents: "none",
              opacity: isHov ? 1 : 0.6,
              transition: "opacity 0.25s ease",
              textShadow: `0 0 8px ${island.glow}66`,
            }}>
             
            </div>

            {/* Hover tooltip */}
            {isHov && (
              <div style={{
                position: "absolute",
                bottom: "calc(100% + 14px)",
                left: "50%",
                transform: "translateX(-50%)",
                background: "linear-gradient(160deg, rgba(30,20,8,0.97), rgba(20,12,4,0.97))",
                border: `1px solid ${island.color}55`,
                borderRadius: 4,
                padding: "10px 14px",
                minWidth: 180,
                maxWidth: 220,
                boxShadow: `0 8px 32px rgba(0,0,0,0.9), 0 0 20px ${island.color}22`,
                animation: "fadeIn 0.2s ease",
                whiteSpace: "nowrap",
                pointerEvents: "none",
                zIndex: 50,
              }}>
                {/* Arrow */}
                <div style={{
                  position: "absolute", bottom: -6, left: "50%",
                  transform: "translateX(-50%)",
                  width: 10, height: 6,
                  background: "rgba(20,12,4,0.97)",
                  clipPath: "polygon(0 0, 100% 0, 50% 100%)",
                  borderLeft: `1px solid ${island.color}33`,
                  borderRight: `1px solid ${island.color}33`,
                }} />

                <div style={{
                  fontSize: 9, letterSpacing: 3,
                  color: island.color, marginBottom: 4,
                  textTransform: "uppercase",
                }}>
                  Island {island.id}
                </div>
                <div style={{
                  fontSize: 13, color: "#f0ddb0",
                  fontWeight: "bold", marginBottom: 6,
                  whiteSpace: "normal",
                }}>
                  {island.name}
                </div>

                {/* LUMI mini */}
                <div style={{
                  display: "flex", gap: 6, alignItems: "flex-start",
                  borderTop: "1px solid rgba(255,200,100,0.08)",
                  paddingTop: 8,
                }}>
                  <span style={{
                    fontSize: 10, color: "#c084e8",
                    animation: "lumiPulse 2s ease-in-out infinite",
                    flexShrink: 0,
                  }}>✦</span>
                  <p style={{
                    fontSize: 11, color: "rgba(192,132,232,0.7)",
                    margin: 0, lineHeight: 1.5,
                    fontStyle: "italic",
                    whiteSpace: "normal",
                  }}>
                    {island.lumiHint.slice(0, 60)}...
                  </p>
                </div>
              </div>
            )}
          </div>
        );
      })}

      {/* Top HUD */}
      <div style={{
        position: "absolute", top: 16, right: 16, zIndex: 20,
        display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 8,
      }}>
        {/* LUMI indicator */}
        <div style={{
          display: "flex", alignItems: "center", gap: 8,
          background: "rgba(10,6,2,0.85)",
          border: "1px solid rgba(192,132,232,0.3)",
          borderRadius: 30, padding: "6px 14px",
          backdropFilter: "blur(8px)",
          boxShadow: "0 0 20px rgba(192,132,232,0.15)",
          animation: "lumiPulse 3s ease-in-out infinite",
        }}>
          <div style={{
            width: 18, height: 18, borderRadius: "50%",
            background: "radial-gradient(circle, rgba(192,132,232,0.7), rgba(192,132,232,0.1))",
            border: "1px solid rgba(192,132,232,0.6)",
            boxShadow: "0 0 10px rgba(192,132,232,0.6)",
            fontSize: 8, display: "flex", alignItems: "center", justifyContent: "center",
            color: "#c084e8",
          }}>✦</div>
          <span style={{ fontSize: 11, color: "rgba(192,132,232,0.8)", letterSpacing: 2, fontFamily: "'Cinzel', serif" }}>
            LUMI
          </span>
        </div>

        {/* Progress */}
        <div style={{
          background: "rgba(10,6,2,0.85)",
          border: "1px solid rgba(255,200,100,0.2)",
          borderRadius: 4, padding: "8px 14px",
          backdropFilter: "blur(8px)",
          textAlign: "right",
        }}>
          <div style={{ fontSize: 9, letterSpacing: 3, color: "#806040", marginBottom: 5, textTransform: "uppercase" }}>
            Progress
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <div style={{
              width: 90, height: 3,
              background: "rgba(255,200,100,0.1)",
              borderRadius: 2, overflow: "hidden",
            }}>
              <div style={{
                height: "100%", width: "21%",
                background: "linear-gradient(90deg, #c8a060, #ffd700)",
                boxShadow: "0 0 6px #ffd700",
              }} />
            </div>
            <span style={{ fontSize: 12, color: "#ffd700", fontFamily: "monospace" }}>21%</span>
          </div>
        </div>
      </div>

      {/* Legend bottom left */}
      <div style={{
        position: "absolute", bottom: 16, left: 16, zIndex: 20,
        background: "rgba(10,6,2,0.85)",
        border: "1px solid rgba(255,200,100,0.15)",
        borderRadius: 4, padding: "10px 16px",
        backdropFilter: "blur(8px)",
        display: "flex", flexDirection: "column", gap: 7,
      }}>
        {[
          { color: "#4caf7d", label: "Completed" },
          { color: "#7eb87e", label: "Active", pulse: true },
          { color: "rgba(200,160,80,0.3)", label: "Locked" },
        ].map((l) => (
          <div key={l.label} style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <div style={{
              width: 8, height: 8, borderRadius: "50%",
              background: l.color,
              boxShadow: l.pulse ? `0 0 8px ${l.color}` : "none",
              animation: l.pulse ? "pulse 2s ease-in-out infinite" : "none",
            }} />
            <span style={{ fontSize: 10, color: "rgba(220,180,100,0.5)", letterSpacing: 2 }}>
              {l.label}
            </span>
          </div>
        ))}
      </div>

      {/* Island detail modal with MagicCard */}
      {selected && (
        <div
          style={{
            position: "fixed", inset: 0, zIndex: 100,
            display: "flex", alignItems: "center", justifyContent: "center",
            background: "rgba(0,0,0,0.6)",
            backdropFilter: "blur(4px)",
          }}
          onClick={() => setSelected(null)}
        >
          <div onClick={e => e.stopPropagation()}>
            <MagicCard island={selected} />
          </div>
        </div>
      )}
    </div>
  );
}