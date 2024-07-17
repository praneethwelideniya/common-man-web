import { Spotlight } from "@/components/ui/Spotlight";

export default function TermsAndCondition() {
  return (
    <div className="min-h-screen h-full w-full rounded-md flex bg-black/[0.96] antialiased bg-grid-white/[0.02] relative overflow-hidden">
      <Spotlight
        className="-top-40 left-0 md:left-60 md:-top-20"
        fill="white"
      />
      <div className=" p-4 max-w-7xl relative z-10 lg:pr-60 lg:pl-24 mt-4 lg:mt-16   w-full pt-20 md:pt-0 text-white">
        <h1 className="text-2xl font-extrabold dark:text-white">
          Terms and Conditions
        </h1>
        <h2 className="text-xl font-extrabold dark:text-white mt-4">
          Agreement to Terms
        </h2>
        <p className="my-4 text-md ">
          These terms and conditions govern your use of our web app. By
          accessing or using the app, you agree to be bound by these terms.
        </p>
        <h2 className="text-xl font-extrabold dark:text-white">
          User-Generated Content
        </h2>
        <p className="my-4 text-md ">
          The content you create using our app is your own. You retain all
          ownership rights to your content.
        </p>
        <h2 className="text-xl font-extrabold dark:text-white">
          Content Sharing to Social Media
        </h2>
        <p className="my-4 text-md ">
          Our app allows you to share content to social media platforms. You are
          responsible for complying with the terms and conditions of those
          platforms.
        </p>
        <h2 className="text-xl font-extrabold dark:text-white">Termination</h2>
        <p className="my-4 text-md ">
          We reserve the right to terminate your access to the app for any
          reason, at any time.
        </p>
        <h2 className="text-xl font-extrabold dark:text-white">
          Changes to the Terms and Conditions
        </h2>
        <p className="my-4 text-md ">
          We reserve the right to modify these terms and conditions. We will
          notify you of any changes by posting the revised policy on our app.
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
