import Logo from "components/elements/Logo/Logo";
import PageHead from "components/elements/PageHead/PageHead";

const PageNotFound = () => {
  return (
    <>
      <PageHead
        title="Wupzy | 404"
        descriptionShort="Platform that lets you effortlessly create tournament tables."
        descriptionLong="Wupzy is a powerful platform that lets you effortlessly create
          tournament tables, save game scores, view real-time results, and share
          them with all participants in just a few clicks."
      />
      <div className="mb-10 transition-all">
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
