import client from "../utils/googleAi.js";
import { db } from "../utils/firebaseAdmin.js";

export const generateRoadmap = async (req, res) => {
    const { projectName, targetAudience, technologies, timeLine, additionalFeatures, complexity } = req.body;

    const uid = req.user?.uid;
    if (!uid) return res.status(401).json({ error: "Missing authenticated user" });

    try {
        const prompt = `
          Generate a project roadmap for a project named "${projectName}".
          Target Audience: "${targetAudience}".
          Technologies: ${technologies.join(", ")}.
          Complexity: "${complexity}".
          Timeline: ${timeLine} weeks.
          Additional Features: ${additionalFeatures || "None"}.
          
          The JSON schema should be an object with a "weeklyPlan" key, which is an array of objects.
          Each object in the array should have "week", "title", and "tasks" (an array of strings) keys.
        `;

        const response = await client.models.generateContent({
            model: "gemini-2.5-flash",
            contents: prompt,
        });
        let textData = response.candidates[0].content.parts[0].text;
        textData = textData.replace(/```json/g, "").replace(/```/g, "").trim();
        let roadmap = null;

        try {
            roadmap = JSON.parse(textData); // converts string to JS object
        } catch (err) {
            console.error("Error parsing AI JSON:", err);
        }

        const docRef = await db.collection("projects").add({
            userid: uid,
            projectName,
            targetAudience,
            technologies,
            timeLine,
            additionalFeatures,
            complexity,
            roadmap,
            createdAt: new Date()
        });
        res.json({ success: true, id: docRef.id, roadmap });

    } catch (error) {
        console.error("Error generating roadmap:", error);
        res.status(500).json({ error: 'Failed to generate roadmap' });
    }
};

export const getAllProjects = async (req, res) => {
    try {
        const uid = req.user?.uid;
        // console.log(uid)
        if (!uid) return res.status(401).json({ error: "Missing authenticated user" });

        // fetch only projects owned by this user
        const snapshot = await db.collection("projects")
            .where("userid", "==", uid)
            .orderBy("createdAt", "desc")
            .get();

        const projects = snapshot.docs.map(d => ({ id: d.id, ...d.data() }));
        res.json({ projects });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Failed to fetch projects" });
    }
};
export const getProjectById = async (req, res) => {
    try {
        const uid = req.user?.uid;

        if (!uid) {
            return res.status(401).json({ error: "Missing authenticated user" });
        }

        const projectId = req.params.id;

        const docRef = db.collection("projects").doc(projectId);
        const doc = await docRef.get();

        if (!doc.exists) {
            return res.status(404).json({ error: "Project not found" });
        }
        const project = { id: doc.id, ...doc.data() };
        res.json({ project });
    } catch (err) {
        console.error("Error fetching project:", err);
        res.status(500).json({ error: "Failed to fetch project" });
    }
};
export const deleteProjectById = async (req, res) => {
    try {
        const projectId  = req.params.id;
        const projectDocRef = db.collection("projects").doc(projectId);
        await projectDocRef.delete();
        res.status(200).json({ message: "Project deleted successfully" });
    } catch (error) {
        console.error("Error deleting project:", error);
        res.status(500).json({ message: "Error deleting project" });
    }
};
