import { Spotlight } from "@/components/ui/Spotlight";

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen w-full rounded-md flex bg-black/[0.96] antialiased bg-grid-white/[0.02] relative overflow-hidden">
      <Spotlight
        className="-top-40 left-0 md:left-60 md:-top-20"
        fill="white"
      />
      <div className=" p-4 max-w-7xl relative z-10 lg:pr-60 lg:pl-24 mt-4 lg:mt-16   w-full pt-20 md:pt-0 text-white">
        <h1 className="text-2xl font-extrabold dark:text-white">
          Privacy Policy
        </h1>
        <h2 className="text-xl font-extrabold dark:text-white mt-4">
          Introduction
        </h2>
        <p className="my-4 text-md ">
          This privacy policy outlines how our web app collects, uses, and
          stores your information.
        </p>
        <h2 className="text-xl font-extrabold dark:text-white">
          Information We Collect
        </h2>
        <p className="my-4 text-md ">
          We may collect your name, email address, and phone number during
          registration. However, we don't use this information for any specific
          purposes within the app.
        </p>
        <h2 className="text-xl font-extrabold dark:text-white">
          Content Sharing and User-Generated Content
        </h2>
        <p className="my-4 text-md ">
          Our app allows you to share content to social media platforms. Please
          refer to the privacy policies of those platforms to understand how
          they handle your information. The content you create using our app
          does not contain any personally identifiable information. We don't
          collect or store any content you generate within the app.
        </p>
        <h2 className="text-xl font-extrabold dark:text-white">
          Changes to the Privacy Policy
        </h2>
        <p className="my-4 text-md ">
          We reserve the right to modify this privacy policy. We will notify you
          of any changes by posting the revised policy on our app.
        </p>
        <h2 className="text-xl font-extrabold dark:text-white">Contact Us</h2>
        <p className="my-4 text-md ">
          If you have any questions about this privacy policy, please contact us
          at mpraneethw@gmail.com.
        </p>
      </div>
    </div>
  );
}
