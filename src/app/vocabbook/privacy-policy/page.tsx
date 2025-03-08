import { Spotlight } from "@/components/ui/Spotlight";

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen w-full rounded-md flex bg-black/[0.96] antialiased bg-grid-white/[0.02] relative overflow-hidden">
      <Spotlight
        className="-top-40 left-0 md:left-60 md:-top-20"
        fill="white"
      />
      <div className="p-4 max-w-7xl relative z-10 lg:pr-60 lg:pl-24 mt-4 lg:mt-16 w-full pt-20 md:pt-0 text-white">
        <h1 className="text-2xl font-extrabold dark:text-white">
          Privacy Policy
        </h1>
        <p className="my-4 text-md">Last updated: 08-03-2025</p>
        <h2 className="text-xl font-extrabold dark:text-white mt-4">
          Introduction
        </h2>
        <p className="my-4 text-md">
          Welcome to VocabBook. We respect your privacy and are committed to
          protecting your personal data. This privacy policy explains how we
          handle your information when you use our mobile application.
        </p>
        <h2 className="text-xl font-extrabold dark:text-white">
          Information We Collect
        </h2>
        <h3 className="text-lg font-bold dark:text-white mt-4">
          Personal Information
        </h3>
        <ul className="list-disc ml-6 my-4 text-md">
          <li>Email address (for account creation and authentication)</li>
          <li>
            Basic profile information (name, preferred language, learning level)
          </li>
          <li>Authentication data managed by Firebase Authentication</li>
        </ul>
        <h3 className="text-lg font-bold dark:text-white mt-4">Usage Data</h3>
        <ul className="list-disc ml-6 my-4 text-md">
          <li>Words and vocabulary items you add</li>
          <li>Learning progress and practice history</li>
          <li>Book information you create</li>
        </ul>
        <h3 className="text-lg font-bold dark:text-white mt-4">
          Device Permissions
        </h3>
        <ul className="list-disc ml-6 my-4 text-md">
          <li>Camera access (to scan text from books)</li>
          <li>Photo library access (to analyze text from images)</li>
        </ul>
        <h2 className="text-xl font-extrabold dark:text-white">
          How We Use Your Information
        </h2>
        <p className="my-4 text-md">We use your information solely for:</p>
        <ul className="list-disc ml-6 my-4 text-md">
          <li>Creating and managing your account</li>
          <li>Providing our vocabulary learning services</li>
          <li>Storing your learning progress</li>
          <li>Improving app functionality</li>
        </ul>
        <h2 className="text-xl font-extrabold dark:text-white">
          Data Storage and Security
        </h2>
        <ul className="list-disc ml-6 my-4 text-md">
          <li>We use Firebase Authentication for secure user authentication</li>
          <li>Your data is stored in Firebase Cloud Firestore</li>
          <li>
            We implement industry-standard security measures to protect your
            data
          </li>
          <li>
            We do not sell or share your personal information with third parties
          </li>
        </ul>
        <h2 className="text-xl font-extrabold dark:text-white">
          Device Permissions
        </h2>
        <h3 className="text-lg font-bold dark:text-white mt-4">
          Camera and Photos
        </h3>
        <ul className="list-disc ml-6 my-4 text-md">
          <li>
            We request camera and photo library access only for text recognition
            features
          </li>
          <li>
            Images are processed locally and are not stored on our servers
          </li>
          <li>
            You can revoke these permissions at any time through your device
            settings
          </li>
        </ul>
        <h2 className="text-xl font-extrabold dark:text-white">
          Data Retention
        </h2>
        <ul className="list-disc ml-6 my-4 text-md">
          <li>Your account data is retained until you delete your account</li>
          <li>
            You can request deletion of your account and associated data at any
            time
          </li>
        </ul>
        <h2 className="text-xl font-extrabold dark:text-white">
          Children's Privacy
        </h2>
        <p className="my-4 text-md">
          Our service is not directed to children under 13. We do not knowingly
          collect personal information from children under 13.
        </p>
        <h2 className="text-xl font-extrabold dark:text-white">
          Changes to This Policy
        </h2>
        <p className="my-4 text-md">
          We may update this privacy policy from time to time. We will notify
          you of any changes by posting the new policy on this page.
        </p>
        <h2 className="text-xl font-extrabold dark:text-white">Contact Us</h2>
        <p className="my-4 text-md">
          If you have questions about this privacy policy, please contact us at:
          mpraneethw@gmail.com
        </p>
        <h2 className="text-xl font-extrabold dark:text-white">Your Rights</h2>
        <ul className="list-disc ml-6 my-4 text-md">
          <li>Access your personal data</li>
          <li>Correct your personal data</li>
          <li>Delete your account and associated data</li>
          <li>Withdraw consent for optional features</li>
        </ul>
        <h2 className="text-xl font-extrabold dark:text-white">
          Third-Party Services
        </h2>
        <p className="my-4 text-md">
          We use the following third-party services:
        </p>
        <ul className="list-disc ml-6 my-4 text-md">
          <li>Firebase Authentication (for user authentication)</li>
          <li>Firebase Cloud Firestore (for data storage)</li>
          <li>Google Gemini APIs (for text recognition)</li>
        </ul>
        <p className="my-4 text-md">
          These services have their own privacy policies and terms of service.
        </p>
      </div>
    </div>
  );
}
