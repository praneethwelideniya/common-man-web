// "use client";

// import { useForm } from "react-hook-form";

// import {
//   Form,
//   FormControl,
//   FormDescription,
//   FormField,
//   FormItem,
//   FormLabel,
//   FormMessage,
// } from "@/components/ui/form";
// import { Input } from "@/components/ui/input";
// import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
// import { ChangeEvent, useState } from "react";
// import { Button } from "@/components/ui/button";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { z } from "zod";
// import { cn } from "@/lib/utils";
// import Image from "next/image";
// import { Upload } from "lucide-react";

// const bgImageSchema = z.object({
//   bgImage: z
//     .any()
//     .refine((file) => file?.length == 1, "Photo is required.")
//     .refine((file) => file[0]?.size <= 3000000, "Max file size is 3MB."),
// });

// type BgImage = z.infer<typeof bgImageSchema>;

// const aspectRatio = "portrait";

// function getImageData(event: ChangeEvent<HTMLInputElement>) {
//   // FileList is immutable, so we need to create a new one
//   const dataTransfer = new DataTransfer();

//   // Add newly uploaded images
//   Array.from(event.target.files!).forEach((image) =>
//     dataTransfer.items.add(image)
//   );

//   const files = dataTransfer.files;
//   const displayUrl = URL.createObjectURL(event.target.files![0]);

//   return { files, displayUrl };
// }

// export function ImageUpload({
//   preview,
//   setPreview,
// }: {
//   preview: any;
//   setPreview: () => void;
// }) {
//   const form = useForm<BgImage>({
//     mode: "onSubmit",
//     resolver: zodResolver(bgImageSchema),
//   });

//   function submitCircleRegistration(value: BgImage) {
//     console.log({ value });
//   }

//   return (
//     <>
//       <Form {...form}>
//         <form
//           className="space-y-8"
//           onSubmit={form.handleSubmit(submitCircleRegistration)}
//         >
//           {/* <div className="overflow-hidden rounded-md">
//             {preview && (
//               <Image
//                 src={preview}
//                 alt={"image"}
//                 width={5}
//                 height={10}
//                 className={cn(
//                   "h-auto w-auto object-cover transition-all hover:scale-105",
//                   aspectRatio === "portrait" ? "aspect-[3/4]" : "aspect-square"
//                 )}
//               />
//             )}
//           </div> */}
//           <FormField
//             control={form.control}
//             name="bgImage"
//             render={({ field: { onChange, value, ...rest } }) => (
//               <>
//                 <FormItem>
//                   <FormLabel>Upload Image</FormLabel>
//                   <FormControl>
//                     <Input
//                       type="file"
//                       {...rest}
//                       onChange={(event) => {
//                         const { files, displayUrl } = getImageData(event);
//                         setPreview(displayUrl);
//                         onChange(files);
//                       }}
//                     />
//                   </FormControl>
//                   <FormMessage />
//                 </FormItem>
//               </>
//             )}
//           />
//           {/* <Button type="submit">Upload</Button> */}
//         </form>
//       </Form>
//     </>
//   );
// }
