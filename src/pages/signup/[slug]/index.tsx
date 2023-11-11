import { type NextPage } from "next";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import PageHead from "~/components/elements/PageHead/PageHead";
import { api } from "~/utils/api";

const TournamentPage: NextPage = () => {
  const { query } = useRouter();
  const [slug, setSlug] = useState("");
  const { data } = api.signupLink.getSignupLink.useQuery(
    { slug: slug },
    { enabled: Boolean(slug) },
  );

  useEffect(() => {
    if (query.slug && typeof query.slug === "string") {
      setSlug(query.slug);
    }
  }, [query.slug]);

  return (
    <>
      <PageHead
        title={`Wupzy | ${data?.signupLink?.name || "Share"}`}
        descriptionShort="Platform that lets you effortlessly create tournament tables."
        descriptionLong="Wupzy is a powerful platform that lets you effortlessly create
        tournament tables, save game scores, view real-time results, and share
        them with all participants in just a few clicks."
      />

      <div className="mt-4 flex items-center justify-between rounded py-1 md:mt-0">
        <h1 className="text-2xl font-bold text-gray-900">Sign up</h1>
        <p>{data?.signupLink?.name}</p>

        <div>
          <p>{data?.signupLink?.description}</p>
        </div>
      </div>
    </>
  );
};

export default TournamentPage;
