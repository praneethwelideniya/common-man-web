import { z } from "zod";

export enum DebtTypeEnum {
  LEND = "LEND",
  BORROW = "BORROW",
}

const UserCrediorScheme = z.object({
  type: z.enum(["USER", "CREDITOR"]),
  _id: z.string().min(1),
  ref: z.string().min(1).optional(),
  name: z.string().min(1),
});

const defaultProps = z.object({
  debtType: z.enum(["LEND", "BORROW"]).default("LEND"),
  involvedBy: UserCrediorScheme,
  amount: z.string().refine((val) => !Number.isNaN(parseFloat(val)), {
    message: "Expected number, received a string",
  }),
  currency: z.string().min(1),
  description: z.string().min(1),
  debtDate: z.preprocess((arg) => {
    if (typeof arg == "string" || arg instanceof Date) return new Date(arg);
  }, z.date()),
  interest: z
    .string()
    .refine((val) => !Number.isNaN(parseFloat(val)), {
      message: "Expected number, received a string",
    })
    .default("0")
    .optional(),
  repaymentType: z.enum(["INSTALLMENTS", "LUMPSUM"]),
});

const singleInstallmentScheme = z.object({
  installmentId: z.string().min(1),
  amount: z.string().min(1),
  dueDate: z.date(),
  paid: z.boolean(),
  paidAt: z.date().optional(),
});

const repaymentFrequencyShema = z.enum([
  "DAILY",
  "WEEKLY",
  "FORTNIGHTLY",
  "MONTHLY",
  "YEARLY",
]);

export type RepaymentFrequencyType = z.infer<typeof repaymentFrequencyShema>;

const installmentScheme = z.object({
  repaymentType: z.literal("INSTALLMENTS"),
  repaymentFrequency: repaymentFrequencyShema,
  installments: z.array(singleInstallmentScheme).optional(),
  numberOfInstallments: z
    .number()
    .refine((val) => Number.isInteger(val) && val > 0)
    .optional(),
});

const lumpsumScheme = z.object({
  repaymentType: z.literal("LUMPSUM"),
  dueDate: z.preprocess((arg) => {
    if (typeof arg == "string" || arg instanceof Date) return new Date(arg);
  }, z.date()),
});

const schemaCond = z.discriminatedUnion("repaymentType", [
  installmentScheme,
  lumpsumScheme,
]);

export const debtSchema = z.intersection(defaultProps, schemaCond);

// const schema = z.intersection(schemaOne, schemaCondOne);

export type UserCreditorType = z.infer<typeof UserCrediorScheme>;

// Infer type for typescript
export type DebtRequestType = z.infer<typeof debtSchema>;
