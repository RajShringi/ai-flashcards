import Hero from "@/components/Hero";
import Subscription from "@/components/Subscription";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <div className="flex flex-col gap-8">
      {/* hero section */}
      <Hero />

      {/* features section */}
      <section className="px-32 flex flex-col gap-6 h-[40vh]">
        <h2 className="text-3xl font-semibold text-center">
          Why Choose AI Flashcards?
        </h2>
        <div className="flex items-center justify-between gap-6">
          <div className="flex flex-col items-center gap-4 rounded-lg border border-gray-300 p-4 text-center bg-white">
            <h3 className="text-xl font-medium">Smart Learning</h3>
            <p className="text-gray-500">
              Our AI adapts to your pace and focuses on areas that need
              improvement.
            </p>
          </div>
          <div className="flex flex-col items-center gap-4 rounded-lg border border-gray-300 p-4 text-center bg-white">
            <h3 className="text-xl font-medium">Comprehensive Coverage</h3>
            <p className="text-gray-500">
              Thousands of flashcards across multiple subjects to help you
              master any topic.
            </p>
          </div>
          <div className="flex flex-col items-center gap-4 rounded-lg border border-gray-300 p-4 text-center bg-white">
            <h3 className="text-xl font-medium">Study Anywhere</h3>
            <p className="text-gray-500">
              Access your flashcards on any device, anytime, even offline with
              our Pro plan.
            </p>
          </div>
        </div>
      </section>

      {/* subscription section */}
      <Subscription />
    </div>
  );
}
