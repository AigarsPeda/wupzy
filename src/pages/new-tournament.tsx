import { type NextPage } from "next";
import { useSession } from "next-auth/react";

const NewTournamentPage: NextPage = () => {
  const { status } = useSession();

  if (status === "loading") {
    return <p>Loading...</p>;
  }

  if (status === "unauthenticated") {
    return <p>Access Denied</p>;
  }

  return (
    <div>
      <h1>NewTournamentPage</h1>
    </div>
  );
};

export default NewTournamentPage;
