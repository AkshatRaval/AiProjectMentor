import { Router } from 'express'
import { deleteProjectById, generateRoadmap, getAllProjects, getProjectById } from '../controllers/roadmapControls.js';
import { verifyToken } from '../middleware/veryfyToken.js';
const roadMapRoutes = Router();

roadMapRoutes.route('/project')
    .post(verifyToken, generateRoadmap)
    .get(verifyToken, getAllProjects)

roadMapRoutes.route('/project/:id')
    .get(verifyToken, getProjectById)
    .delete(verifyToken, deleteProjectById)

export default roadMapRoutes;