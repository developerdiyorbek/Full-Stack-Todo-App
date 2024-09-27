import { z } from "zod";

export const addTodoSchema = z.object({
  title: z.string().min(2).max(50),
});
