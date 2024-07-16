import {
  contentFontFamilies,
  contentFontSizes,
  titleColors,
  titleFontFamilies,
  titleFontSizes,
} from "@/tailwindpalette";
import { z } from "zod";

export const propmtFormSchema = z.object({
  title: z.string().min(2),
  noOfScreens: z
    .string()
    .default("2")
    .refine(
      (val) =>
        Number.isInteger(Number(val)) && Number(val) >= 2 && Number(val) <= 10,
      " Should be between 2 to 10 "
    ),
});

export type PropmtFormType = z.infer<typeof propmtFormSchema>;

export const contentSchema = z.object({
  title: z
    .object({
      value: z.string().describe("Title of the content"),
      color: z
        .enum(titleColors)
        .describe(
          "Color of the title. (This is tailwind color property.) This should be match with backGroundGradient, content and other properties to make content more clear"
        ),
      fontFamily: z
        .enum(titleFontFamilies.map((font) => font.value))
        .describe(
          "Font Family of the title.(This is google fonts)  This should be match with backGroundGradient, content and other properties to make content more clear"
        ),
      fontSize: z
        .enum(titleFontSizes.map((size) => size.value))
        .describe(
          "Font Size of the title. (This is tailwind font size property.) This should be match with backGroundGradient, content and other properties to make content more clear"
        ),
    })
    .describe(
      "This is title object and do not use emojis, special characters like line breaks or links."
    ),

  content: z
    .object({
      value: z.string().describe("Content of the screen"),
      color: z
        .enum(titleColors)
        .describe(
          "Color of the content. (This is tailwind color property.) This should be match with backGroundGradient, title and other properties to make content more clear"
        ),
      fontFamily: z
        .enum(contentFontFamilies.map((font) => font.value))
        .describe(
          "Font Family of the content.(This is google fonts)  This should be match with backGroundGradient, title and other properties to make content more clear"
        ),
      fontSize: z
        .enum(contentFontSizes.map((size) => size.value))
        .describe(
          "Font Size of the content. (This is tailwind font size property.) This should be match with backGroundGradient, title and other properties to make content more clear"
        ),
    })
    .describe(
      "This is content object and do not use emojis, special characters like line breaks or links."
    ),

  backGround: z
    .string()
    .describe(
      "Css Back Ground gradient. should be match with content to make content more clear. Based on content can this can be solid"
    ),
  duration: z
    .number()
    .optional()
    .describe("Time in minuted taken by someone to read this"),
});

export type ContentType = z.infer<typeof contentSchema>;
