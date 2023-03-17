import CTASection from "components/elements/CTASection/CTASection";
import { type NextPage } from "next";
import Head from "next/head";

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>WUPZY</title>
        <meta name="description" content="WUPZY" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="py-4 px-4 md:py-12 md:px-20">
        <CTASection />
      </main>
    </>
  );
};

export default Home;
