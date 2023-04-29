import type { FC } from "react";

const ProductsLoading: FC = () => {
  return (
    <div className="mx-auto grid max-w-2xl grid-cols-1 gap-4 font-primary md:grid-cols-2">
      {[1, 2].map((_, i) => (
        <PLoading key={i} />
      ))}
    </div>
  );
};

export default ProductsLoading;

const PLoading: FC = () => {
  return (
    <div className="z-1 group relative mx-auto w-full max-w-sm animate-pulse rounded-lg border bg-white shadow-lg transition-all ">
      <div className="absolute -inset-1 animate-slow-ping rounded-lg bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 opacity-30 blur transition duration-1000 group-hover:animate-none group-hover:opacity-60 group-hover:duration-200"></div>
      <div className="items-top relative rounded-lg bg-white leading-none ring-1 ring-gray-900/5">
        <div className="w-full rounded-t-lg bg-gray-50 p-4">
          <div className="h-10 w-full rounded-md bg-gray-200 text-center font-primary" />
        </div>
        <div className="py-4">
          <div className="mx-auto px-4 pt-3">
            <div className="mx-auto flex items-center justify-center text-center font-primary">
              <div className="h-10 w-full rounded-md bg-gray-300" />
            </div>
          </div>
          <div className="flex w-full items-center justify-center px-4 pb-4 pt-7">
            <div className="buy-button h-10 w-20 rounded-lg bg-gray-400  px-6 py-2 text-base font-medium text-white transition-all group-hover:bg-violet-800 md:text-sm" />
          </div>
        </div>
      </div>
    </div>
  );
};
