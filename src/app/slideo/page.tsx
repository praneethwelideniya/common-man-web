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
import { ContentType, propmtFormSchema, PropmtFormType } from "@/types/Slideo";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

// Force the page to be dynamic and allow streaming responses up to 30 seconds
export const dynamic = "force-dynamic";
export const maxDuration = 30;

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
      <div className="flex-col justify-center items-center px-2 xl:px-[5%] 2xl:px-[10%] ">
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
