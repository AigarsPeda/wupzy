import { type NextPage } from "next";
import CTASection from "~/components/elements/CTASection/CTASection";
import EmailCollector from "~/components/elements/EmailCollector/EmailCollector";
import PageHead from "~/components/elements/PageHead/PageHead";

const HomePage: NextPage = () => {
  return (
    <>
      <PageHead
        title="Wupzy"
        descriptionShort="Platform that lets you effortlessly create tournament tables."
        descriptionLong="Wupzy is a powerful platform that lets you effortlessly create
          tournament tables, save game scores, view real-time results, and share
          them with all participants in just a few clicks."
      />
      <main className="px-4 py-4">
        <div className="mt-0 md:mt-10">
          <CTASection />
        </div>
        <div className="flex items-center justify-center">
          <EmailCollector />
        </div>
      </main>
    </>
  );
};

export default HomePage;

// const AuthShowcase: FC = () => {
//   const { data: sessionData } = useSession();

//   const { data: secretMessage } = api.example.getSecretMessage.useQuery(
//     undefined, // no input
//     { enabled: sessionData?.user !== undefined }
//   );

//   return (
//     <div className="flex flex-col items-center justify-center gap-4">
//       <p className="text-center text-2xl">
//         {sessionData && <span>Logged in as {sessionData.user?.name}</span>}
//         {secretMessage && <span> - {secretMessage}</span>}
//       </p>
//       <button
//         className="rounded-full bg-slate-800 px-10 py-3 font-semibold text-white no-underline transition"
//         onClick={sessionData ? () => void signOut() : () => void signIn()}
//       >
//         {sessionData ? "Sign out" : "Sign in"}
//       </button>
//     </div>
//   );
// };
