import { type NextPage } from "next";
import Link from "next/link";
import LoadingSkeleton from "~/components/elements/LoadingSkeleton/LoadingSkeleton";
import PageHead from "~/components/elements/PageHead/PageHead";
import GridLayout from "~/components/layout/GridLayout/GridLayout";
import { api } from "~/utils/api";
import classNames from "~/utils/classNames";
import formatDate from "~/utils/formatDate";

const SignupsPage: NextPage = () => {
  const { data, isLoading } = api.signupLink.getAllSignupLinks.useQuery();

  if (data?.signupLinks?.length === 0) {
    return (
      <div className="text-center">
        <h1 className="mt-10 text-3xl text-gray-400">No signup link found</h1>
      </div>
    );
  }

  return (
    <>
      <PageHead
        title="Wupzy | Tournaments"
        descriptionShort="Platform that lets you effortlessly create tournament tables."
        descriptionLong="Wupzy is a powerful platform that lets you effortlessly create
                        tournament tables, save game scores, view real-time results, and share
                        them with all participants in just a few clicks."
      />
      <GridLayout isGap minWith="320">
        {isLoading ? (
          <>
            {[...Array(4).keys()].map((_, index) => (
              <LoadingSkeleton key={index} classes="h-36 w-full" />
            ))}
          </>
        ) : (
          data?.signupLinks?.map((signupLink) => {
            return (
              <Link
                key={signupLink.id}
                href={{ pathname: `/signups/${signupLink.id}` }}
                className="flex w-full items-start justify-start rounded-lg border border-gray-100 bg-white p-4 text-left shadow-[rgba(50,_50,_105,_0.15)_0px_2px_5px_0px,_rgba(0,_0,_0,_0.05)_0px_1px_1px_0px] transition duration-300 ease-in-out hover:bg-gray-50 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-inset focus:ring-gray-800"
              >
                <div className="flex h-full w-full flex-col justify-between">
                  <h1 className="mt-4 truncate font-primary text-3xl font-normal text-gray-900">
                    {signupLink.name}
                  </h1>

                  <div className="mt-3 flex space-x-2">
                    <p
                      className={classNames(
                        signupLink.isActive ? "bg-green-500" : "bg-gray-900",
                        "rounded-md  px-2.5 py-1 font-primary text-xs font-normal capitalize text-gray-50",
                      )}
                    >
                      {signupLink.isActive ? "Active" : "Inactive"}
                    </p>
                    <p className="rounded-md bg-gray-900 px-2.5 py-1 font-primary text-xs font-normal capitalize text-gray-50">
                      {signupLink.type}
                    </p>
                  </div>
                  <div className="mt-6 flex w-24 items-center justify-start">
                    <p className="rounded-md bg-gray-50 px-2.5 py-1 font-primary text-xs capitalize text-gray-500">
                      {formatDate(signupLink.createdAt)}
                    </p>
                  </div>
                </div>
              </Link>
            );
          })
        )}
      </GridLayout>
    </>
  );
};

export default SignupsPage;
