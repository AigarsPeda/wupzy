import { useState } from "react";
import Button from "~/components/elements/Button/Button";
import { FeedbackInputSchema } from "~/types/feedback.types";
import { api } from "~/utils/api";

const Feedback = () => {
  const [error, setError] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);
  const { mutate, isPending } = api.feedback.postFeedback.useMutation({
    onSuccess: (data) => {
      if (data.error) {
        setError(data.error);
        return;
      }

      setIsSuccess(true);
    },
  });

  if (error) {
    return (
      <div className="mx-auto mb-10 mt-20 w-full max-w-3xl text-center md:mb-16 md:mt-36">
        <p className="font-normal text-gray-950 md:text-xl">{error}</p>
      </div>
    );
  }

  if (isSuccess) {
    return (
      <div className="mx-auto mb-10 mt-20 w-full max-w-3xl text-center md:mb-16 md:mt-36">
        <p className="font-normal text-gray-950 md:text-xl">
          Thank you for your feedback! We will get back to you soon!
        </p>
      </div>
    );
  }

  return (
    <form
      id="feedback-form"
      name="feedback-form"
      className="mx-auto max-w-lg rounded-md bg-white p-4 shadow md:mt-6"
      onSubmit={(e) => {
        e.preventDefault();
        const formData = new FormData(e.target as HTMLFormElement);
        const data = Object.fromEntries(formData.entries());
        const validInput = FeedbackInputSchema.parse(data);

        mutate(validInput);
      }}
    >
      <div className="space-y-10">
        <div className="flex flex-col space-y-4">
          <div className="flex flex-col space-y-2">
            <label htmlFor="name" className="text-sm font-semibold">
              Name
            </label>
            <input
              required
              id="name"
              type="text"
              name="name"
              className="rounded-md border border-gray-200 p-2"
              // placeholder="John Doe"
            />
          </div>
          <div className="flex flex-col space-y-2">
            <label htmlFor="email" className="text-sm font-semibold">
              Email
            </label>
            <input
              required
              id="email"
              type="email"
              name="email"
              className="rounded-md border border-gray-200 p-2"
              // placeholder=""
            />
          </div>
        </div>
        <div className="flex flex-col space-y-2">
          <label htmlFor="message" className="text-sm font-semibold">
            Message
          </label>
          <textarea
            rows={6}
            required
            id="message"
            name="message"
            placeholder="I would like to have..."
            className="rounded-md border border-gray-200 p-2"
          />
        </div>
        <div className="flex justify-end">
          <div className="w-20">
            <Button
              size="sm"
              title="Send"
              type="submit"
              isLoading={isPending}
            />
          </div>
        </div>
      </div>
    </form>
  );
};

export default Feedback;
