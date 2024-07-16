// pages/capture.js
"use client";

import BackgroundImage from "@/components/BackgroundImage";
import Loader from "@/components/Loader";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Carousel,
  type CarouselApi,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Label } from "@/components/ui/label";
import {
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  backgroundColors,
  contentFontFamilies,
  contentFontSizes,
  titleColors,
  titleFontFamilies,
  titleFontSizes,
} from "@/tailwindpalette";
import { ContentType } from "@/types/Slideo";
import { fetchFile } from "@ffmpeg/util";
import { Select, SelectTrigger } from "@radix-ui/react-select";
import html2canvas from "html2canvas";
import { useEffect, useReducer, useRef, useState } from "react";
import ColorPicker from "react-best-gradient-color-picker";

function screenReducer(
  state: ContentType[],
  action: {
    type: {
      screen: number;
      property: "title" | "content" | "backGround";
      subProperty: "color" | "fontSize" | "fontFamily";
    };
    payload: string;
  }
) {
  let screen = state[action.type.screen];
  if (action.type.property == "title") {
    switch (action.type.subProperty) {
      case "color":
        screen.title.color = action.payload;
        break;
      case "fontFamily":
        screen.title.fontFamily = action.payload;
        break;
      case "fontSize":
        screen.title.fontSize = action.payload;
        break;
      default:
        break;
    }
  } else if (action.type.property == "content") {
    switch (action.type.subProperty) {
      case "color":
        screen.content.color = action.payload;
        break;
      case "fontFamily":
        screen.content.fontFamily = action.payload;
        break;
      case "fontSize":
        screen.content.fontSize = action.payload;
        break;
      default:
        break;
    }
  } else if (action.type.property == "backGround") {
    screen.backGround = action.payload;
  }
  state[action.type.screen] = screen;
  return [...state];
}

