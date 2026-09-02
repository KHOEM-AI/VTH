import { useState, useEffect } from "react";
import { ZoomIn, ZoomOut, RotateCcw } from "lucide-react";

/**
 * ZoomTool — floating text-size control.
 * Scales the whole page's font size up/down via the <html> font-size,
 * so every rem-based element grows or shrinks together.
 */

const MIN_SCALE = 1;
const MAX_SCALE = 2;
const STEP = 0.1;

export default function ZoomTool() {
  const [scale, setScale] = useState(1);

  useEffect(() => {
    document.documentElement.style.fontSize = `${16 * scale}px`;
  }, [scale]);

  const zoomIn = () => setScale((s) => Math.min(MAX_SCALE, +(s + STEP).toFixed(1)));
  const zoomOut = () => setScale((s) => Math.max(MIN_SCALE, +(s - STEP).toFixed(1)));
  const reset = () => setScale(1);

  return (
    <div
      style={{
        position: "fixed",
        bottom: "20px",
        right: "20px",
        display: "flex",
        alignItems: "center",
        gap: "8px",
        background: "#1f1f1f",
        borderRadius: "999px",
        padding: "8px 12px",
        boxShadow: "0 4px 16px rgba(0,0,0,0.35)",
        zIndex: 1000,
      }}
    >
      <button
        onClick={zoomOut}
        disabled={scale <= MIN_SCALE}
        style={btnStyle(scale <= MIN_SCALE)}
        aria-label="បន្ថយទំហំអក្សរ"
      >
        <ZoomOut size={18} color="#fff" />
      </button>

      <span style={{ color: "#fff", fontSize: "13px", minWidth: "34px", textAlign: "center" }}>
        {Math.round(scale * 100)}%
      </span>

      <button
        onClick={zoomIn}
        disabled={scale >= MAX_SCALE}
        style={btnStyle(scale >= MAX_SCALE)}
        aria-label="ពង្រីកទំហំអក្សរ"
      >
        <ZoomIn size={18} color="#fff" />
      </button>

      <button onClick={reset} style={btnStyle(false)} aria-label="ត្រឡប់ទំហំដើម">
        <RotateCcw size={16} color="#fff" />
      </button>
    </div>
  );
}

function btnStyle(disabled: boolean): React.CSSProperties {
  return {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: "32px",
    height: "32px",
    borderRadius: "50%",
    border: "none",
    background: disabled ? "#3a3a3a" : "#3d3d3d",
    cursor: disabled ? "not-allowed" : "pointer",
    opacity: disabled ? 0.5 : 1,
  };
}
