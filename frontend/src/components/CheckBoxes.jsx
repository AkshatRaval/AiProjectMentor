import React, { useState } from "react";
import techList from "../constants/Technologies";


const TechSelector = ({ onTechChange }) => {
    const [selectedTech, setSelectedTech] = useState([]);

    const handleCheckboxChange = (tech) => {
        let updated;
        if (selectedTech.includes(tech)) {
            updated = selectedTech.filter((t) => t !== tech);
        } else {
            updated = [...selectedTech, tech];
        }
        setSelectedTech(updated);
        onTechChange(updated); // 🔥 send updated list to parent
    };

    return (
        <div className="my-2 w-full">
            <div className="flex gap-3 flex-wrap">
                {techList.map((tech) => (
                    <label
                        key={tech}
                        className="flex items-center space-x-2 p-2 border rounded-lg cursor-pointer hover:bg-gray-50 transition"
                    >
                        <input
                            type="checkbox"
                            value={tech}
                            checked={selectedTech.includes(tech)}
                            onChange={() => handleCheckboxChange(tech)}
                            className="w-4 h-4 text-blue-500 border-gray-300 rounded focus:ring-blue-400"
                        />
                        <span>{tech}</span>
                    </label>
                ))}
            </div>
        </div>
    );
};

export default TechSelector;
