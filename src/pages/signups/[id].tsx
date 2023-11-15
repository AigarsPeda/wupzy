import { type NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import PageHead from "~/components/elements/PageHead/PageHead";
import SignupForm from "~/components/elements/SignupForm/SignupForm";
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
      {data?.signupLink && <SignupForm signupLink={data.signupLink} />}
    </>
  );
};

export default SignupPage;
