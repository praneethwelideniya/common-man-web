"use client";

import { getTutorial } from "@/actions/genAi";
import { useState } from "react";

import Loader from "@/components/Loader";
import VideoPreview from "@/components/VideoPreview";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  contentFontFamilies,
  contentFontSizes,
  titleColors,
  titleFontFamilies,
  titleFontSizes,
} from "@/tailwindpalette";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

// Force the page to be dynamic and allow streaming responses up to 30 seconds
export const dynamic = "force-dynamic";
export const maxDuration = 30;

const propmtFormSchema = z.object({
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

export default function GeminiComponent() {
  const form = useForm<PropmtFormType>({
    resolver: zodResolver(propmtFormSchema),
    defaultValues: {
      noOfScreens: "2",
    },
  });

  const [generation, setGeneration] = useState<Array<ContentType>>([
    {
      title: {
        value: "Hye",
        color: titleColors[0],
        fontFamily: titleFontFamilies[0].value,
        fontSize: titleFontSizes[2].value,
      },
      content: {
        value: "Welcome to Slideo",
        color: titleColors[0],
        fontFamily: contentFontFamilies[0].value,
        fontSize: contentFontSizes[3].value,
      },
      backGround:
        "linear-gradient(43deg, rgb(65, 88, 208) 0%, rgb(200, 80, 192) 46%, rgb(255, 204, 112) 100%)",
    },
    {
      title: {
        value: "Make a short",
        color: titleColors[0],
        fontFamily: titleFontFamilies[0].value,
        fontSize: titleFontSizes[2].value,
      },
      content: {
        value: "Please Wirte Anything that you want to make a short video",
        color: titleColors[0],
        fontFamily: contentFontFamilies[0].value,
        fontSize: contentFontSizes[3].value,
      },
      backGround:
        "linear-gradient(43deg, rgb(65, 88, 208) 0%, rgb(200, 80, 192) 46%, rgb(255, 204, 112) 100%)",
    },
  ]);

  const generateTutorials = async (formValues: PropmtFormType) => {
    setGeneration([]);

    console.log({ formValues });
    const res = await getTutorial(formValues);

    console.log({ res });

    setGeneration(res.tutorials.tutorials);
  };

  return (
    <>
      {form.formState.isSubmitting && <Loader />}
      <div className="flex-col justify-center items-center lg:px-[10%]">
        {form.formState.isSubmitting && <Loader />}
        <Card className="lg:m-20 flex flex-col justify-center bg-transparent">
          <CardContent>
            <Form {...form}>
              {form.formState.isSubmitting && <Loader />}
              <form>
                <div className=" grid lg:grid-cols-5 gap-2 mb-4">
                  <div className=" col-span-2">
                    <FormField
                      control={form.control}
                      name="title"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Topic Name</FormLabel>
                          <FormControl>
                            <Input placeholder="Topic Name" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <div>
                    <FormField
                      control={form.control}
                      name="noOfScreens"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>No of screens</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="No of screens"
                              {...field}
                              defaultValue={"2"}
                              type="number"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>
              </form>
            </Form>
            <Button
              type="submit"
              onClick={form.handleSubmit(generateTutorials)}
            >
              Generate
            </Button>
          </CardContent>

          {generation && generation.length > 0 && (
            <VideoPreview screens={generation} />
          )}
        </Card>
      </div>
    </>
  );
}
