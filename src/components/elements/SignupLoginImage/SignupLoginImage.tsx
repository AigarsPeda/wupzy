import type { FC } from "react";
import Image from "next/image";
import imageLoader from "utils/imageLoader";

const SignupLoginImage: FC = () => {
  return (
    <div className="invisible md:visible">
      <Image
        priority
        width={1000}
        height={1000}
        alt="login image"
        loader={imageLoader}
        className="transform transition duration-300 ease-out hover:scale-105"
        src="photo-1509486432407-f8fb9cc99acd?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8"
        style={{
          maxHeight: "90vh",
          objectFit: "fill",
          borderRadius: "10px",
        }}
      />
    </div>
  );
};

export default SignupLoginImage;
