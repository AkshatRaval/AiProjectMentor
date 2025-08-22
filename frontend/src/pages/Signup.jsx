import { GithubAuthProvider, GoogleAuthProvider, createUserWithEmailAndPassword, signInWithPopup, onAuthStateChanged } from 'firebase/auth'; // CHANGED
import { ArrowLeft, Eye, EyeClosed, Lock, Mail, User } from 'lucide-react'
import React, { useEffect } from 'react'
import { FaGoogle, FaGithub } from "react-icons/fa";
import { Link, useNavigate } from 'react-router-dom';
import { auth, db } from '../../firebase';
import { doc, setDoc } from 'firebase/firestore';

const SignUp = () => {

  const [viewOpen, setViewOpen] = React.useState(false)
  const [email, setEmail] = React.useState('')
  const [username, setUsername] = React.useState('')
  const [password, setPassword] = React.useState('')
  const [confirmPassword, setConfirmPassword] = React.useState(''); // ADDED: Confirm Password state
  const [error, setError] = React.useState('')
  const navigate = useNavigate();

  // This useEffect is the same as in Login. It will redirect if a user is created and logged in.
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        console.log("User is signed in/up:", user.uid);
        navigate('/dashboard'); // Redirect to a protected route after signup
      } else {
        console.log("User is signed out.");
      }
    });
    return () => unsubscribe();
  }, [navigate]);

  const toggleView = () => {
    setViewOpen(!viewOpen);
  }

  // --- Email & Password Sign Up ---
  const handleEmailSignUp = (e) => {
    e.preventDefault();
    setError('');

    // ADDED: Password validation
    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    // CHANGED: Use createUserWithEmailAndPassword
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log("User created:", user);
        setDoc(doc(db, "users", user.uid), {
          username: username,
          uid: user.uid,
          email: user.email, // Will be null for email signup initially
          createdAt: serverTimestamp() // Good for tracking
        });
      })
      .catch((error) => {
        console.error("Signup Error:", error.message);
        setError(error.message);
      });

  };

  // --- Google & GitHub handlers are identical, as signInWithPopup handles both cases ---
  const handleGoogleSignIn = () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider)
      .catch((error) => {
        console.error("Google Signin Error:", error.message);
        setError(error.message);
      });
  };

  const handleGithubSignIn = () => {
    const provider = new GithubAuthProvider();
    signInWithPopup(auth, provider)
      .catch((error) => {
        console.error("GitHub Signin Error:", error.message);
        setError(error.message);
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
            {/* CHANGED: Text content */}
            <h1 className='bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent text-4xl font-bold'>Create an Account</h1>
            <p className='text-muted-foreground'>Get started on your new projects</p>
          </div>
          <form className='w-full my-3' onSubmit={handleEmailSignUp}>
            <div className='w-full my-3'>
              <label htmlFor="username" className='text-lg'>Username</label>
              <div className='relative'>
                <User className='absolute top-[50%] transform translate-y-[-50%] left-2' color='gray' size={18} />
                <input type="text" name="username" id="username" placeholder='Enter Your Username' className='border border-gray-300 rounded-md p-2 pl-10 focus:outline-none focus:ring-2 focus:ring-blue-500 w-full' onChange={e => setUsername(e.target.value)} required />
              </div>
            </div>
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
              </div>
            </div>
            {/* ADDED: Confirm Password Field */}
            <div className=' w-full my-3'>
              <label htmlFor="confirmPassword" className='text-lg'>Confirm Password</label>
              <div className='relative'>
                <Lock className='absolute top-[50%] transform translate-y-[-50%] left-2' color='gray' size={18} />
                <input type={`${viewOpen ? 'text' : 'password'}`} name="confirmPassword" id="confirmPassword" placeholder='Confirm Your Password' className='border border-gray-300 rounded-md p-2 pl-10 focus:outline-none focus:ring-2 focus:ring-blue-500 w-full' onChange={e => setConfirmPassword(e.target.value)} required />
                <div className='absolute top-[50%] transform translate-y-[-50%] right-2 cursor-pointer' onClick={toggleView}>
                  {viewOpen ? <Eye color='gray' size={18} /> : <EyeClosed color='gray' size={18} />}
                </div>
              </div>
            </div>

            {error && <p className='text-red-500 text-center my-2'>{error}</p>}

            <div>
              {/* CHANGED: Button text */}
              <button type="submit" className='p-3 text-center w-full shadow bg-gradient-to-r from-purple-500 to-pink-500 font-medium text-white rounded-lg text-lg cursor-pointer'>Sign Up</button>
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
          {/* CHANGED: Link to login page */}
          <p className='text-center mt-3'>Already have an account? <Link to={'/login'} className='underline cursor-pointer'>Sign in</Link></p>
        </div>
      </div >
    </section >
  )
}

export default SignUp