import React from "react";

export function CodeComponent({ extension }: { extension: string }) {
  return (
    <svg width="200" height="150">
      {/* Background rectangle */}
      <rect x="5" y="5" width="190" height="135" rx="5" ry="5" fill="#252525" />

      {/* Code lines */}
      <rect
        x="10"
        y="25"
        width="120"
        height="10"
        rx="5"
        ry="5"
        fill="#ff9aa2"
      />
      <rect
        x="10"
        y="40"
        width="150"
        height="10"
        rx="5"
        ry="5"
        fill="#ffd700"
      />
      <rect x="10" y="55" width="80" height="10" rx="5" ry="5" fill="#ffd700" />
      <rect x="10" y="70" width="90" height="10" rx="5" ry="5" fill="#ffb7b2" />
      <rect
        x="10"
        y="85"
        width="160"
        height="10"
        rx="5"
        ry="5"
        fill="#ffb7b2"
      />
      <rect
        x="10"
        y="100"
        width="140"
        height="10"
        rx="5"
        ry="5"
        fill="#a4f4f9"
      />
      <rect
        x="10"
        y="115"
        width="70"
        height="10"
        rx="5"
        ry="5"
        fill="#a4f4f9"
      />

      {/* File tabs */}
      <rect x="5" y="5" width="190" height="15" fill="#404040" />
      {/* File tab text */}
      <text x="10" y="15" fontFamily="Arial" fontSize="8" fill="#ffffff">
        File 1.js
      </text>
      <text x="70" y="15" fontFamily="Arial" fontSize="8" fill="#ffffff">
        File 2.js
      </text>
      <text x="130" y="15" fontFamily="Arial" fontSize="8" fill="#ffffff">
        File 3.js
      </text>

      {/* Close button */}
      <circle cx="185" cy="12" r="5" fill="#c0c0c0" />
      <line
        x1="183"
        y1="10"
        x2="187"
        y2="14"
        stroke="#000000"
        strokeWidth="1"
      />
      <line
        x1="183"
        y1="14"
        x2="187"
        y2="10"
        stroke="#000000"
        strokeWidth="1"
      />

      {/* File extension text */}
      <text
        x="189"
        y="129"
        textAnchor="end"
        fontFamily="Arial"
        fontSize="12"
        fill="#cfcfcf"
        stroke="#cfcfcf"
        strokeWidth="1"
      >
        *.{extension}
      </text>
    </svg>
  );
}
