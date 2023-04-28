import Logo from "components/elements/Logo/Logo";

const PageNotFound = () => {
  return (
    <>
      <div className="mb-10 transition-all md:mb-20 lg:mb-40">
        <Logo />
      </div>
      <div className="h-full w-full text-center">
        <h1 className="mb-8 font-primary text-5xl text-gray-400">
          404 - Not found
        </h1>
        <p className="text-4xl">🥲</p>
      </div>
    </>
  );
};

export default PageNotFound;
