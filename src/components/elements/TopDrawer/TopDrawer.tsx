import type { FC } from "react";
import classNames from "utils/classNames";

interface TopDrawerProps {
  handleClose: () => void;
  isSideDrawerOpen: boolean;
}

const TopDrawer: FC<TopDrawerProps> = ({ handleClose, isSideDrawerOpen }) => {
  return (
    <div
      className={classNames(
        isSideDrawerOpen ? "translate-y-0" : "-translate-y-full",
        "absolute bottom-0 left-0 right-0 top-0 z-[10] flex h-1/3 max-h-full max-w-full flex-col border-none bg-white bg-clip-padding text-neutral-700 shadow-sm outline-none transition duration-300 ease-in-out dark:bg-neutral-800 dark:text-neutral-200"
      )}
    >
      <div className="flex items-center justify-between p-4">
        <h5
          className="mb-0 font-semibold leading-normal"
          id="offcanvasTopLabel"
        >
          Offcanvas top
        </h5>
        <button
          type="button"
          className="box-content rounded-none border-none opacity-50 hover:no-underline hover:opacity-75 focus:opacity-100 focus:shadow-none focus:outline-none"
          onClick={handleClose}
        >
          <span className="w-[1em] focus:opacity-100 disabled:pointer-events-none disabled:select-none disabled:opacity-25 [&.disabled]:pointer-events-none [&.disabled]:select-none [&.disabled]:opacity-25">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              className="h-6 w-6"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </span>
        </button>
      </div>
      <div className="flex-grow overflow-y-auto p-4">...</div>
    </div>
  );
};

export default TopDrawer;
