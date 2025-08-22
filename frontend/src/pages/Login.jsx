import { GithubAuthProvider, GoogleAuthProvider, signInWithEmailAndPassword, signInWithPopup, onAuthStateChanged } from 'firebase/auth'; // FIXED: Added missing imports
import { ArrowLeft, Eye, EyeClosed, Lock, Mail } from 'lucide-react'
import React, { useEffect, useState } from 'react' // FIXED: Imported useEffect and useState
import { FaGoogle, FaGithub } from "react-icons/fa";
import { Link, useNavigate } from 'react-router-dom'; // ADDED: useNavigate for redirection
import { auth } from '../../firebase';

const Login = () => {

  const [viewOpen, setViewOpen] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const navigate = useNavigate(); // ADDED: Hook for programmatic navigation

  // ADDED: UseEffect to handle auth state changes
  useEffect(() => {
    // onAuthStateChanged returns an unsubscribe function
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in, redirect them to the dashboard or home page
        console.log("User is signed in:", user.uid);
        navigate('/dashboard'); // Example redirect
      } else {
        // User is signed out
        console.log("User is signed out.");
      }
    });

    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, [navigate]); // Dependency array ensures this runs once

  const toggleView = () => {
    setViewOpen(!viewOpen);
  }

  // --- Email & Password Sign In ---
  const handleEmailSignIn = (e) => {
    e.preventDefault(); // Prevent form submission from reloading the page
    setError(''); // Clear previous errors

    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log("User signed in with email:", user);
        // Redirection is handled by onAuthStateChanged
      })
      .catch((error) => {
        console.error("Signin Error:", error.message);
        setError(error.message); // FIXED: Set error state for the user
      });
  };

  // --- Google Sign In ---
  const handleGoogleSignIn = () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider) // FIXED: Wrapped in a handler function
      .then((result) => {
        const user = result.user;
        console.log("Google user signed in:", user);
        // Redirection is handled by onAuthStateChanged
      })
      .catch((error) => {
        console.error("Google Signin Error:", error.message);
        setError(error.message); // FIXED: Set error state for the user
      });
  };

  // --- GitHub Sign In ---
  const handleGithubSignIn = () => {
    const provider = new GithubAuthProvider();
    signInWithPopup(auth, provider) // FIXED: Wrapped in a handler function
      .then((result) => {
        const user = result.user;
        console.log("GitHub user signed in:", user);
        // Redirection is handled by onAuthStateChanged
      })
      .catch((error) => {
        console.error("GitHub Signin Error:", error.message);
        setError(error.message); // FIXED: Set error state for the user
      });
  };


  return (
    <section className='min-h-screen flex justify-center items-center'>
      <div className='flex flex-col gap-5 '>
        <Link className='flex gap-1 items-center text-accent-foreground hover:bg-accent w-fit p-3 rounded-lg border transition-all' to={'/'}>
          <ArrowLeft size={20} />
          <span>Back To Home</span>
        </Link>
        <div className='bg-background border p-5 w-[25rem] shadow-2xl rounded-xl'>
          <div className='m-auto w-full text-center my-3'>
            <p className='text-3xl font-bold bg-gradient-to-l from-blue-500 via-purple-500 to-pink-500 m-auto w-fit p-3 rounded-lg text-white'>AI</p>
            <h1 className='bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent text-4xl font-bold'>Welcome Back</h1>
            <p className='text-muted-foreground'>Sign in to continue your projects</p>
          </div>
          {/* FIXED: Changed to a form with onSubmit */}
          <form className='w-full my-3' onSubmit={handleEmailSignIn}>
            <div className='w-full my-3'>
              <label htmlFor="email" className='text-lg'>Email</label>
              <div className='relative'>
                <Mail className='absolute top-[50%] transform translate-y-[-50%] left-2' color='gray' size={18} />
                <input type="email" name="email" id="email" placeholder='Enter Your Email' className='border border-gray-300 rounded-md p-2 pl-10 focus:outline-none focus:ring-2 focus:ring-blue-500 w-full' onChange={e => setEmail(e.target.value)} required />
              </div>
            </div>
            <div className=' w-full my-3'>
              <label htmlFor="password" className='text-lg'>Password</label>
              <div className='relative'>
                <Lock className='absolute top-[50%] transform translate-y-[-50%] left-2' color='gray' size={18} />
                <input type={`${viewOpen ? 'text' : 'password'}`} name="password" id="password" placeholder='Enter Your Password' className='border border-gray-300 rounded-md p-2 pl-10 focus:outline-none focus:ring-2 focus:ring-blue-500 w-full' onChange={e => setPassword(e.target.value)} required />
                <div className='absolute top-[50%] transform translate-y-[-50%] right-2 cursor-pointer' onClick={toggleView}>
                  {viewOpen ? <Eye color='gray' size={18} /> : <EyeClosed color='gray' size={18} />}
                </div>
              </div>
            </div>
            <p className='text-center underline cursor-pointer text-muted-foreground mb-1'>Forgot Password?</p>
            
            {/* FIXED: Display the error message to the user */}
            {error && <p className='text-red-500 text-center my-2'>{error}</p>}

            <div>
              {/* FIXED: Button type is "submit" for the form */}
              <button type="submit" className='p-3 text-center w-full shadow bg-gradient-to-r from-purple-500 to-pink-500 font-medium text-white rounded-lg text-lg cursor-pointer'>Sign In</button>
            </div>
          </form>

          <div className='flex text-center mt-2 items-center'>
            <div className='w-full border p-0 h-0' />
            <div className='mx-2 text-muted-foreground'>OR</div>
            <div className='w-full border p-0 h-0' />
          </div>

          <div className='flex flex-col' >
            <button className='loginBtn' onClick={handleGoogleSignIn}><FaGoogle size={20} />Continue With Google</button>
            <button className='loginBtn' onClick={handleGithubSignIn}><FaGithub size={20} />Continue With Github</button>
          </div>
          <p className='text-center mt-3'>Don't have an account? <Link to={'/signup'} className='underline cursor-pointer'>Sign up</Link></p>
        </div>
      </div >
    </section >
  )
}

export default Login