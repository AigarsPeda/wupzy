import { type FC } from "react";

interface CircleProgressProps {
  progress: number;
}

const CircleProgress: FC<CircleProgressProps> = ({ progress }) => {
  return (
    <div
      className="flex h-14 w-14 items-center justify-center rounded-full transition-all duration-200"
      style={{
        background: `radial-gradient(closest-side, #101827 79%, transparent 50% 100%), conic-gradient(#22c55e ${progress}%, #d1d5db 0)`,
      }}
    >
      <p className="text-xs font-semibold text-white">{progress}%</p>
    </div>
  );
};

export default CircleProgress;
