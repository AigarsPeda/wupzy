import { z } from "zod";

export const FeedbackInputSchema = z.object({
  name: z.string(),
  email: z.string(),
  message: z.string(),
});
