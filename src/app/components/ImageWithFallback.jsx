import { useState } from "react";

export function ImageWithFallback({
  src,
  fallback = "/placeholder.png",
  alt = "",
  ...props
}) {
  const [imgSrc, setImgSrc] = useState(src);

  return (
    <img
      src={imgSrc}
      alt={alt}
      onError={() => setImgSrc(fallback)}
      {...props}
    />
  );
}
