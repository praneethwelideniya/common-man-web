import { z } from "zod";

export enum UserCreditorEnum {
  USERREF = "USERREF",
  USER = "USER",
  CREDITOR = "CREDITOR",
}

export const SimpleCreditorScheme = z.object({
  name: z.string(),
  description: z.string().optional(),
});

export type SimpleCreditor = z.infer<typeof SimpleCreditorScheme>;

const defaultScheme = z.object({
  type: z.enum([
    UserCreditorEnum.CREDITOR,
    UserCreditorEnum.USER,
    UserCreditorEnum.USERREF,
  ]),
});
export const phoneRegex = new RegExp(
  /^([+]?[\s0-9]+)?(\d{3}|[(]?[0-9]+[)])?([-]?[\s]?[0-9])+$/
);

export const UserCreateScheme = z.object({
  fullName: z.string().min(2),
  phoneNumber: z.string().regex(phoneRegex).optional().or(z.literal("")),
  email: z.string().email(),
});

const userTypeScheme = z.object({
  type: z.literal(UserCreditorEnum.USER),
  value: UserCreateScheme,
});

const creditorTypeScheme = z.object({
  type: z.literal(UserCreditorEnum.CREDITOR),
  value: SimpleCreditorScheme,
});

const userRefTypeScheme = z.object({
  type: z.literal(UserCreditorEnum.USERREF),
  value: z.string(),
});

const conditionalScheme = z.discriminatedUnion("type", [
  userTypeScheme,
  creditorTypeScheme,
  userRefTypeScheme,
]);

export const AddUserCreditorScheme = z.intersection(
  conditionalScheme,
  defaultScheme
);

export type AddUserCreditorRequest = z.infer<typeof AddUserCreditorScheme>;
