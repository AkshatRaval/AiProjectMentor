import React, { useState } from 'react';
import { Play, ChevronRight, User, Calendar, CheckCircle, BarChart3, Settings, Clock, Home } from 'lucide-react';

export default function DocumentationPage() {
  const [activeStep, setActiveStep] = useState(0);

  const steps = [
    {
      title: "Welcome to Ai Project Mentor",
      icon: Home,
      description: "Explore Home Page and Know About APM",
      image: "assets/homepage.png",
      details: [
        "Click 'Sign in with Google' button",
        "Explore More Perks",
        "You're ready to start planning!"
      ]
    },
    {
      title: "Sign Up & Get Started",
      icon: User,
      description: "Create your account with Google Sign-in and set up your profile",
      image: "assets/login.png",
      details: [
        "Click 'Sign in with Google' button",
        "Allow permissions for your account",
        "Complete your profile setup",
        "You're ready to start planning!"
      ]
    },
    {
      title: "Dashboard",
      icon: CheckCircle,
      description: "Create And Achive Your Goals And Also Track Your Progress",
      image: "assets/dashboard.png",
      details: [
        "Use our AI assistant to suggest task breakdown",
        "Add weekly milestones manually",
        "Create daily tasks for each week",
        "Set realistic time estimates"
      ]
    },
    {
      title: "Create Your First Project",
      icon: Calendar,
      description: "Add a new project and define your goals with our simple interface",
      image: "assets/addproject.png",
      details: [
        "Click the 'New Project' button",
        "Enter your project name and description",
        "Set your target completion date",
        "Click On Generate And You are ready to go"
      ]
    },
    {
      title: "Track Your Progress",
      icon: BarChart3,
      description: "Monitor your advancement with visual progress bars and completion stats",
      image: "assets/roadmap.png",
      details: [
        "Mark tasks as complete daily",
        "View weekly progress charts",
        "See overall project completion",
        "Celebrate your milestones!"
      ]
    }
  ];

  return (
    <div className="min-h-screen my-20">
      <div className="container mx-auto px-4 py-16">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            Getting Started with <span className="text-indigo-600">Ai Project Mentor</span>
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Learn how to use our platform to transform your overwhelming projects into achievable weekly goals.
          </p>
        </div>

        {/* Demo Video Section */}
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-16">
          <div className="flex items-center justify-center mb-6">
            <Play className="text-indigo-600 w-6 h-6 mr-3" />
            <h2 className="text-2xl font-bold text-gray-800">Quick Demo Video</h2>
          </div>
          <div className="relative rounded-xl overflow-hidden">
            <video
              className="w-full aspect-video"
              controls
              autoPlay
              poster="assets/homepage.png">
              <source src="/assets/demoVideo.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>
            {/* Optional: Custom overlay for styling */}
            <div className="absolute top-4 left-4 bg-black bg-opacity-50 text-white px-3 py-1 rounded-lg text-sm">
              Demo Video • 2 min
            </div>
          </div>
          <p className="text-center text-gray-600 mt-4 text-sm">
            Watch how to set up your first project and start tracking progress in under 2 minutes.
          </p>
        </div>


        {/* Step by Step Guide */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold text-gray-800 text-center mb-12">
            Step-by-Step Guide
          </h2>

          {/* Step Navigation */}
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-8">
            {steps.map((step, index) => {
              const Icon = step.icon;
              return (
                <button
                  key={index}
                  onClick={() => setActiveStep(index)}
                  className={`p-4 rounded-xl border-2 transition-all ${activeStep === index
                    ? 'border-indigo-500 bg-indigo-50'
                    : 'border-gray-200 bg-white hover:border-gray-300'
                    }`}
                >
                  <div className={`rounded-lg p-3 mb-3 inline-block ${activeStep === index ? 'bg-indigo-500' : 'bg-gray-100'
                    }`}>
                    <Icon className={`w-5 h-5 ${activeStep === index ? 'text-white' : 'text-gray-600'
                      }`} />
                  </div>
                  <h3 className={`font-semibold text-sm ${activeStep === index ? 'text-indigo-600' : 'text-gray-800'
                    }`}>
                    {step.title}
                  </h3>
                  <div className={`w-8 h-1 rounded-full mx-auto mt-2 ${activeStep === index ? 'bg-indigo-500' : 'bg-gray-200'
                    }`}></div>
                </button>
              );
            })}
          </div>

          {/* Active Step Content */}
          <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
            <div className="grid md:grid-cols-2 gap-0">
              {/* Image */}
              <div className="relative">
                <img
                  src={steps[activeStep].image}
                  alt={steps[activeStep].title}
                  className="w-full h-80 md:h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
              </div>

              {/* Content */}
              <div className="p-8">
                <div className="flex items-center mb-4">
                  <div className="bg-indigo-500 rounded-lg p-2 mr-3">
                    {React.createElement(steps[activeStep].icon, {
                      className: "w-5 h-5 text-white"
                    })}
                  </div>
                  <div className="bg-indigo-100 text-indigo-600 px-3 py-1 rounded-full text-sm font-semibold">
                    Step {activeStep + 1}
                  </div>
                </div>

                <h3 className="text-2xl font-bold text-gray-800 mb-4">
                  {steps[activeStep].title}
                </h3>

                <p className="text-gray-600 mb-6">
                  {steps[activeStep].description}
                </p>

                <div className="space-y-3">
                  {steps[activeStep].details.map((detail, index) => (
                    <div key={index} className="flex items-start space-x-3">
                      <div className="bg-green-100 rounded-full p-1 mt-0.5">
                        <ChevronRight className="w-3 h-3 text-green-600" />
                      </div>
                      <span className="text-gray-700 text-sm">{detail}</span>
                    </div>
                  ))}
                </div>

                <div className="mt-8 flex space-x-3">
                  {activeStep > 0 && (
                    <button
                      onClick={() => setActiveStep(activeStep - 1)}
                      className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      Previous
                    </button>
                  )}
                  {activeStep < steps.length - 1 && (
                    <button
                      onClick={() => setActiveStep(activeStep + 1)}
                      className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors flex items-center"
                    >
                      Next Step
                      <ChevronRight className="w-4 h-4 ml-1" />
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Tips Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          <div className="bg-white rounded-xl p-6 shadow-lg border border-green-100">
            <div className="bg-green-100 rounded-lg p-3 w-fit mb-4">
              <Clock className="w-5 h-5 text-green-600" />
            </div>
            <h3 className="font-bold text-gray-800 mb-2">Pro Tip</h3>
            <p className="text-gray-600 text-sm">
              Start with smaller projects to get familiar with the workflow before tackling larger goals.
            </p>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-lg border border-blue-100">
            <div className="bg-blue-100 rounded-lg p-3 w-fit mb-4">
              <Settings className="w-5 h-5 text-blue-600" />
            </div>
            <h3 className="font-bold text-gray-800 mb-2">Best Practice</h3>
            <p className="text-gray-600 text-sm">
              Review and adjust your weekly goals every Sunday to stay realistic and motivated.
            </p>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-lg border border-purple-100">
            <div className="bg-purple-100 rounded-lg p-3 w-fit mb-4">
              <BarChart3 className="w-5 h-5 text-purple-600" />
            </div>
            <h3 className="font-bold text-gray-800 mb-2">Stay Motivated</h3>
            <p className="text-gray-600 text-sm">
              Check your progress daily and celebrate small wins to maintain momentum throughout your project.
            </p>
          </div>
        </div>

        {/* Get Started CTA */}
        <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl p-8 text-center text-white">
          <h2 className="text-2xl font-bold mb-4">Ready to Start Your First Project?</h2>
          <p className="text-lg mb-6 opacity-90">
            Follow the steps above and turn your biggest goals into manageable weekly tasks.
          </p>
          <button className="bg-white text-indigo-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
            Create Your Account
          </button>
        </div>
      </div>
    </div>
  );
}