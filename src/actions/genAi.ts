"use server";
import { PropmtFormType } from "@/app/slideo/page";
import {
  contentFontFamilies,
  contentFontSizes,
  titleColors,
  titleFontFamilies,
  titleFontSizes,
} from "@/tailwindpalette";
import { google } from "@ai-sdk/google";
import { generateText, generateObject } from "ai";

import { z } from "zod";

export async function getAnswer(question: string) {
  const { text } = await generateText({
    model: google("models/gemini-pro"),
    prompt: "Write a vegetarian lasagna recipe for 4 people.",
  });
}

export async function getTutorial(formValues: PropmtFormType) {
  const { object: tutorials } = await generateObject({
    model: google("models/gemini-1.5-pro-latest"),
    system: `You generate ${formValues.noOfScreens} content with 10,15 lines/per each for a short tutorial video.`,
    prompt: formValues.title,
    schema: z.object({
      tutorials: z.array(
        z.object({
          title: z
            .object({
              value: z.string().describe("Title of the content"),
              color: z
                // .enum(titleColors)
                .string()
                .describe(
                  `Color of the title. (This is tailwind color property.) Get one from ${titleColors}. This should be match with backGroundGradient, content and other properties to make content more clear`
                ),
              fontFamily: z
                // .enum(titleFontFamilies.map((font) => font.value))
                .string()
                .describe(
                  `Font Family of the title.(This is google fonts) Get One from these :${titleFontFamilies.map(
                    (font) => font.value
                  )}.  This should be match with backGroundGradient, content and other properties to make content more clear`
                ),
              fontSize: z
                // .enum(titleFontSizes.map((size) => size.value))
                .string()
                .describe(
                  `Font Size of the title. (This is tailwind font size property.) Get One from these :${titleFontSizes.map(
                    (size) => size.value
                  )}. This should be match with backGroundGradient, content and other properties to make content more clear`
                ),
            })
            .describe(
              "This is title object and do not use emojis, special characters like line breaks or links."
            ),

          content: z
            .object({
              value: z.string().describe("Content of the screen"),
              color: z
                // .enum(titleColors)
                .string()
                .describe(
                  `Color of the content. (This is tailwind color property.) get one from ${titleColors}. This should be match with backGroundGradient, title and other properties to make content more clear`
                ),
              fontFamily: z
                // .enum(contentFontFamilies.map((font) => font.value))
                .string()
                .describe(
                  `Font Family of the content.(This is google fonts) Get one from ${contentFontFamilies.map(
                    (font) => font.value
                  )} This should be match with backGroundGradient, title and other properties to make content more clear`
                ),
              fontSize: z
                // .enum(contentFontSizes.map((size) => size.value))
                .string()
                .describe(
                  `Font Size of the content. (This is tailwind font size property.). Get one ${contentFontSizes.map(
                    (size) => size.value
                  )}. This should be match with backGroundGradient, title and other properties to make content more clear`
                ),
            })
            .describe(
              "This is content object and do not use emojis, special characters like line breaks or links."
            ),

          backGround: z.string().describe(
            "Css Back Ground gradient.Should vanila css like (linear-gradient(43deg, rgb(65, 88, 208) 0%, rgb(200, 80, 192) 46%, rgb(255, 204, 112) 100%)). Always use rgb format for colors.  should be match with content to make content more clear." // Based on content can this can be solid"
          ),
          duration: z
            .number()
            .describe("Time in minuted taken by someone to read this"),
        })
      ),
    }),
  });

  return { tutorials };
}
