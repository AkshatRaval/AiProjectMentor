import { LogOut, Moon, Sun, User } from 'lucide-react'
import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from './AuthProvider'

const Navigation = () => {
  const [isDark, setIsDark] = useState(false)

  const { currentUser, logout } = useAuth();

  const toggleTheme = () => {
    setIsDark(!isDark)
  }

  const handleLogout = async () => {
    try {
      await logout();
      console.log("User logged out successfully");
    } catch (err) {
      console.error("Logout error:", err);
    }
  };

  return (
    <div>
      <nav className="fixed top-0 left-0 right-0 z-50 transition-all duration-300ds backdrop-blur-md border-b">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex justify-between items-center relative">
            <div className="hidden items-center space-x-3 md:flex">
              <div className="w-10 h-10 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center text-white font-bold">
                AI
              </div>
              <span className="text-xl font-bold">Project Mentor</span>
            </div>

            <div className="flex items-center space-x-3 md:space-x-8">
              {['Home', 'About', 'Dashboard', 'Docs'].map((item) => (
                <Link
                  to={item.toLowerCase() == 'home' ? '/' : item.toLowerCase()}
                  key={item}
                  href="#"
                  className="relative hover:text-purple-500 transition-colors group"
                >
                  {item}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-purple-500 to-pink-500 group-hover:w-full transition-all duration-300"></span>
                </Link>
              ))}
            </div>


            <div className="flex items-center space-x-4">

              {!currentUser ? (
                <>
                  <Link className="px-4 py-2 hover:text-purple-500 transition-colors" to={'/login'}>
                    Login
                  </Link>
                  <Link className="px-6 py-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-full hover:shadow-lg hover:scale-105 transition-all duration-300" to={'/signup'}>
                    Sign Up
                  </Link>
                </>) : (
                <button className='flex items-center text-xs md:text-lg md:gap-2 bg-gradient-to-r from-purple-500 to-pink-500 cursor-pointer p-1 px-2 md:p-3.5 rounded-full text-white' onClick={handleLogout}>
                  <LogOut className='scale-70' />
                  <p className='hidden md:flex'>Logout</p>
                </button>
              )}
            </div>
          </div>
        </div>
      </nav>
    </div>
  )
}

export default Navigation