import { z } from "zod";


export const schema = z
  .object({
    name: z.string()
      .min(5, "Company name must be at least 5 characters")
      .max(50, "Company name must not exceed 50 characters"),
    firstName: z.string()
      .min(3, "First name must be at least 3 characters")
      .max(15, "First name must not exceed 15 characters"),
    lastName: z.string()
      .min(2, "Last name must be at least 2 characters")
      .max(10, "Last name must not exceed 10 characters"),
    email: z.string().email("Please provide a valid email"),
    password: z.string().min(6, "Password length should be greater than 6 characters"),
    cPassword: z.string().min(6, "Confirm Password must be at least 6 characters"),
  })
  .refine((data) => data.password === data.cPassword, {
    message: "Passwords do not match",
    path: ["cPassword"],
  });
