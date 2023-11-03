import { type ImageProps } from "next/image";
import Image from "next/image";

const MyImage = (props: ImageProps) => {
  return (
    <Image
      {...props}
      alt={props.alt}
      loader={({ src, width: w, quality }) => {
        const q = quality || 75;
        return `${src}?w=${w}&q=${q}`;
      }}
    />
  );
};

export default MyImage;
