import { useSession } from "next-auth/react";
import { api } from "../utils/api";
import { useEffect, useState } from "react";

const useUser = () => {
  const [userId, setUserId] = useState("");
  const { data: sessionData } = useSession();
  const { data: user } = api.user.getUser.useQuery(
    { id: userId || "" },
    { enabled: Boolean(userId) },
  );

  useEffect(() => {
    if (sessionData) {
      setUserId(sessionData.user.id);
    }
  }, [sessionData]);

  return {
    user: user?.user,
  };
};

export default useUser;
