import type { FC } from "react";

const CTASection: FC = () => {
  return (
    <div className="flex w-full flex-col items-center justify-center text-center">
      <div>
        <h1 className="max-w-4xl font-primary text-5xl font-extrabold tracking-tight md:text-7xl">
          Create your{" "}
          <span className="bg-gradient-to-r from-purple-400 to-pink-600 bg-clip-text text-5xl font-extrabold text-transparent md:text-7xl">
            Tournament
          </span>
        </h1>

        <h2 className="mx-auto mb-5 mt-10 max-w-2xl font-primary font-medium text-gray-800 md:text-xl">
          Wupzy is your all-in-one solution for sports competition management.
          Our upcoming revamped platform will empower you to effortlessly create
          tournaments, track game results and generate playoff brackets. Stay
          organized, save time, and elevate your sports experience with Wupzy.
        </h2>

        <p className="mx-auto my-6 max-w-2xl font-primary font-normal text-gray-600">
          * Sign up now to be notified when page is ready, and as a bonus,
          receive 100 audition credits! Stay tuned for thrilling updates and
          exciting features coming your way.
        </p>
      </div>
    </div>
  );
};

export default CTASection;
