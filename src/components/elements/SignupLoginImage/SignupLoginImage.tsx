import useWindowSize from "hooks/useWindowSize";
import Image from "next/image";
import type { FC } from "react";
import imageLoader from "utils/imageLoader";

const SignupLoginImage: FC = () => {
  const { windowSize } = useWindowSize();

  return (
    <>
      {windowSize.width >= 570 && (
        <div className="max-w-[50%]">
          <Image
            priority
            width={1000}
            height={1000}
            alt="login image"
            loader={imageLoader}
            className="transform transition duration-300 ease-out hover:scale-105"
            src="photo-1509486432407-f8fb9cc99acd?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8"
            style={{
              maxHeight: "80vh",
              objectFit: "fill",
              borderRadius: "10px",
            }}
          />
        </div>
      )}
    </>
  );
};

export default SignupLoginImage;
