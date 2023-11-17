import { Editor } from "@tinymce/tinymce-react";
import { type NextPage } from "next";
import { useRef, useState } from "react";
import { Editor as TinyMCEEditor } from "tinymce";
import Button from "~/components/elements/Button/Button";
import Input from "~/components/elements/Input/Input";
import PageHead from "~/components/elements/PageHead/PageHead";
import RadioSelect from "~/components/elements/RadioSelect/RadioSelect";
import TextButton from "~/components/elements/TextButton/TextButton";
import useCreateTournament from "~/hooks/useCreateTournament";
import useRedirect from "~/hooks/useRedirect";
import { api } from "~/utils/api";

const HomePage: NextPage = () => {
  const { redirectToPath } = useRedirect();
  const editorRef = useRef<TinyMCEEditor | null>(null);
  const [signupDescription, setSignupDescription] = useState("");
  const { newTournament, changeTournamentName, changeTournamentKind } =
    useCreateTournament();

  const { mutate: postSignupLink, isPending } =
    api.signupLink.postSignupLink.useMutation({
      onSuccess: (data) => {
        redirectToPath(`/signups/${data.signupLink.id}`);
      },
    });

  const log = () => {
    if (editorRef.current) {
      console.log(editorRef.current.getContent());
    }
  };

  return (
    <>
      <PageHead
        title="Wupzy"
        descriptionShort="Platform that lets you effortlessly organize and manage tournament."
        descriptionLong="Wupzy is a powerful platform that lets you effortlessly create
          tournament tables, save game scores, view real-time results, and share
          them with all participants in just a few clicks."
      />
      <main>
        <form
          id="new-tournament"
          name="new-tournament"
          className="mx-auto max-w-lg rounded-md bg-white p-2 shadow md:mt-6"
          onSubmit={(e) => {
            e.preventDefault();
          }}
        >
          <div className="space-y-10">
            <div className="mt-4 border-b border-gray-900/10 pb-12">
              <legend className="text-base font-semibold leading-7 text-gray-900">
                Signup link name
              </legend>
              <div className="grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                <div className="sm:col-span-4">
                  <Input
                    inputLabel=""
                    inputFor="Signup link name"
                    inputVal={newTournament.name}
                    handleInputChange={changeTournamentName}
                  />
                </div>
              </div>
            </div>

            <div className="border-b border-gray-900/10 pb-12">
              <fieldset>
                <legend className="text-base font-semibold leading-7 text-gray-900">
                  Tournament kind
                </legend>
                <p className="mt-1 text-sm leading-6 text-gray-600">
                  Select the type of tournament you wish to create.
                </p>
                <div className="mt-6 space-y-6">
                  <RadioSelect
                    radioTitle="King"
                    radioValue="king"
                    radioName="tournament-kind"
                    radioSelectedValue={newTournament.kind}
                    handleRadioChange={changeTournamentKind}
                  />
                  <RadioSelect
                    radioTitle="Teams"
                    radioValue="teams"
                    radioName="tournament-kind"
                    radioSelectedValue={newTournament.kind}
                    handleRadioChange={changeTournamentKind}
                  />
                </div>
              </fieldset>
            </div>
            <fieldset>
              <legend className="text-base font-semibold leading-7 text-gray-900">
                Description
              </legend>
              <p className="mt-1 text-sm leading-6 text-gray-600">
                Write a short description of your tournament. Place, date, time,
                etc.
              </p>
              <div className="mt-6 space-y-6">
                <Editor
                  apiKey="zw1n6nj7t4xsnb4gxl58tq7kh5l48005h4ns2lrqfa9vpnmr"
                  onInit={(_evt, editor) => (editorRef.current = editor)}
                  // initialValue="<p>Place, date, time, etc.</p>"
                  init={{
                    height: 500,
                    menubar: false,
                    branding: false,

                    plugins: [
                      "advlist",
                      "autolink",
                      "lists",
                      "link",
                      // "image",
                      "charmap",
                      "preview",
                      "anchor",
                      "searchreplace",
                      "visualblocks",
                      // "code",
                      // "fullscreen",
                      "insertdatetime",
                      "media",
                      // "table",
                      // "code",
                      // "help",
                      "wordcount",
                    ],
                    toolbar:
                      // "undo redo | blocks | " +
                      // "bold italic forecolor | alignleft aligncenter " +
                      // "alignright alignjustify | bullist numlist outdent indent | " +
                      // "removeformat | help",
                      `undo redo | blocks | bold italic forecolor | alignleft aligncenter`,
                    content_style:
                      "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
                  }}
                />
                {/* <button onClick={log}>Log editor content</button> */}
              </div>
            </fieldset>
          </div>

          <div className="mt-6 flex items-center justify-end gap-x-6">
            <TextButton
              title="Cancel"
              handleClick={() => redirectToPath("/tournaments")}
            />

            <div className="w-20">
              <Button
                size="sm"
                title="Create"
                type="button"
                isLoading={isPending}
                handleClick={() => {
                  postSignupLink({
                    name: newTournament.name,
                    description: signupDescription,
                    tournamentKind: newTournament.kind,
                  });
                }}
                isDisabled={newTournament.name.trim() === ""}
              />
            </div>
          </div>
        </form>
      </main>
    </>
  );
};

export default HomePage;
