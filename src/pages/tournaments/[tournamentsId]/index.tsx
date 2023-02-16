import type { NextPage } from "next";
import { useRouter } from "next/router";

const Tournament: NextPage = () => {
  const router = useRouter();

  return (
    <div>
      <h1>Tournament {router.query.tournamentsId}</h1>
    </div>
  );
};

export default Tournament;
