import z from "zod";

export const LinkSchema = z.object({
  public: z.boolean(),
  href: z.string().url(),
  label: z.string().min(1).max(50).optional(),
});

export type LinkType = z.infer<typeof LinkSchema>;
