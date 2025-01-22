import { ZodError } from "zod";

export const formatZodMessage = (err: ZodError) => {
  const message = err.issues;
  return message.map((i) => i.message).join(",");
};
