import CTASection from "components/elements/CTASection/CTAsection";
import Logo from "components/elements/Logo/Logo";
import RoundLinkButton from "components/elements/RoundLinkButton/RoundLinkButton";
import useRedirect from "hooks/useRedirect";
import { type NextPage } from "next";
import Head from "next/head";
import { useEffect } from "react";
import { api } from "utils/api";

const Home: NextPage = () => {
  // const hello = api.example.hello.useQuery({ text: "from tRPC" });

  const { redirectToPath } = useRedirect();
  const res = api.users.getCurrentUser.useQuery();

  useEffect(() => {
    console.log(res.data?.user);
    // if (!res.isLoading &&  res.data?.user) {
    //   redirectToPath("/login", true);
    // }
  }, [redirectToPath, res.data?.user, res.isLoading]);

  return (
    <>
      <Head>
        <title>Game Tracker</title>
        <meta name="description" content="Game Tracker" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="p-6">
        <div className="flex justify-between">
          <Logo />
          <RoundLinkButton href="/login" linkTitle="Login" />
        </div>
        <CTASection />
      </main>
    </>
  );
};

export default Home;
