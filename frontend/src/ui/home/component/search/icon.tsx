import { keyframes } from "@emotion/react";
import { IconButton } from "@mui/material";
import { Search as SearchIcon, Loop as LoopIcon } from "@mui/icons-material";

export interface IconSearchButtonProps {
  loading: boolean;
}

export const IconSearchButton: React.FC<IconSearchButtonProps> = ({
  loading,
}) => {
  const rotateIconAnimation = keyframes`
    0% {
      transform: rotate(360deg);
    }
    100% {
      transform: rotate(0deg);
    }`;

  const Icon = loading ? (
    <LoopIcon
      sx={{
        animation: `${rotateIconAnimation} 2s linear infinite`,
      }}
    />
  ) : (
    <SearchIcon />
  );
  return (
    <IconButton edge="end" color="inherit" aria-label="search">
      {Icon}
    </IconButton>
  );
};
