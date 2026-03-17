"use client";

import { useState } from "react";

const steps = [
  {
    title: "Step 1: Connect Your Tools",
    description:
      "Securely connect your payroll, HR, and finance tools. Our system gathers scattered data into one organized workspace.",
    animation: "/animation/step-1.svg",
  },
  {
    title: "Step 2: AI Understands Your Workflow",
    description:
      "Our AI analyzes employee data, payroll cycles, and reports to automatically structure your processes.",
    animation: "/animation/step-2.svg",
  },
  {
    title: "Step 3: Clear Insights & Automation",
    description:
      "Generate reports, automate payroll tasks, and get real-time insights that help your business run smoothly.",
    animation: "/animation/step-4.svg",
  },
];

export default function ChaosToClarity() {
  const [activeStep, setActiveStep] = useState(0);

  return (
    <section className="w-full py-20 px-6 lg:px-16">
      <div className="max-w-6xl mx-auto">
        {/* Heading */}
        <div className="text-center mb-10">
          <h2 className="text-3xl lg:text-4xl font-bold">
            From <span className="text-blue-400">Chaos</span> to{" "}
            <span className="text-blue-400">Clarity</span> in 3 Steps
          </h2>

          <p className="text-gray-400 mt-4 max-w-2xl mx-auto">
            Turn messy payroll data into clear, automated workflows in just
            three simple steps.
          </p>
        </div>

        {/* Steps Buttons */}
        <div className="flex justify-center mb-12">
          <div className="flex gap-2 dark:bg-neutral-900 p-2 rounded-full border border-gray-300 shadow-sm dark:border-neutral-800">
            {steps.map((step, index) => (
              <button
                key={index}
                onClick={() => setActiveStep(index)}
                className={`px-5 py-2 rounded-full text-sm transition
                ${
                  activeStep === index
                    ? "bg-blue-500 text-white dark:text-black font-medium"
                    : "dark:text-gray-400 hover:text-gray-600 dark:hover:text-white"
                }`}
              >
                Step {index + 1}
              </button>
            ))}
          </div>
        </div>

        {/* Content */}
        <div className="grid lg:grid-cols-2 gap-12 xl:gap-0 items-center">
          {/* Animation */}
          <div className="flex justify-center">
            <div className="w-70 h-70 rounded-3xl border border-gray-300 shadow-lg dark:border-neutral-800 dark:bg-neutral-900 flex items-center justify-center overflow-hidden">
              <img
                key={activeStep}
                src={steps[activeStep].animation}
                className="w-40 h-40 object-cover"
              />
            </div>
          </div>

          {/* Text */}
          <div>
            <h3 className="text-2xl font-semibold mb-4">
              {steps[activeStep].title}
            </h3>

            <p className="text-gray-400 leading-relaxed">
              {steps[activeStep].description}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
