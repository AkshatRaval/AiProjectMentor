import React, { useState, useEffect } from 'react';
import { Target, Code, TrendingUp, Users, Zap, Star, ArrowRight, Moon, Sun, CheckCircle, Play, X } from 'lucide-react';
import { Link } from 'react-router-dom';

const Home = () => {
  const [isDark, setIsDark] = useState(false);
  const [isVisible, setIsVisible] = useState({});
  const [activeFeature, setActiveFeature] = useState(0);
  const [watching, setWatching] = useState(false);

  const features = [
    {
      icon: <Target className="w-8 h-8" />,
      title: "Smart Planning",
      description: "AI analyzes your project and creates optimal learning paths",
      gradient: "from-purple-500 to-pink-500"
    },
    {
      icon: <Code className="w-8 h-8" />,
      title: "Tech Guidance",
      description: "Get recommendations for the best tools and technologies",
      gradient: "from-blue-500 to-cyan-500"
    },
    {
      icon: <TrendingUp className="w-8 h-8" />,
      title: "Track Progress",
      description: "Monitor your journey with gamified progress tracking",
      gradient: "from-green-500 to-emerald-500"
    }
  ];

  const stats = [
    { number: "10K+", label: "Projects Completed" },
    { number: "95%", label: "Success Rate" },
    { number: "24/7", label: "AI Support" },
    { number: "50+", label: "Technologies" }
  ];

  const testimonials = [
    {
      name: "Sarah Chen",
      role: "Full-Stack Developer",
      content: "Project Mentor helped me build my first SaaS in just 3 months!",
      avatar: "SC"
    },
    {
      name: "Mike Rodriguez",
      role: "Product Manager",
      content: "The AI roadmaps are incredibly detailed and easy to follow.",
      avatar: "MR"
    },
    {
      name: "Aisha Patel",
      role: "Design Lead",
      content: "Finally, a platform that understands both technical and creative projects.",
      avatar: "AP"
    }
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          setIsVisible(prev => ({
            ...prev,
            [entry.target.id]: entry.isIntersecting
          }));
        });
      },
      { threshold: 0.1 }
    );

    document.querySelectorAll('[id]').forEach((el) => {
      observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveFeature((prev) => (prev + 1) % features.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const toggleTheme = () => {
    setIsDark(!isDark);
  };

  return (
    <div className='relative'>
      <div className={`min-h-screen transition-colors duration-500 ${isDark
        ? 'bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900 text-white'
        : 'bg-gradient-to-br from-purple-50 via-white to-blue-50 text-gray-900'
        }`}>

        {/* Navbar */}


        {/* Hero Section */}
        <section className="pt-32 pb-20 px-6">
          <div className="max-w-7xl mx-auto text-center">
            <div
              id="hero-badge"
              className={`inline-flex items-center space-x-2 px-4 py-2 rounded-full mb-8 transition-all duration-700 ${isVisible['hero-badge'] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                } ${isDark
                  ? 'bg-purple-900/30 border border-purple-500/30 text-purple-300'
                  : 'bg-purple-100 border border-purple-200 text-purple-600'
                }`}
            >
              <Zap className="w-4 h-4" />
              <span className="font-semibold">AI-Powered Project Planning</span>
            </div>

            <h1
              id="hero-title"
              className={`text-5xl md:text-7xl font-bold mb-6 transition-all duration-700 delay-200 ${isVisible['hero-title'] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                }`}
            >
              Turn Your{' '}
              <span className="bg-gradient-to-r from-purple-500 via-pink-500 to-orange-500 bg-clip-text text-transparent">
                Idea
              </span>{' '}
              Into a{' '}
              <span className="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">
                Roadmap
              </span>
            </h1>

            <p
              id="hero-description"
              className={`text-xl md:text-2xl mb-12 max-w-3xl mx-auto leading-relaxed transition-all duration-700 delay-400 ${isVisible['hero-description'] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                } ${isDark ? 'text-gray-300' : 'text-gray-600'}`}
            >
              Get personalized, week-by-week guidance to bring your project from concept to completion.
              Our AI mentor creates custom roadmaps tailored to your skills and timeline.
            </p>

            <div
              id="hero-cta"
              className={`flex flex-col sm:flex-row gap-4 justify-center items-center transition-all duration-700 delay-600 ${isVisible['hero-cta'] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                }`}
            >
              <Link className="group px-8 py-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-full font-semibold text-lg hover:shadow-xl hover:scale-105 transition-all duration-300 flex items-center space-x-2" to={'/dashboard'}>
                <span>Start Your Journey</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              {/* <button className="group px-8 py-4 border-2 border-purple-500 text-purple-500 rounded-full font-semibold text-lg hover:bg-purple-500 hover:text-white transition-all duration-300 flex items-center space-x-2" onClick={() => {setWatching(true)}}>
                <Play className="w-5 h-5" />
                <span>Watch Demo</span>
              </button> */}
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-20 px-6">
          <div className="max-w-7xl mx-auto">
            <div className="grid md:grid-cols-3 gap-8">
              {features.map((feature, index) => (
                <div
                  key={index}
                  id={`feature-${index}`}
                  className={`group p-8 rounded-2xl transition-all duration-700 delay-${index * 200} ${isVisible[`feature-${index}`] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                    } ${isDark
                      ? 'bg-gray-800/50 border border-gray-700 hover:bg-gray-800'
                      : 'bg-white/70 border border-white hover:bg-white'
                    } backdrop-blur-sm hover:shadow-2xl hover:scale-105 cursor-pointer`}
                  onClick={() => setActiveFeature(index)}
                >
                  <div className={`w-16 h-16 rounded-2xl bg-gradient-to-r ${feature.gradient} flex items-center justify-center text-white mb-6 group-hover:scale-110 transition-transform duration-300`}>
                    {feature.icon}
                  </div>
                  <h3 className="text-2xl font-bold mb-4">{feature.title}</h3>
                  <p className={`text-lg leading-relaxed ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                    {feature.description}
                  </p>
                  {activeFeature === index && (
                    <div className="mt-6 p-4 bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-xl border border-purple-500/20">
                      <div className="flex items-center space-x-2 text-purple-500">
                        <CheckCircle className="w-5 h-5" />
                        <span className="font-semibold">Most Popular Feature</span>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-20 px-6">
          <div className="max-w-7xl mx-auto">
            <div
              id="stats"
              className={`grid grid-cols-2 md:grid-cols-4 gap-8 transition-all duration-700 ${isVisible['stats'] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                }`}
            >
              {stats.map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent mb-2">
                    {stat.number}
                  </div>
                  <div className={`text-lg ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section className="py-20 px-6">
          <div className="max-w-7xl mx-auto">
            <h2
              id="testimonials-title"
              className={`text-4xl md:text-5xl font-bold text-center mb-16 transition-all duration-700 ${isVisible['testimonials-title'] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                }`}
            >
              Loved by{' '}
              <span className="bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent">
                Creators
              </span>
            </h2>

            <div className="grid md:grid-cols-3 gap-8">
              {testimonials.map((testimonial, index) => (
                <div
                  key={index}
                  id={`testimonial-${index}`}
                  className={`p-6 rounded-2xl transition-all duration-700 delay-${index * 200} ${isVisible[`testimonial-${index}`] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                    } ${isDark
                      ? 'bg-gray-800/50 border border-gray-700'
                      : 'bg-white/70 border border-white'
                    } backdrop-blur-sm hover:shadow-xl hover:scale-105`}
                >
                  <div className="flex items-center space-x-1 mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <p className={`text-lg mb-6 italic ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                    "{testimonial.content}"
                  </p>
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center text-white font-bold">
                      {testimonial.avatar}
                    </div>
                    <div>
                      <div className="font-semibold">{testimonial.name}</div>
                      <div className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                        {testimonial.role}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 px-6">
          <div className="max-w-4xl mx-auto text-center">
            <div
              id="cta"
              className={`p-12 rounded-3xl bg-gradient-to-r from-purple-500 via-pink-500 to-orange-500 text-white transition-all duration-700 ${isVisible['cta'] ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
                }`}
            >
              <h2 className="text-4xl md:text-5xl font-bold mb-6">
                Ready to Build Something Amazing?
              </h2>
              <p className="text-xl mb-8 opacity-90">
                Join thousands of creators who've turned their ideas into reality with AI guidance.
              </p>
              <Link className="px-8 py-4 bg-white text-purple-600 rounded-full font-semibold text-lg hover:shadow-xl hover:scale-105 transition-all duration-300" to={'/dashboard'}>
                Get Started for Free
              </Link>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className={`py-12 px-6 border-t ${isDark ? 'border-gray-700 bg-gray-900/50' : 'border-gray-200 bg-white/50'
          } backdrop-blur-sm`}>
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <div className="flex items-center space-x-3 mb-4 md:mb-0">
                <div className="w-10 h-10 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center text-white font-bold">
                  AI
                </div>
                <span className="text-xl font-bold">Project Mentor</span>
              </div>
              <div className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                © 2025 Project Mentor. All rights reserved.
              </div>
            </div>
          </div>
        </footer>
      </div>

    </div>
  );
};

export default Home;