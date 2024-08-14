import { Button } from "@/components/ui/button";

export default function Home() {
  const subscriptions = [
    {
      id: 1,
      name: "Basic Plan",
      price: "$5/month",
      features: ["Access to basic flashcards", "Limited AI assistance"],
    },
    {
      id: 2,
      name: "Pro Plan",
      price: "$10/month",
      features: [
        "Access to all flashcards",
        "Advanced AI assistance",
        "Offline access",
      ],
    },
    {
      id: 3,
      name: "Premium Plan",
      price: "$20/month",
      features: [
        "All features of Pro",
        "Personalized AI tutoring",
        "Priority support",
      ],
    },
  ];

  return (
    <div className="flex flex-col gap-8">
      {/* hero section */}
      <section className="flex justify-center items-center h-[70vh]">
        {/* <div className="absolute inset-0 -z-10 h-full w-full bg-white bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px]"></div> */}
        <div className="flex flex-col items-center gap-4 max-w-[800px]">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-center">
            AI-Powered Flashcards for Effective Learning
          </h1>
          <p className="text-lg font-normal text-gray-500 lg:text-xl dark:text-gray-400 text-center">
            Enhance your study sessions with intelligent flashcards that adapt
            to your learning style.
          </p>

          <Button variant="default">Get Started</Button>
        </div>
      </section>

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
      <section className="px-32 flex flex-col gap-6">
        <h2 className="text-3xl font-semibold text-center">Select Your Plan</h2>
        <div className="flex items-center justify-between gap-8">
          {subscriptions.map((plan) => (
            <div
              key={plan.id}
              className="self-stretch flex-1 flex flex-col items-center justify-between gap-4 rounded-lg border border-gray-300 px-4 py-8 bg-white"
            >
              <h3 className="text-2xl font-semibold">{plan.name}</h3>
              <p className="text-3xl md:text-4xl font-bold">{plan.price}</p>
              <ul className="features">
                {plan.features.map((feature, index) => (
                  <li className="text-gray-500 list-disc" key={index}>
                    {feature}
                  </li>
                ))}
              </ul>
              {plan.name === "Basic Plan" ? (
                <Button variant="link">Choose Plan</Button>
              ) : (
                ""
              )}

              {plan.name === "Pro Plan" ? (
                <Button variant="secondary">Choose Plan</Button>
              ) : (
                ""
              )}

              {plan.name === "Premium Plan" ? (
                <Button variant="default">Choose Plan</Button>
              ) : (
                ""
              )}
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
