import type { FC } from "react";

const CTASection: FC = () => {
  return (
    <div className="flex w-full flex-col items-center justify-center text-center">
      <div>
        <h1 className="max-w-4xl font-primary text-5xl font-extrabold tracking-tight md:text-7xl">
          Create your{" "}
          <span className="bg-gradient-to-r from-purple-400 to-pink-600 bg-clip-text text-7xl font-extrabold text-transparent">
            tournament{" "}
          </span>
          !
        </h1>

        <h2 className="mx-auto mb-5 mt-10 max-w-2xl font-primary font-medium text-gray-800 md:text-xl">
          Wupzy is your all-in-one solution for sports competition management.
          Our upcoming revamped platform will empower you to effortlessly create
          tournaments, track game results, generate playoff brackets, and engage
          with fellow athletes. Stay organized, save time, and elevate your
          sports experience with Wupzy.
        </h2>

        <p className="mx-auto my-6 max-w-2xl">
          * We&apos;re currently revamping our website to enhance your
          experience. Sign up below to receive a notification when the new and
          improved page is ready for you! Stay tuned for exciting updates and
          features.
        </p>
      </div>
    </div>
  );
};

export default CTASection;
