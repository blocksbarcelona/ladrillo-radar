import { platformMeta, type Platform } from "../../data/projects";

type PlatformLogoProps = {
  platform: Platform;
  prefix?: string;
  compact?: boolean;
};

export function PlatformLogo({
  platform,
  prefix = "",
  compact = false,
}: PlatformLogoProps) {
  const meta = platformMeta[platform];

  return (
    <span
      className={`platform-logo platform-logo-${platform.toLowerCase()}${compact ? " platform-logo-compact" : ""}`}
      title={platform}
    >
      {/* Native img keeps public assets relative for repository-scoped GitHub Pages. */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={`${prefix}${meta.logo}`} alt={platform} />
    </span>
  );
}
