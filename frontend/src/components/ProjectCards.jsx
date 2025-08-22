import { Clock, Delete, Eye, Trash, Trophy, Zap } from "lucide-react";
import React, { useMemo } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "./AuthProvider";
import api from "../lib/api";

// Helper: format Firestore timestamp
const formatDate = (timestamp) => {
    if (!timestamp?._seconds) return "unknown";
    const date = new Date(timestamp._seconds * 1000);
    return date.toLocaleDateString("en-US", { month: "short", day: "numeric" });
};

// Helper: calculate weeks passed since createdAt
const getWeeksPassed = (createdAt) => {
    if (!createdAt?._seconds) return 0;
    const created = new Date(createdAt._seconds * 1000);
    const now = new Date();
    const diff = now - created;
    return Math.max(1, Math.ceil(diff / (7 * 24 * 60 * 60 * 1000))); // at least week 1
};


const ProjectCard = ({ project, onDelete }) => {
    
    const totalWeeks = project.timeLine || project.roadmap?.weeklyPlan?.length || 1;
    const weeksPassed = getWeeksPassed(project.createdAt);
    const currentWeek = Math.min(weeksPassed, totalWeeks);
    const progress = Math.round((currentWeek / totalWeeks) * 100);

    // Status logic
    let status = "Not Started";
    if (currentWeek > 0 && currentWeek < totalWeeks) status = "Ongoing";
    if (currentWeek >= totalWeeks) status = "Completed";

    // Fake gamification placeholders
    const xp = currentWeek * 100; // arbitrary formula
    const badges = Math.floor(progress / 50); // 1 badge per 50%
    const level = progress < 50 ? "Beginner" : progress < 100 ? "Intermediate" : "Pro";

    const updated = formatDate(project.createdAt);

    return (
        <div className="bg-white rounded-2xl border border-gray-200 shadow-lg p-8 w-full md:w-fit font-sans relative overflow-hidden">
            {/* Subtle accent */}
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-purple-600" />

            {/* Header */}
            <div className="flex items-center mb-6 justify-between">
                <div className="flex items-center">
                    <div className="w-4 h-4 rounded-full bg-blue-500 mr-4 shadow-sm" />
                    <h2 className="font-bold text-2xl text-gray-800">{project.projectName}</h2>
                </div>
                <div>
                    <button onClick={() => onDelete(project?.id)}><Trash size={35} className="border border-destructive p-2 rounded-full text-destructive hover:text-white hover:bg-destructive transition-all cursor-pointer" />
                    </button>
                </div>
            </div>
            {/* Tech Stack */}
            <div className="mb-7">
                <div className="flex flex-wrap gap-2">
                    {project.technologies.map((technology, i) => (
                        <span
                            key={i}
                            className="bg-gray-50 border border-gray-200 text-gray-700 rounded-xl px-4 py-2 text-sm font-medium hover:bg-gray-100 transition-colors"
                        >
                            {technology}
                        </span>
                    ))}
                </div>
            </div>


            {/* Stats */}
            <div className="flex items-center gap-6 mb-6">
                <div>
                    <span className="bg-indigo-500 text-white px-4 py-2 rounded-lg text-sm font-semibold shadow-sm">
                        {status}
                    </span>
                </div>
            </div>

            {/* Footer */}
            <div className="flex items-center justify-between pt-5 border-t border-gray-100">
                <div className="flex items-center gap-2 text-sm text-gray-500">
                    <Clock size={15} />
                    <span>Updated {updated}</span>
                </div>
                <Link to={`/project/${project.id}`} className="bg-gray-900 hover:bg-gray-800 text-white px-5 py-2.5 rounded-xl text-sm font-medium transition-all flex items-center gap-2 shadow-md hover:shadow-lg">
                    <Eye size={16} />
                    View Details
                </Link>
            </div>
        </div>
    );
};

export default ProjectCard;
