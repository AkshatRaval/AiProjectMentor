import { CircleCheck, Plus, Trophy, Zap } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import Cards from '../components/Cards'
import { progress } from 'framer-motion'
import { Target } from 'lucide-react'
import ProjectCard from '../components/ProjectCards'
import { Link } from 'react-router-dom'
import { useAuth } from '../components/AuthProvider'
import api from '../lib/api'


const Dashboard = () => {
  const { currentUser } = useAuth();
  const [loading, setLoading] = useState(false)


  const [projects, setProjects] = useState([])
  useEffect(() => {
    if (!currentUser) return;
    const fetchProjects = async () => {
      try {
        setLoading(true);
        const token = await currentUser.getIdToken();
        const res = await api.get("/api/roadmaps/project", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        // console.log("API response:", res.data); 
        setProjects(res.data.projects);
      } catch (error) {
        console.error("Error fetching projects", error);
      } finally {
        setLoading(false);
      }
    }
    fetchProjects();
  }, [currentUser, projects]);


  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this project?")) {
      try {

        await api.delete(`/api/roadmaps/project/${id}`);

        alert("Project deleted successfully!");
        setProjects(currentData => currentData.filter(p => p.id !== id));

      } catch (error) {
        // Show an error message
        console.error("Failed to delete project:", error);
        alert("Error: Could not delete the project. Please try again.");
      }
    }
  };

  const totalProjects = projects.length;

  const data = [
    {
      title: 'Total Projects',
      value: totalProjects,
      icon: <Target color="purple" size={36} />,
      elementType: null,
      elementValue: null,
    },
  ]

  return (
    <div className='relative min-h-screen'>
      <div className='mt-25 px-5 lg:px-80'>
        <div className=''>
          <div className='flex items-center justify-between'>
            <div className=''>
              <h1 className='md:text-4xl font-bold '>My Projects</h1>
              <p className='text-muted-foreground md:text-sm'>Manage and track all your development projects</p>
            </div>
            <Link className='flex text-sm md:text-lg bg-gradient-to-r from-purple-500 to-pink-500 p-2 px-3 gap-2 text-background font-medium rounded-xl' to={'/addproject'}><Plus />Add Project</Link>
          </div>

          <section className='mt-10 flex gap-3 flex-wrap'>
            {data.map((card) => (
              <Cards key={card.title} card={card} />
            ))}
          </section>
          <section className='mt-10 flex gap-3 flex-wrap'>
            {projects.map((project, index) => {
              // load saved tasks for this project from localStorage
              const saved = localStorage.getItem(`weekPlanTasks_${project._id}`);
              const tasksByWeek = saved ? JSON.parse(saved) : {};

              // flatten all tasks from all weeks
              const allTasks = Object.values(tasksByWeek).flat();
              const totalTasks = allTasks.length;
              const completedTasks = allTasks.filter(t => t.completed).length;

              const overallProgress = totalTasks > 0
                ? Math.round((completedTasks / totalTasks) * 100)
                : 0;

              return (
                <ProjectCard
                  key={index}
                  project={project}
                  overallProgress={overallProgress}
                  completedTasks={completedTasks}
                  totalTasks={totalTasks}
                  onDelete={handleDelete}
                />
              );
            })}
          </section>
        </div>
      </div>
    </div>
  )
}

export default Dashboard