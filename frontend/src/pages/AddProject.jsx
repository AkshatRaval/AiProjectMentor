import { Stars, X } from 'lucide-react'
import React, { useState } from 'react'
import { Link, Navigate, useNavigate } from 'react-router-dom'
import TechSelector from '../components/CheckBoxes'
import { getAuth } from "firebase/auth";
import api from '../lib/api';


const AddProject = () => {


  const auth = getAuth();
  const user = auth.currentUser;

  if (!user) {
    alert("You must be logged in to generate a roadmap");
    return;
  }

  // This will be sent to backend
  const navigate = useNavigate()

  const [loading, setLoading] = useState(false)
  const [projectName, setProjectName] = useState('')
  const [targetAudience, setTargetAudience] = useState('')
  const [technologies, setTechnologies] = useState([]);
  const [timeLine, setTimeLine] = useState(2);
  const [additionalFeatures, setAdditionalFeatures] = useState("");
  const [complexity, setComplexity] = useState("Beginner");

  const [formData, setFormData] = useState({
    projectName,
    targetAudience,
    technologies,
    timeLine,
    additionalFeatures,
    complexity
  })
  const generateRoadmap = async () => {
    const data = {
      projectName,
      targetAudience,
      technologies,
      timeLine: Number(timeLine),
      additionalFeatures,
      complexity,
    };

    try {
      setLoading(true);
      const user = auth.currentUser;
      if (!user) throw new Error("User not logged in");
      const idToken = await user.getIdToken();

      const res = await api.post("api/roadmaps/project", data);
      const result = await res.data;
      console.log("Project created:", result);
      alert("Roadmap saved successfully!");
      navigate(`/project/${result?.id}`)
      // window.location.href(`/project/${result.project.id}`)
    } catch (err) {
      console.error(err);
      alert("Failed to save roadmap: " + err.message);
    } finally {
      setLoading(false);
    }
  };


  return (
    <div className='relative'>
      <section className='my-25 lg:px-80 px-10'>
        <div className='flex items-center justify-between mb-3'>
          <h1 className='border w-fit md:text-2xl p-2 rounded-lg font-bold px-6 bg-accent text-accent-foreground '>
            Add Your Project Details
          </h1>
          <Link to={'/dashboard'} className='border w-fit md:text-2xl p-2 rounded-lg px-6 bg-destructive text-destructive-foreground flex items-center gap-1 border-destructive hover:bg-destructive-foreground hover:text-destructive justify-center cursor-pointer transition-all'>
            <X size={20} /> Cancel
          </Link>
        </div>
        <div className='shadow-2xl p-5 md:p-10 border border-blue-500 rounded-xl my-2 '>
          <form>
            <div className='flex flex-col'>
              <label htmlFor="projectName" className='text-lg font-semibold '>Project Name</label>
              <input type="text"
                required
                className='border p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 w-full my-2'
                placeholder='Enter Project Name'
                name='projectName'
                id='projectName'
                value={projectName}
                onChange={(e) => { setProjectName(e.target.value) }} />
            </div>
            <div className='border rounded-2xl my-5 ' />
            <div className='flex flex-col'>
              <p className='text-lg font-semibold'>Select Technologies</p>
              <TechSelector onTechChange={setTechnologies} />
              {/* Debug: show selected */}
              <p className="mt-2 text-sm text-gray-600">
                Selected: {technologies.join(", ")}
              </p>
            </div>
            <div className='border rounded-2xl my-5 ' />
            <div className='flex flex-col'>
              <label htmlFor="targetAudience" className='text-lg font-semibold '>Target Audience</label>
              <input type="text"
                required
                className='border p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 w-full my-2'
                placeholder='Who Are Your Targeted Audience?'
                name='targetAudience'
                id='targetAudience'
                value={targetAudience}
                onChange={(e) => { setTargetAudience(e.target.value) }} />
            </div>
            <div className='border rounded-2xl my-5 ' />
            <div className='flex flex-col'>
              <label htmlFor="timeline" className='text-lg font-semibold '>Timeline (Weeks)</label>
              <select
                required
                className='border p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 w-full my-2'
                name='timeline'
                id='timeline'
                value={timeLine}
                onChange={(e) => { setTimeLine(e.target.value) }}>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
                <option value="6">6</option>
                <option value="7">7</option>
                <option value="8">8</option>
              </select>
            </div>
            <div className='border rounded-2xl my-5 ' />
            <div className='flex flex-col'>
              <label htmlFor="additionalFeatures" className='text-lg font-semibold '>Additional Features (optional)</label>
              <textarea
                className='border p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 w-full my-2'
                placeholder='Any Additional Features to add?'
                name='additionalFeatures'
                id='additionalFeatures'
                value={additionalFeatures}
                onChange={(e) => { setAdditionalFeatures(e.target.value) }} />
            </div>
            <div className='border rounded-2xl my-5 ' />
            <div className='flex flex-col'>
              <label htmlFor="complexity" className='text-lg font-semibold '>Complexity</label>
              <select
                required
                className='border p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 w-full my-2'
                name='complexity'
                id='complexity'
                value={complexity}
                onChange={(e) => { setComplexity(e.target.value) }}>
                <option value="Beginner">Beginner</option>
                <option value="Intermediate">Intermediate</option>
                <option value="Advanced">Advanced</option>
              </select>
            </div>
            <div className='my-5' />
          </form>
          <button className='flex items-center text-2xl gap-2 bg-gradient-to-r from-[#0063ba] via-[#3c90de] via-[#c17bff] to-[#ec40ff] p-3 w-full justify-center font-semibold text-white rounded-xl cursor-pointer' onClick={generateRoadmap}><Stars />Generate Roadmap</button>
        </div>
      </section>
      {loading && <section className='absolute flex items-center justify-center w-full h-full top-0 bg-black/50 backdrop-blur-sm'>
        <div className='flex flex-col items-center justify-center gap-2'>
          <div className='p-5 bg-transperet border-5 border-white border-b-gray-500  border-t-gray-500 rounded-full animate-spin' />
          <p className='text-xl text-white font-semibold '>Generating Roadmap</p>
        </div>
      </section>}
    </div>
  )
}

export default AddProject