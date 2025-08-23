import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { useAuth } from '../components/AuthProvider';
import api from '../lib/api';
import { ArrowLeft, Map, Target, CheckCircle2, Circle, Sparkles, Code, Users, Calendar, Clock } from 'lucide-react';
import motivationalQuotes from '../constants/Quotes';

const ProjectRoadmap = () => {
    const { currentUser } = useAuth();
    const { id } = useParams();
    const [project, setProject] = useState(null);
    const [tasksByWeek, setTasksByWeek] = useState({});

    useEffect(() => {
        const fetchProject = async () => {
            try {
                if (!currentUser) return;
                const token = await currentUser.getIdToken();
                const res = await api.get(`/api/roadmaps/project/${id}`, {
                    headers: { Authorization: `Bearer ${token}` }
                });
                setProject(res.data.project);
            } catch (error) {
                console.error("Fetch project error:", error.response?.data || error.message);
            }
        };
        fetchProject();
    }, [id, currentUser]);

    useEffect(() => {
        if (!project?.roadmap?.weeklyPlan) return;

        const saved = localStorage.getItem(`weekPlanTasks_${id}`); // Use project ID for unique storage
        if (saved) {
            setTasksByWeek(JSON.parse(saved));
        } else {
            const initial = {};
            project.roadmap.weeklyPlan.forEach((week, idx) => {
                initial[idx] = week.tasks.map(taskText => ({ text: taskText, completed: false }));
            });
            setTasksByWeek(initial);
        }
    }, [project, id]);

    useEffect(() => {
        // Don't save if tasksByWeek is an empty object
        if (Object.keys(tasksByWeek).length > 0) {
            localStorage.setItem(`weekPlanTasks_${id}`, JSON.stringify(tasksByWeek));
        }
    }, [tasksByWeek, id]);

    const toggleTask = (weekIndex, taskIndex) => {
        setTasksByWeek(prev => {
            const updated = { ...prev };

            if (!updated[weekIndex]) {
                console.warn(`No tasks found for week index: ${weekIndex}`);
                return prev; // Return previous state if week doesn't exist
            }

            const weekTasks = [...updated[weekIndex]];
            weekTasks[taskIndex] = {
                ...weekTasks[taskIndex],
                completed: !weekTasks[taskIndex].completed,
            };
            updated[weekIndex] = weekTasks;
            return updated;
        });
    };

    function getRandomQuote() {
        const index = Math.floor(Math.random() * motivationalQuotes.length);
        return motivationalQuotes[index];
    }

    let classes = '';
    switch (project?.complexity) {
        case "Beginner":
            classes = "text-green-700 bg-green-100";
            break;
        case "Intermediate":
            classes = "text-orange-500 bg-orange-100";
            break;
        case "Advanced":
            classes = "text-red-500 bg-red-100";
            break;
        default:
            break;
    }

    if (!project) {
        return <div>Loading project...</div>; // Add a loading state
    }

    return (
         <div className="my-25">
            <div className='lg:px-60 px-5 overflow-hidden'>
                <section className='rounded-xl border p-4 shadow-sm my-8 bg-white'>
                    {/* Header Section */}
                    <div className='mb-3 flex items-start w-full justify-between'>
                        <div>
                            <h1 className='text-2xl font-bold uppercase text-gray-900'>{project?.projectName}</h1>
                            <p className='text-sm text-gray-600'>For {project?.targetAudience}</p>
                        </div>
                        <div>
                            <Link to={'/dashboard'} className='flex items-center gap-1 bg-gray-100 text-gray-600 py-2 px-3 cursor-pointer rounded-lg hover:bg-gray-200 transition-colors'>
                                <ArrowLeft size={16} />Back
                            </Link>
                        </div>
                    </div>

                    <div className='flex gap-2 mb-3'>
                        <h1 className='text-gray-600 text-sm'>Technologies: </h1>
                        <div className='flex gap-1'>
                            {project?.technologies.map((tech, index) => (
                                <p className='border text-xs text-gray-600 bg-gray-50 px-2 py-0.5 rounded-full' key={index}>{tech}</p>
                            ))}
                        </div>
                    </div>

                    <div className='flex items-center gap-1 justify-between'>
                        <div className='flex items-center gap-1'>
                            <h1 className='text-gray-600 text-sm'>With Additional Features: </h1>
                            <p className='text-gray-500 text-xs'>{project?.additionalFeatures ? project?.additionalFeatures : "N/A"}</p>
                        </div>
                        <div>
                            <h1 className={`${classes} text-sm`}>{project?.complexity}</h1>
                        </div>
                    </div>

                    <div className='border-t my-4' />

                    <div>
                        <div>
                            <h2 className='text-lg font-semibold flex gap-2 items-center text-gray-800'>
                                <Map size={18} /> Week Wise Roadmap
                            </h2>
                            <p className='text-sm mt-0.5 ml-2 text-gray-600'>{getRandomQuote()}</p>
                            <p className='text-xs mt-0.5 ml-2 text-gray-500'>For {project?.timeLine} weeks</p>
                        </div>
                    </div>

                    <div className='border-t my-4' />

                    <div>
                        <div>
                            {project?.roadmap.weeklyPlan.map((weekPlan, i) => {
                                const weekTasksFromState = tasksByWeek[i] || [];
                                const completedCount = weekTasksFromState.filter(task => task.completed).length;
                                const totalCount = weekTasksFromState.length;
                                const progressPercentage = totalCount > 0 ? (completedCount / totalCount) * 100 : 0;

                                return (
                                    <div key={i} className="week-card my-3">
                                        <div className="bg-white rounded-lg border border-gray-200 hover:shadow-md transition-shadow duration-200">
                                            {/* Header Section */}
                                            <div className="bg-gradient-to-r from-blue-500 to-purple-500 p-4 rounded-t-lg">
                                                <div className="flex items-center justify-between text-white">
                                                    <div className="flex items-center gap-3">
                                                        <div className="h-8 bg-white/20 rounded-lg flex items-center justify-center w-fit px-2 text-sm font-bold">
                                                            {weekPlan.week}
                                                        </div>
                                                        <div>
                                                            <h2 className="font-semibold">Week {weekPlan.week}: {weekPlan.title}</h2>
                                                        </div>
                                                    </div>
                                                    
                                                    <div className="text-right">
                                                        <div className="bg-white/20 rounded px-2 py-1">
                                                            <div className="text-sm font-medium">{completedCount}/{totalCount}</div>
                                                        </div>
                                                    </div>
                                                </div>
                                                
                                                {/* Progress Bar */}
                                                <div className="mt-3">
                                                    <div className="w-full bg-white/20 rounded-full h-2">
                                                        <div 
                                                            className="bg-white h-2 rounded-full transition-all duration-300"
                                                            style={{ width: `${progressPercentage}%` }}
                                                        ></div>
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Tasks Section */}
                                            <div className="p-4">
                                                <ul className="space-y-2">
                                                    {weekTasksFromState.map((task, j) => (
                                                        <li key={j} className="task-item">
                                                            <div className="flex items-center gap-3 p-2 rounded hover:bg-gray-50 transition-colors">
                                                                <div>
                                                                    <input
                                                                        type="checkbox"
                                                                        id={`task-${i}-${j}`}
                                                                        checked={task.completed}
                                                                        onChange={() => toggleTask(i, j)}
                                                                        className="sr-only cursor-pointer"
                                                                    />
                                                                    <label
                                                                        htmlFor={`task-${i}-${j}`}
                                                                        className="cursor-pointer flex items-center"
                                                                    >
                                                                        {task.completed ? (
                                                                            <CheckCircle2 className="w-5 h-5 text-green-500 hover:text-green-600" />
                                                                        ) : (
                                                                            <Circle className="w-5 h-5 text-gray-400 hover:text-blue-500" />
                                                                        )}
                                                                    </label>
                                                                </div>
                                                                
                                                                <label
                                                                    htmlFor={`task-${i}-${j}`}
                                                                    className={`cursor-pointer flex-1 text-sm ${
                                                                        task.completed 
                                                                            ? 'line-through text-gray-400' 
                                                                            : 'text-gray-700'
                                                                    }`}
                                                                >
                                                                    {task.text}
                                                                </label>
                                                                
                                                                {task.completed && (
                                                                    <div className="px-2 py-0.5 bg-green-100 text-green-700 text-xs font-medium rounded-full">
                                                                        Done
                                                                    </div>
                                                                )}
                                                            </div>
                                                        </li>
                                                    ))}
                                                </ul>
                                                
                                                {weekTasksFromState.length === 0 && (
                                                    <div className="text-center py-6 text-gray-400">
                                                        <Target className="w-8 h-8 mx-auto mb-2 opacity-50" />
                                                        <p className="text-sm">No tasks defined for this week</p>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                </section>
            </div>
        </div>
    )
}

export default ProjectRoadmap;