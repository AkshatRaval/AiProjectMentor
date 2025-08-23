import React from 'react';
import { Target, Calendar, CheckCircle, Users, Heart, Lightbulb, ArrowRight, Star, Clock, Zap, Shield, Circle } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function AboutPage() {


  const howItWorks = [
    {
      id: 1,
      work: "Create Your Project",
    },
    {
      id: 2,
      work: "Break it Into Weeks",
    },
    {
      id: 3,
      work: "Track daily progress",
    },
    {
      id: 4,
      work: "Achieve your goals",
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br my-20">
      {/* Hero Section */}
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-gray-800 mb-6">
            About <span className="text-indigo-600">Ai Project Mentor</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Your personal roadmap companion that transforms overwhelming projects into manageable,
            achievable milestones. We believe every great achievement starts with a simple first step.
          </p>
        </div>

        {/* Bento Grid - Mission & How It Works */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-16">
          {/* Mission - Large Card */}
          <div className="lg:col-span-2 bg-white rounded-2xl shadow-lg p-8">
            <div className="flex items-center mb-6">
              <Heart className="text-red-500 w-6 h-6 mr-3" />
              <h2 className="text-2xl font-bold text-gray-800">Our Mission</h2>
            </div>
            <p className="text-gray-700 leading-relaxed mb-4">
              We understand that starting a project can feel overwhelming. Whether you're a student tackling
              your thesis, a developer building your dream app, or a creator bringing your vision to life.
            </p>
            <p className="font-semibold text-indigo-600">
              We're here to help you stay consistent, stay motivated, and achieve your goals step by step.
            </p>
          </div>

          {/* How It Works */}
          <div className="bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl p-6 text-white">
            <h3 className="text-lg font-bold mb-4">How It Works</h3>
            <div className="space-y-3 text-sm">
              {howItWorks.map((work) => (
                <div className="flex items-center" key={work.id}>
                  <div className="w-6 h-6 bg-white text-black bg-opacity-20 rounded-full flex items-center justify-center text-xs font-bold mr-3">{work.id}</div>
                  <span>{work.work}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bento Grid - Features */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {/* Large Feature Card */}
          <div className="lg:col-span-2 lg:row-span-2 bg-white rounded-2xl shadow-lg p-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Why We Built This</h2>
            <div className="space-y-4 text-gray-700">
              <p>
                We've all been there - staring at a massive project, feeling paralyzed by its scope.
                Traditional planning tools felt too rigid, too corporate, or just plain overwhelming.
              </p>
              <p>
                So we asked ourselves: <em>What if planning could actually be exciting? What if tracking
                  progress felt rewarding instead of tedious?</em>
              </p>
              <div className="bg-indigo-50 rounded-lg p-4 mt-6">
                <Lightbulb className="w-5 h-5 text-indigo-600 mb-3" />
                <p className="text-indigo-700 font-medium">
                  That's how Ai Project Mentor was born – from our own struggles and the desire to make
                  project management feel human and intuitive.
                </p>
              </div>
            </div>
          </div>

          {/* Small Feature Cards */}
          <div className="bg-green-50 rounded-xl p-6 border border-green-100">
            <Target className="text-green-600 w-5 h-5 mb-3" />
            <h3 className="font-bold text-gray-800 mb-2">Break It Down</h3>
            <p className="text-gray-600 text-sm">
              Turn overwhelming projects into bite-sized weekly goals.
            </p>
          </div>

          <div className="bg-blue-50 rounded-xl p-6 border border-blue-100">
            <CheckCircle className="text-blue-600 w-5 h-5 mb-3" />
            <h3 className="font-bold text-gray-800 mb-2">Visual Progress</h3>
            <p className="text-gray-600 text-sm">
              Watch your progress come to life with intuitive tracking.
            </p>
          </div>

          <div className="bg-purple-50 rounded-xl p-6 border border-purple-100">
            <Calendar className="text-purple-600 w-5 h-5 mb-3" />
            <h3 className="font-bold text-gray-800 mb-2">Weekly Planning</h3>
            <p className="text-gray-600 text-sm">
              Plan your week with realistic, achievable goals.
            </p>
          </div>

          <div className="bg-yellow-50 rounded-xl p-6 border border-yellow-100">
            <Clock className="text-yellow-600 w-5 h-5 mb-3" />
            <h3 className="font-bold text-gray-800 mb-2">Stay Consistent</h3>
            <p className="text-gray-600 text-sm">
              Build momentum with daily habits that stick.
            </p>
          </div>
        </div>

        {/* Who It's For - Simplified */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-16">
          <div className="bg-white rounded-xl p-4 shadow-sm border hover:shadow-md transition-shadow">
            <h3 className="font-bold text-gray-800 mb-2 text-sm">Students</h3>
            <p className="text-gray-600 text-xs">
              Research papers, assignments, and thesis projects made manageable.
            </p>
          </div>

          <div className="bg-white rounded-xl p-4 shadow-sm border hover:shadow-md transition-shadow">
            <h3 className="font-bold text-gray-800 mb-2 text-sm">Developers</h3>
            <p className="text-gray-600 text-xs">
              Build apps, learn new frameworks, and ship side projects faster.
            </p>
          </div>

          <div className="bg-white rounded-xl p-4 shadow-sm border hover:shadow-md transition-shadow">
            <h3 className="font-bold text-gray-800 mb-2 text-sm">Creators</h3>
            <p className="text-gray-600 text-xs">
              Content creation, courses, and creative projects organized weekly.
            </p>
          </div>

          <div className="bg-white rounded-xl p-4 shadow-sm border hover:shadow-md transition-shadow">
            <h3 className="font-bold text-gray-800 mb-2 text-sm">Entrepreneurs</h3>
            <p className="text-gray-600 text-xs">
              Launch your startup ideas with clear weekly milestones.
            </p>
          </div>
        </div>

        {/* Key Features - Grid */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold text-gray-800 text-center mb-8">
            Simple Yet Powerful Features
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-white rounded-lg p-4 shadow-sm border hover:shadow-md transition-shadow">
              <div className="flex items-center space-x-3">
                <div className="bg-green-100 rounded-lg p-2">
                  <CheckCircle className="text-green-600 w-4 h-4" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800 text-sm">Task Tracking</h3>
                  <p className="text-gray-600 text-xs">Visual progress bars</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg p-4 shadow-sm border hover:shadow-md transition-shadow">
              <div className="flex items-center space-x-3">
                <div className="bg-blue-100 rounded-lg p-2">
                  <Calendar className="text-blue-600 w-4 h-4" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800 text-sm">Weekly Plans</h3>
                  <p className="text-gray-600 text-xs">Organized scheduling</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg p-4 shadow-sm border hover:shadow-md transition-shadow">
              <div className="flex items-center space-x-3">
                <div className="bg-purple-100 rounded-lg p-2">
                  <Users className="text-purple-600 w-4 h-4" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800 text-sm">Google Login</h3>
                  <p className="text-gray-600 text-xs">Quick setup</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg p-4 shadow-sm border hover:shadow-md transition-shadow">
              <div className="flex items-center space-x-3">
                <div className="bg-yellow-100 rounded-lg p-2">
                  <Shield className="text-yellow-600 w-4 h-4" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800 text-sm">Cloud Sync</h3>
                  <p className="text-gray-600 text-xs">Never lose data</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* App Features Deep Dive */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          <div className="lg:col-span-2 bg-white rounded-xl p-6 shadow-lg">
            <h2 className="text-xl font-bold text-gray-800 mb-4">What Makes Our App Special</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-3">
                <div className="flex items-start space-x-3">
                  <Zap className="text-yellow-500 w-4 h-4 mt-1" />
                  <div>
                    <h4 className="font-semibold text-gray-800 text-sm">Instant Setup</h4>
                    <p className="text-gray-600 text-xs">Sign in with Google and start planning in under 30 seconds</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <Target className="text-green-500 w-4 h-4 mt-1" />
                  <div>
                    <h4 className="font-semibold text-gray-800 text-sm">Smart Breakdown</h4>
                    <p className="text-gray-600 text-xs">AI-assisted project splitting into manageable weekly tasks</p>
                  </div>
                </div>
              </div>
              <div className="space-y-3">
                <div className="flex items-start space-x-3">
                  <CheckCircle className="text-blue-500 w-4 h-4 mt-1" />
                  <div>
                    <h4 className="font-semibold text-gray-800 text-sm">Progress Visualization</h4>
                    <p className="text-gray-600 text-xs">Beautiful charts and progress bars that motivate you</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <Shield className="text-purple-500 w-4 h-4 mt-1" />
                  <div>
                    <h4 className="font-semibold text-gray-800 text-sm">Auto-Save</h4>
                    <p className="text-gray-600 text-xs">Everything syncs automatically across all your devices</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-blue-500 to-cyan-600 rounded-xl p-6 text-white">
            <h3 className="text-lg font-bold mb-4">Perfect For</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <Circle size={15}/>
                <span className="text-sm">Academic projects & thesis</span>
              </div>
              <div className="flex items-center space-x-3">
                <Circle size={15}/>
                <span className="text-sm">App development & coding</span>
              </div>
              <div className="flex items-center space-x-3">
                <Circle size={15}/>
                <span className="text-sm">Creative projects & content</span>
              </div>
              <div className="flex items-center space-x-3">
                <Circle size={15}/>
                <span className="text-sm">Startup & business goals</span>
              </div>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl p-8 text-center text-white">
          <h2 className="text-2xl font-bold mb-4">Ready to Turn Your Dreams into Plans?</h2>
          <p className="text-lg mb-8 max-w-2xl mx-auto opacity-90">
            Join thousands of students, developers, and creators who are already achieving their goals,
            one week at a time.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to={'/login'} className="bg-white text-indigo-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors flex items-center justify-center">
              Get Started Free
              <ArrowRight className="ml-2 w-4 h-4" />
            </Link>
          </div>
          <p className="text-indigo-200 mt-4 text-sm">
            No credit card required • Start in 30 seconds
          </p>
        </div>
      </div>
    </div>
  );
}