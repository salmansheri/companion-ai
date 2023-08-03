import * as z from "zod";

export const CompanionFormSchema = z.object({
  name: z.string().min(1, {
    message: "Name is required to be atleast above one Character",
  }),
  description: z.string().min(1, {
    message: "Description is required to be atleast above one Character",
  }),
  instructions: z.string().min(200, {
    message: "Instructions is required to be atleast above 200 Character",
  }),
  seed: z.string().min(200, {
    message: "seed is required to be atleast above 200 Character",
  }),
  src: z
    .string()
    .min(1, {
      message: "Image is required to be atleast above one Character",
    })
    .optional(),
  categoryId: z.string().min(1, {
    message: "Category is required ",
  }),
});

export type CompanionFormType = z.infer<typeof CompanionFormSchema>;
