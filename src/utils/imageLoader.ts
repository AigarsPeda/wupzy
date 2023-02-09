const imageLoader = ({
  src,
  width,
  quality,
}: {
  src: string;
  width: number;
  quality?: number;
}) => {
  return `https://images.unsplash.com/${src}?w=${width}&q=${quality || 75}`;
};

export default imageLoader;
