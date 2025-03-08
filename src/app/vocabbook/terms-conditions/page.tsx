import { Spotlight } from "@/components/ui/Spotlight";

export default function TermsAndCondition() {
  return (
    <div className="min-h-screen h-full w-full rounded-md flex bg-black/[0.96] antialiased bg-grid-white/[0.02] relative overflow-hidden">
      <Spotlight
        className="-top-40 left-0 md:left-60 md:-top-20"
        fill="white"
      />
      <div className="p-4 max-w-7xl relative z-10 lg:pr-60 lg:pl-24 mt-4 lg:mt-16 w-full pt-20 md:pt-0 text-white">
        <h1 className="text-2xl font-extrabold dark:text-white">
          Terms and Conditions
        </h1>
        <p className="text-md my-4">
          Last Updated: {new Date().toLocaleDateString()}
        </p>
        <h2 className="text-xl font-extrabold dark:text-white mt-4">
          1. Agreement to Terms
        </h2>
        <p className="my-4 text-md">
          By accessing or using the VocabBook mobile application ("App"), you
          agree to be bound by these Terms and Conditions. If you disagree with
          any part of these terms, you do not have permission to access the App.
        </p>
        <h2 className="text-xl font-extrabold dark:text-white">
          2. Account Registration
        </h2>
        <h3 className="text-lg font-bold dark:text-white mt-2">
          2.1 Account Creation
        </h3>
        <ul className="list-disc list-inside my-4 text-md">
          <li>
            You may create an account using email authentication or continue as
            a guest
          </li>
          <li>You must provide accurate and complete information</li>
          <li>
            You are responsible for maintaining the confidentiality of your
            account credentials
          </li>
        </ul>
        <h3 className="text-lg font-bold dark:text-white mt-2">
          2.2 Account Security
        </h3>
        <ul className="list-disc list-inside my-4 text-md">
          <li>You are responsible for all activities under your account</li>
          <li>Notify us immediately of any unauthorized access</li>
          <li>
            We reserve the right to disable accounts used for unauthorized
            purposes
          </li>
        </ul>
        <h2 className="text-xl font-extrabold dark:text-white">
          3. App Features and Services
        </h2>
        <h3 className="text-lg font-bold dark:text-white mt-2">
          3.1 Basic Services
        </h3>
        <ul className="list-disc list-inside my-4 text-md">
          <li>Vocabulary management</li>
          <li>Word practice and learning tools</li>
          <li>Book organization</li>
          <li>Progress tracking</li>
        </ul>
        <h3 className="text-lg font-bold dark:text-white mt-2">
          3.2 Device Features
        </h3>
        <ul className="list-disc list-inside my-4 text-md">
          <li>Camera access for text scanning</li>
          <li>Photo library access for image processing</li>
          <li>Local storage for offline access</li>
        </ul>
        <h2 className="text-xl font-extrabold dark:text-white">
          4. User Content
        </h2>
        <h3 className="text-lg font-bold dark:text-white mt-2">
          4.1 Your Content
        </h3>
        <ul className="list-disc list-inside my-4 text-md">
          <li>You retain rights to content you add to the App</li>
          <li>
            You grant us license to store and display your content within the
            App
          </li>
          <li>You are responsible for the content you add</li>
        </ul>
        <h3 className="text-lg font-bold dark:text-white mt-2">
          4.2 Prohibited Content
        </h3>
        <p className="my-4 text-md">You agree not to add:</p>
        <ul className="list-disc list-inside my-4 text-md">
          <li>Offensive or inappropriate content</li>
          <li>Copyrighted material without permission</li>
          <li>Malicious content or code</li>
          <li>Content that violates any laws</li>
        </ul>
        <h2 className="text-xl font-extrabold dark:text-white">
          5. Acceptable Use
        </h2>
        <p className="my-4 text-md">You agree not to:</p>
        <ul className="list-disc list-inside my-4 text-md">
          <li>Use the App for any illegal purposes</li>
          <li>Attempt to gain unauthorized access</li>
          <li>Interfere with the App's functionality</li>
          <li>Share account credentials</li>
          <li>Reverse engineer the App</li>
        </ul>
        <h2 className="text-xl font-extrabold dark:text-white">
          6. Intellectual Property
        </h2>
        <h3 className="text-lg font-bold dark:text-white mt-2">
          6.1 App Content
        </h3>
        <ul className="list-disc list-inside my-4 text-md">
          <li>
            The App and its original content are protected by copyright and
            other intellectual property laws
          </li>
          <li>
            You may not copy, modify, or distribute our content without
            permission
          </li>
        </ul>
        <h3 className="text-lg font-bold dark:text-white mt-2">
          6.2 Trademarks
        </h3>
        <p className="my-4 text-md">
          All trademarks, logos, and service marks are property of their
          respective owners
        </p>
        <h2 className="text-xl font-extrabold dark:text-white">
          7. Third-Party Services
        </h2>
        <h3 className="text-lg font-bold dark:text-white mt-2">
          7.1 External Services
        </h3>
        <p className="my-4 text-md">We use:</p>
        <ul className="list-disc list-inside my-4 text-md">
          <li>Firebase for authentication and data storage</li>
          <li>Google Cloud services for text recognition</li>
          <li>Other supporting services for app functionality</li>
        </ul>
        <h3 className="text-lg font-bold dark:text-white mt-2">
          7.2 Third-Party Terms
        </h3>
        <ul className="list-disc list-inside my-4 text-md">
          <li>
            Usage of third-party services is subject to their respective terms
          </li>
          <li>We are not responsible for third-party services</li>
        </ul>
        <h2 className="text-xl font-extrabold dark:text-white">
          8. Limitation of Liability
        </h2>
        <h3 className="text-lg font-bold dark:text-white mt-2">
          8.1 Service Availability
        </h3>
        <ul className="list-disc list-inside my-4 text-md">
          <li>We provide the App "as is" without warranties</li>
          <li>We do not guarantee uninterrupted service</li>
          <li>We may modify or discontinue features</li>
        </ul>
        <h3 className="text-lg font-bold dark:text-white mt-2">
          8.2 Disclaimer
        </h3>
        <ul className="list-disc list-inside my-4 text-md">
          <li>We are not liable for data loss or corruption</li>
          <li>Service interruptions</li>
          <li>Indirect or consequential damages</li>
          <li>Issues caused by third-party services</li>
        </ul>
        <h2 className="text-xl font-extrabold dark:text-white">
          9. Changes to Terms
        </h2>
        <ul className="list-disc list-inside my-4 text-md">
          <li>We may modify these terms at any time</li>
          <li>Continued use after changes constitutes acceptance</li>
          <li>Major changes will be notified through the App</li>
        </ul>
        <h2 className="text-xl font-extrabold dark:text-white">
          10. Termination
        </h2>
        <h3 className="text-lg font-bold dark:text-white mt-2">
          10.1 Account Termination
        </h3>
        <ul className="list-disc list-inside my-4 text-md">
          <li>We may terminate accounts for violation of these terms</li>
          <li>Extended inactivity</li>
          <li>At user's request</li>
        </ul>
        <h3 className="text-lg font-bold dark:text-white mt-2">
          10.2 Effect of Termination
        </h3>
        <ul className="list-disc list-inside my-4 text-md">
          <li>Upon termination, your access will be disabled</li>
          <li>Your content may be deleted</li>
          <li>Relevant terms survive termination</li>
        </ul>
        <h2 className="text-xl font-extrabold dark:text-white">
          11. Contact Information
        </h2>
        <p className="my-4 text-md">
          For questions about these Terms: mpraneethw@gmail.com
        </p>
        <h2 className="text-xl font-extrabold dark:text-white">
          12. Severability
        </h2>
        <p className="my-4 text-md">
          If any provision of these terms is found unenforceable, other
          provisions remain in effect.
        </p>
        <h2 className="text-xl font-extrabold dark:text-white">
          13. Entire Agreement
        </h2>
        <p className="my-4 text-md">
          These Terms constitute the entire agreement between you and VocabBook
          regarding the App.
        </p>
      </div>
    </div>
  );
}
