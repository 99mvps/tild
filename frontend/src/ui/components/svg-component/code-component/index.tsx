import { Podcasts } from "@mui/icons-material";
import { Box } from "@mui/material";
import { format } from "date-fns";
import { isLiveSelector } from "domain/state/general-application.recoil";
import React from "react";
import { useRecoilValue } from "recoil";

export function CodeComponent({
  lang,
  title,
  createdAt,
  live = false,
}: {
  lang: string;
  title: string;
  createdAt: Date;
  live: boolean;
}) {
  const isOnline = useRecoilValue(isLiveSelector);

  return (
    <Box sx={{ display: "flex", justifyContent: "center" }}>
      <svg width="400" height="320">
        {/* Background rectangle */}
        <rect x="10" y="10" width="380" height="290" fill="#252525" />

        {/* Code lines */}
        <rect
          x="20"
          y="55"
          width="240"
          height="20"
          rx="10"
          ry="10"
          fill="#ff9aa2"
        />
        <rect
          x="20"
          y="85"
          width="300"
          height="20"
          rx="10"
          ry="10"
          fill="#ffd700"
        />
        <rect
          x="20"
          y="115"
          width="160"
          height="20"
          rx="10"
          ry="10"
          fill="#ffd700"
        />
        <rect
          x="20"
          y="145"
          width="180"
          height="20"
          rx="10"
          ry="10"
          fill="#ffb7b2"
        />
        <rect
          x="20"
          y="175"
          width="320"
          height="20"
          rx="10"
          ry="10"
          fill="#ffb7b2"
        />
        <rect
          x="20"
          y="205"
          width="280"
          height="20"
          rx="10"
          ry="10"
          fill="#a4f4f9"
        />
        <rect
          x="20"
          y="235"
          width="140"
          height="20"
          rx="10"
          ry="10"
          fill="#a4f4f9"
        />

        {/* File tabs */}
        <rect x="10" y="10" width="380" height="40" fill="#404040" />
        {/* File tab text */}
        <text x="24" y="35" fontFamily="Open Sans" fontSize="16" fill="#ffffff">
          {title ?? "Untitled-1"}
        </text>

        {/* Date */}
        <text
          x="24"
          y="285"
          fontFamily="Open Sans"
          fontSize="12"
          fill="#ffffff"
        >
          {format(new Date(createdAt), "dd/mm/yyyy")}
        </text>

        {/* Podcast icon */}
        <g transform="translate(350, 15)">
          <g transform="scale(.1)">
            <Podcasts color={isOnline ? "success" : "error"} />
          </g>
        </g>

        {/* File extension text */}
        <text
          x="370"
          y="285"
          textAnchor="end"
          fontFamily="Open Sans"
          fontSize="16"
          fill="#ffffff"
        >
          {lang}
        </text>
      </svg>
    </Box>
  );
}
