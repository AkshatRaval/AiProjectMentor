import React from "react";

const About = () => {
  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-3xl font-bold text-gray-800 mb-4">About Us</h1>
      <p className="text-gray-600 leading-relaxed mb-4">
        Welcome to our platform! 🚀 We’re building a modern web application that
        makes authentication, navigation, and user experience simple and secure.
      </p>
      <p className="text-gray-600 leading-relaxed mb-4">
        Our mission is to provide developers and users with a clean, scalable,
        and user-friendly environment. Whether you’re logging in with Google,
        GitHub, or email, your experience will always be smooth.
      </p>
      <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
        <h2 className="text-xl font-semibold text-blue-700 mb-2">Why Choose Us?</h2>
        <ul className="list-disc list-inside text-gray-700 space-y-2">
          <li>🔒 Secure authentication</li>
          <li>⚡ Fast and responsive UI</li>
          <li>🛠️ Easy integration for developers</li>
          <li>📈 Scalable architecture</li>
        </ul>
      </div>
    </div>
  );
};

export default About;
