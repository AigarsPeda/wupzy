import { type NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import PageHead from "~/components/elements/PageHead/PageHead";
import { env } from "~/env.mjs";
import { api } from "~/utils/api";

const SignupPage: NextPage = () => {
  const { query } = useRouter();
  const [id, setId] = useState("");
  const { data } = api.signupLink.getSignupLinkById.useQuery(
    { id: id },
    { enabled: Boolean(id) },
  );

  useEffect(() => {
    if (query.id && typeof query.id === "string") {
      setId(query.id);
    }
  }, [query.id]);

  return (
    <>
      <PageHead
        title={`Wupzy | Signup ${data?.signupLink?.name || ""}`}
        descriptionShort="Platform that lets you effortlessly create tournament tables."
        descriptionLong="Wupzy is a powerful platform that lets you effortlessly create
        tournament tables, save game scores, view real-time results, and share
        them with all participants in just a few clicks."
      />

      <div className="mx-auto max-w-lg rounded-md bg-white p-2 shadow md:mt-6">
        <div className="space-y-8">
          <div className="mt-4 border-b border-gray-900/10 pb-12">
            <fieldset>
              <legend className="text-base font-semibold leading-7 text-gray-900">
                Tournament name
              </legend>
              <p className="mt-1 text-sm leading-6 text-gray-600">
                {data?.signupLink?.name}
              </p>
            </fieldset>
            <fieldset className="mt-4">
              <legend className="text-base font-semibold leading-7 text-gray-900">
                Tournament kind
              </legend>
              <p className="mt-1 text-sm capitalize leading-6 text-gray-600">
                {data?.signupLink?.type}
              </p>
            </fieldset>
            <fieldset className="mt-4">
              <legend className="text-base font-semibold leading-7 text-gray-900">
                Description
              </legend>
              <p className="mt-1 text-sm leading-6 text-gray-600">
                {data?.signupLink?.description}
              </p>
            </fieldset>
            <fieldset className="mt-4">
              <legend className="text-base font-semibold leading-7 text-gray-900">
                Link to share
              </legend>
              <p className="mt-1 text-sm leading-6 text-gray-600">
                {env.NEXT_PUBLIC_APP_DOMAIN}/signup/{data?.signupLink?.slug}
              </p>
            </fieldset>
          </div>
          <div className="pb-10">
            <fieldset>
              <legend className="text-base font-semibold leading-7 text-gray-900">
                Enrolled{" "}
                {data?.signupLink?.type === "teams" ? "teams" : "player"}:
              </legend>
              {data?.signupLink?.type === "teams"
                ? data?.signupLink?.teams?.map((team) => {
                    return (
                      <div key={team.id}>
                        <p className="mt-1 text-sm leading-6 text-gray-600">
                          {team.name}
                        </p>
                      </div>
                    );
                  })
                : data?.signupLink?.players?.map((player) => {
                    return (
                      <div key={player.id}>
                        <p className="mt-1 text-sm leading-6 text-gray-600">
                          {player.name}
                        </p>
                      </div>
                    );
                  })}
            </fieldset>
          </div>
        </div>
      </div>
    </>
  );
};

export default SignupPage;
