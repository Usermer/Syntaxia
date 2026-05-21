import { useRef } from "react";
import "./MagicCard.css";

export default function MagicCard({ island }) {
  const cardRef = useRef(null);

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    cardRef.current.style.transform =
      `perspective(1000px) scale(1.04) rotateY(${x * 12}deg) rotateX(${-y * 12}deg)`;
  };

  const handleMouseLeave = () => {
    if (cardRef.current) {
      cardRef.current.style.transform = "perspective(1000px) scale(1) rotateY(0deg) rotateX(0deg)";
    }
  };

  const isLocked = island.status === "locked";
  // eslint-disable-next-line no-unused-vars
  const isActive = island.status === "active";
//   const isCompleted = island.status === "completed";

  return (
    <div
      className={`magic-card ${island.status}`}
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ "--island-color": island.color }}
    >
      {/* Progress badge */}
      {/* {!isLocked && (
        <div className="progress-burst">
          {isCompleted ? "✓ COMPLETE" : `${island.progress}%`}
        </div>
      )} */}

      <div className="card-header">
        <span className="card-name">{island.name}</span>
        <div className="card-id">#{island.id}</div>
      </div>

      {/* Card art */}
      <div className="card-art">
        <img src={`/${island.id}.jpeg`} alt={island.name} />
        {isLocked && <div className="card-lock">🔒</div>}
      </div>

      {/* Subtitle */}
      <div className="card-subtitle">
        <span className="subtitle-text">{island.subtitle}</span>
      </div>

      {/* Theme/Type bar */}
      <div className="card-type-bar">
        <span className="card-theme">{island.theme.split(",")[0]}</span>
        <div className="card-rarity">
          {[...Array(Math.ceil(island.id / 1.5))].map((_, i) => (
            <div key={i} className="rarity-gem" />
          ))}
        </div>
      </div>

      {/* Card body */}
      <div className="card-body">
        {/* <div className="body-section">
          <h4 className="section-title">Guardian</h4>
          <p className="section-content">{island.guardian}</p>
        </div> */}

        <div className="body-section">
          <h4 className="section-title">Description</h4>
          <p className="section-content">{island.description}</p>
        </div>

        {!isLocked && (
          <div className="body-section lumi-hint">
            <div className="lumi-icon">✦</div>
            <p className="lumi-text">«{island.lumiHint}»</p>
          </div>
        )}
      </div>

      {/* Card footer */}
      <div className="card-footer">
        <span className="card-challenges">{island.challenges} Challenges</span>
        <div className="card-progress">
          <span className="progress-badge completed">{island.completed}</span>
          <span className="progress-slash">/</span>
          <span className="progress-badge total">{island.challenges}</span>
        </div>
      </div>
    </div>
  );
}
