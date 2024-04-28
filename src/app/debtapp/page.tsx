import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="container mx-auto p-4">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-800">
            Loan & Expense Tracker
          </h1>
          <p className="mt-2 text-lg text-gray-600">
            Manage your loans and expenses easily
          </p>
        </div>
        <div className="mt-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                Track Debts
              </h2>
              <p className="text-gray-600">
                Keep track of what you owe to others and what others owe to you.
              </p>
            </div>
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                Payment History
              </h2>
              <p className="text-gray-600">
                View your payment history to stay organized and informed.
              </p>
            </div>
          </div>
        </div>
        <div className="mt-8">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              Create Debt with Installment Payment Schedule
            </h2>
            <p className="text-gray-600">
              Set up installment payment schedules for your debts to manage them
              efficiently.
            </p>
          </div>
        </div>
        <div className="mt-8 text-center">
          <Link
            href="/auth/login"
            className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-md"
          >
            Get Started
          </Link>
        </div>
      </div>
    </main>
  );
}
