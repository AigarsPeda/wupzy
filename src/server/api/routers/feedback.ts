import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { FeedbackInputSchema } from "~/types/feedback.types";

export const feedbackRouter = createTRPCRouter({
  postFeedback: publicProcedure
    .input(FeedbackInputSchema)
    .mutation(async ({ input, ctx }) => {
      const lastFeedback = await ctx.prisma.feedback.findFirst({
        where: {
          email: input.email,
        },
        orderBy: {
          createdAt: "desc",
        },
      });

      if (lastFeedback) {
        const now = new Date();
        const lastFeedbackDate = new Date(lastFeedback.createdAt);
        const diff = now.getTime() - lastFeedbackDate.getTime();
        const hours = Math.floor(diff / (1000 * 60 * 60));
        if (hours < 24) {
          return {
            email: input.email,
            error: "You can only send one feedback per day.",
          };
        }
      }

      await ctx.prisma.feedback.create({
        data: {
          name: input.name,
          email: input.email,
          message: input.message,
        },
      });
      return {
        email: input.email,
      };
    }),
});
