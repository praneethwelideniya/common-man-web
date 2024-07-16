import Image, { StaticImageData } from "next/image";

export default function BackgroundImage({
  alt,
  src,
}: {
  alt: string;
  src: StaticImageData | string;
}) {
  return (
    <Image
      alt={alt}
      src={src}
      fill
      objectFit="cover"
      className=" rounded-none "
      style={{
        zIndex: -1,
      }}
    />
  );
}

// <Image
//       alt="Mountains"
//       src={mountains}
//       placeholder="blur"
//       quality={100}
//       fill
//       sizes="100vw"
//       className=" rounded-none"
//       style={{
//         objectFit: "cover",
//         zIndex: -1,
//         opacity: "0.2",
//       }}
//     />
