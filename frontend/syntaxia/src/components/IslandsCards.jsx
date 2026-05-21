import { useState } from "react";
import MagicCard from "./MagicCard";

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

export default function IslandsCards() {
  const [selectedFilter, setSelectedFilter] = useState("all");
  const [carouselIdx, setCarouselIdx] = useState(0);

  const filteredIslands = selectedFilter === "all"
    ? ISLANDS
    : ISLANDS.filter(i => i.status === selectedFilter);

  const nextCard = () => {
    setCarouselIdx((prev) => (prev + 1) % filteredIslands.length);
  };

  const prevCard = () => {
    setCarouselIdx((prev) => (prev - 1 + filteredIslands.length) % filteredIslands.length);
  };

  // Reset carousel when filter changes
  const handleFilterChange = (filter) => {
    setSelectedFilter(filter);
    setCarouselIdx(0);
  };

  return (
    <div style={{
      width: "100vw",
      minHeight: "100vh",
      background: "linear-gradient(135deg, #0a0a2e 0%, #1a1208 100%)",
      padding: "40px 20px",
      fontFamily: "'Palatino Linotype', Georgia, serif",
      overflowX: "hidden",
    }}>
      {/* Header */}
      <div style={{
        textAlign: "center",
        marginBottom: 50,
      }}>
        <h1 style={{
          fontSize: 42,
          color: "#ffd700",
          margin: "0 0 10px",
          textShadow: "0 0 20px rgba(255, 215, 0, 0.5)",
          fontFamily: "'Cinzel', serif",
        }}>
          ⚔ SYNTAXIA ISLANDS
        </h1>
        <p style={{
          fontSize: 14,
          color: "#c8a060",
          margin: 0,
          letterSpacing: 3,
          textTransform: "uppercase",
        }}>
          Explore the Realms of Code
        </p>
      </div>

      {/* Filter buttons */}
      <div style={{
        display: "flex",
        justifyContent: "center",
        gap: 12,
        marginBottom: 40,
        flexWrap: "wrap",
      }}>
        {[
          { value: "all", label: "All Islands" },
          { value: "completed", label: "✓ Completed" },
          { value: "active", label: "⚔ Active" },
          { value: "locked", label: "🔒 Locked" },
        ].map(f => (
          <button
            key={f.value}
            onClick={() => handleFilterChange(f.value)}
            style={{
              padding: "8px 20px",
              background: selectedFilter === f.value
                ? "linear-gradient(135deg, #ffd700, #ffed4e)"
                : "rgba(255, 215, 0, 0.1)",
              border: `1px solid ${selectedFilter === f.value ? "#ffd700" : "#c8a06055"}`,
              borderRadius: 20,
              color: selectedFilter === f.value ? "#000" : "#c8a060",
              fontSize: 11,
              letterSpacing: 1,
              cursor: "pointer",
              transition: "all 0.3s ease",
              textTransform: "uppercase",
              fontWeight: "bold",
            }}
          >
            {f.label}
          </button>
        ))}
      </div>

      {/* Carousel container */}
      {filteredIslands.length > 0 ? (
        <div style={{
          position: "relative",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: 30,
          marginBottom: 40,
        }}>
          {/* Previous button */}
          <button
            onClick={prevCard}
            style={{
              background: "linear-gradient(135deg, #ffd700, #ffed4e)",
              border: "none",
              width: 60,
              height: 60,
              borderRadius: "50%",
              fontSize: 28,
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              transition: "all 0.3s ease",
              boxShadow: "0 4px 12px rgba(0,0,0,0.3)",
              zIndex: 10,
              flexShrink: 0,
            }}
            onMouseEnter={(e) => e.target.style.transform = "scale(1.1)"}
            onMouseLeave={(e) => e.target.style.transform = "scale(1)"}
          >
            ◀
          </button>

          {/* Cards carousel viewport */}
          <div style={{
            position: "relative",
            width: "100%",
            maxWidth: 1100,
            overflow: "hidden",
            perspective: "1000px",
          }}>
            <div style={{
              display: "flex",
              gap: 24,
              transform: `translateX(-${carouselIdx * 340}px)`,
              transition: "transform 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)",
              willChange: "transform",
            }}>
              {filteredIslands.map((island) => (
                <div
                  key={island.id}
                  style={{
                    flexShrink: 0,
                    width: 320,
                  }}
                >
                  <MagicCard island={island} />
                </div>
              ))}
            </div>
          </div>

          {/* Next button */}
          <button
            onClick={nextCard}
            style={{
              background: "linear-gradient(135deg, #ffd700, #ffed4e)",
              border: "none",
              width: 60,
              height: 60,
              borderRadius: "50%",
              fontSize: 28,
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              transition: "all 0.3s ease",
              boxShadow: "0 4px 12px rgba(0,0,0,0.3)",
              zIndex: 10,
              flexShrink: 0,
            }}
            onMouseEnter={(e) => e.target.style.transform = "scale(1.1)"}
            onMouseLeave={(e) => e.target.style.transform = "scale(1)"}
          >
            ▶
          </button>
        </div>
      ) : (
        <div style={{
          textAlign: "center",
          color: "#c8a060",
          fontSize: 16,
          marginTop: 40,
        }}>
          No islands matching this filter...
        </div>
      )}

      {/* Animations */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@400;700;900&display=swap');
        
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes carouselSlide {
          from {
            opacity: 0;
            transform: translateX(100px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
      `}</style>
    </div>
  );
}
