import Logo from "components/elements/Logo/Logo";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const Success = () => {
  const { query } = useRouter();
  const [stripeSessionId, setStripeSessionId] = useState("");

  // TODO:
  // After the user is redirected to the success page, we can get the session ID
  // from the query string and display it to the user.
  // and in backend create user in db
  // prefill user details in input fields

  useEffect(() => {
    if (!query.session_id || typeof query.session_id !== "string") return;
    setStripeSessionId(query.session_id);
  }, [query.session_id]);

  return (
    <>
      <div className="mb-10 transition-all md:mb-20 lg:mb-40">
        <Logo />
      </div>

      <div>
        <h1>Success!</h1>
        {stripeSessionId && <p>Session ID: {stripeSessionId}</p>}
        <p>Thanks for your submission.</p>
      </div>
    </>
  );
};

export default Success;