const VideoPreview = ({ screens }: { screens: ContentType[] }) => {
  const [slides, dispatch] = useReducer(screenReducer, screens);

  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const [count, setCount] = useState(0);
  const [videoGenerating, setVideoGenerating] = useState(false);

  useEffect(() => {
    if (!api) {
      return;
    }

    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap() + 1);

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap() + 1);
    });
  }, [api]);
  const itemEls = useRef(new Array());

  const [videoUrl, setVideoUrl] = useState(null);

  const [preview, setPreview] = useState("");

  const convertImagesToVideo = async (images: any) => {
    const FFmpeg = (await import("@ffmpeg/ffmpeg")).FFmpeg;
    const ffmpeg = new FFmpeg();
    await ffmpeg.load();
    images.forEach(async (image: any, index: any) => {
      const a = await ffmpeg.writeFile(
        `img${index}.png`,
        await fetchFile(image)
      );
      console.log(a);
    });
    await new Promise((resolve) => setTimeout(resolve, 2000));

    const b = await ffmpeg.exec([
      "-framerate",
      "0.2", // Set frame rate to 1 frame per second
      "-i",
      "img%d.png", // Input files with a pattern 'img%d.png'
      "-c:v",
      "libx264", // Use the libx264 codec
      "-b:v",
      "8000k", // Set video bitrate to 2000 kbps
      "-crf",
      "2", // Set constant rate factor to 18 (lower is better quality, but larger file size)
      "-pix_fmt",
      "yuv420p", // Use YUV 4:2:0 pixel format
      "out.mp4", // Output file name
    ]);
    console.log(b);
    const data = await ffmpeg.readFile("out.mp4");
    const url = URL.createObjectURL(
      new Blob([data.buffer], { type: "video/mp4" })
    );
    setVideoUrl(url);
  };

  const captureFrame = async (element: any) => {
    const canvas = await html2canvas(element, { scale: 2 });
    return canvas.toDataURL();
  };

  return (
    <>
      {videoGenerating && <Loader />}
      <div className="flex flex-col justify-center items-center space-y-10 p-10">
        <div className=" grid gap-8 lg:grid-cols-4">
          <Carousel setApi={setApi} className="w-full max-w-md  col-span-2">
            <CarouselContent className=" h-[90svh]">
              {slides.map((screen, index) => (
                <CarouselItem key={index} className="relative w-full h-[90svh]">
                  <Card
                    className={` flex flex-col items-center justify-between rounded-none h-[90svh] `}
                    style={{
                      background: preview ? "transparent" : screen.backGround,
                    }}
                    ref={(element) => (itemEls.current[index] = element)}
                  >
                    {preview && <BackgroundImage alt={"alt"} src={preview} />}
                    <CardHeader>
                      <CardTitle
                        className={`text-center text-4xl ${screen.title.color} ${screen.title.fontSize} ${screen.title.fontFamily}`}
                      >
                        {screen.title.value}
                      </CardTitle>
                    </CardHeader>
                    <CardContent
                      className={`flex flex-col aspect-square items-center justify-center p-6 text-center font-semibold  ${screen.content.color} ${screen.content.fontSize} ${screen.content.fontFamily}`}
                    >
                      <p>{screen.content.value}</p>
                    </CardContent>
                    <CardFooter className=" text-xs">
                      <p>Created by Commonman-ai</p>
                    </CardFooter>
                  </Card>
                </CarouselItem>
              ))}
            </CarouselContent>

            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
          <Button
            className=" col-span-2 lg:hidden"
            onClick={async () => {
              const images = [];
              const totalFrames = 20; // Number of frames to capture
              const interval = 0.5; // Interval in milliseconds between frames

              for (const singleRef of itemEls.current) {
                // for (let frame = 0; frame < totalFrames; frame++) {
                //   await new Promise((resolve) => setTimeout(resolve, interval));
                const image = await captureFrame(singleRef);
                images.push(image);
                // }
              }

              try {
                setVideoGenerating(true);
                await convertImagesToVideo(images);
              } catch (e) {
                setVideoGenerating(false);
                console.log({ e });
              }
              setVideoGenerating(false);
            }}
          >
            Generate Video
          </Button>

          <Tabs defaultValue="background" className="w-[400px] pl-8">
            <TabsList className=" flex flex-row justify-between px-5">
              <TabsTrigger value="background">Background</TabsTrigger>
              <TabsTrigger value="title">Title</TabsTrigger>
              <TabsTrigger value="content">content</TabsTrigger>
            </TabsList>
            <TabsContent value="background" className=" w-10 h-20">
              {/* <ImageUpload preview={preview} setPreview={setPreview} /> */}

              <ColorPicker
                color={slides[current - 1]?.backGround || "#FFFFFF"}
                onChange={(clr) => {
                  dispatch({
                    type: {
                      screen: current - 1,
                      property: "backGround",
                      subProperty: "color",
                    },
                    payload: clr,
                  });
                }}
              />
            </TabsContent>
            <TabsContent value="title" className=" flex flex-col">
              <Label> Color </Label>
              <div className=" flex  flex-wrap justify-start items-center  align-baseline">
                {/* {["bg-red-500", "bg-orange-500", "bg-lime-100"].map(
                (val, index) => (
                  <div
                    className={` w-10 h-10  rounded-md border-black border-2 ${val}`}
                  />
                )
              )} */}

                {backgroundColors.map((val, index) => (
                  <div
                    key={index}
                    onClick={() => {
                      dispatch({
                        type: {
                          screen: current - 1,
                          property: "title",
                          subProperty: "color",
                        },
                        payload: titleColors[index],
                      });
                    }}
                    className={` w-10 h-10  rounded-sm border-black border-[1px]  m-2 ${val} text-center justify-center  font-bold text-2xl`}
                  />
                ))}
              </div>
              <Label>Font Size</Label>
              <Select
                value={slides[current - 1]?.title.fontSize}
                defaultValue={slides[current - 1]?.title.fontSize}
                onValueChange={(val) => {
                  dispatch({
                    type: {
                      screen: current - 1,
                      property: "title",
                      subProperty: "fontSize",
                    },
                    payload: val,
                  });
                }}
              >
                <SelectTrigger className="w-[180px] border-2">
                  <SelectValue placeholder="Select Font" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    {titleFontSizes.map((value, index) => (
                      <SelectItem value={value.value} key={index}>
                        {value.name}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>

              <Label>Font</Label>
              <Select
                value={slides[current - 1]?.title.fontFamily}
                defaultValue={slides[current - 1]?.title.fontFamily}
                onValueChange={(val) => {
                  dispatch({
                    type: {
                      screen: current - 1,
                      property: "title",
                      subProperty: "fontFamily",
                    },
                    payload: val,
                  });
                }}
              >
                <SelectTrigger className="w-[180px] border-2">
                  <SelectValue placeholder="Select Font" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    {titleFontFamilies?.map((value, index) => (
                      <SelectItem
                        value={value.value}
                        className={` ${value.value}`}
                        key={index}
                      >
                        {value.name}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </TabsContent>
            <TabsContent value="content" className=" flex flex-col">
              <Label> Color </Label>
              <div className=" flex  flex-wrap justify-start items-center  align-baseline">
                {backgroundColors.map((val, index) => (
                  <div
                    key={index}
                    onClick={() => {
                      dispatch({
                        type: {
                          screen: current - 1,
                          property: "content",
                          subProperty: "color",
                        },
                        payload: titleColors[index],
                      });
                    }}
                    className={` w-10 h-10  rounded-sm border-black border-[1px]  m-2 ${val} text-center justify-center  font-bold text-2xl`}
                  />
                ))}
              </div>
              <Label>Font Size</Label>
              <Select
                value={slides[current - 1]?.content.fontSize}
                defaultValue={slides[current - 1]?.content.fontSize}
                onValueChange={(val) => {
                  dispatch({
                    type: {
                      screen: current - 1,
                      property: "content",
                      subProperty: "fontSize",
                    },
                    payload: val,
                  });
                }}
              >
                <SelectTrigger className="w-[180px] border-2">
                  <SelectValue placeholder="Select Font" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    {contentFontSizes.map((value, index) => (
                      <SelectItem value={value.value} key={index}>
                        {value.name}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>

              <Label>Font</Label>
              <Select
                value={slides[current - 1]?.content.fontFamily}
                defaultValue={slides[current - 1]?.content.fontFamily}
                onValueChange={(val) => {
                  dispatch({
                    type: {
                      screen: current - 1,
                      property: "content",
                      subProperty: "fontFamily",
                    },
                    payload: val,
                  });
                }}
              >
                <SelectTrigger className="w-[180px] border-2">
                  <SelectValue placeholder="Select Font" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    {contentFontFamilies?.map((value, index) => (
                      <SelectItem
                        value={value.value}
                        className={` ${value.value}`}
                        key={index}
                      >
                        {value.name}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </TabsContent>
          </Tabs>
        </div>

        <Button
          className=" invisible lg:visible"
          onClick={async () => {
            const images = [];
            const totalFrames = 20; // Number of frames to capture
            const interval = 0.5; // Interval in milliseconds between frames

            for (const singleRef of itemEls.current) {
              // for (let frame = 0; frame < totalFrames; frame++) {
              //   await new Promise((resolve) => setTimeout(resolve, interval));
              const image = await captureFrame(singleRef);
              images.push(image);
              // }
            }

            try {
              setVideoGenerating(true);
              await convertImagesToVideo(images);
            } catch (e) {
              setVideoGenerating(false);
              console.log({ e });
            }
            setVideoGenerating(false);
          }}
        >
          Generate Video
        </Button>
        {videoUrl && (
          <Carousel className="w-full max-w-md ">
            <CarouselContent>
              <CarouselItem>
                <video src={videoUrl} controls className="mt-4" />
              </CarouselItem>
            </CarouselContent>
          </Carousel>
        )}
      </div>
    </>
  );
};

export default VideoPreview;

{
  /* <motion.div
  initial={{ background: gradients[0] }}
  animate={{ background: gradients[gradientIndex] }}
  transition={{ duration: 2 }}
  className="flex-col items-center justify-between p-4 rounded-lg shadow-lg"
></motion.div>; */
}
