import React from 'react'
import Home from './pages/Home'
import './index.css'
import { AuthProvider } from './components/AuthProvider'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Layout from './components/Layout'
import Login from './pages/Login'
import ProtectedRoute from './components/ProtectedRoute'
import Dashboard from './pages/Dashboard'
import About from './pages/About'
import NotFound from './pages/NotFound'
import Signup from './pages/Signup'
import Docs from './pages/Docs'
import AddProject from './pages/AddProject'
import ProjectRoadmap from './pages/ProjectRoadmap'

const App = () => {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="*" element={<NotFound />}></Route>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="about" element={<About />} />
            <Route path="docs" element={<Docs />} />
            <Route path="signup" element={<Signup />} />
            <Route path="login" element={<Login />} />
            <Route path="dashboard" element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            } />
            <Route path="addproject" element={
              <ProtectedRoute>
                <AddProject />
              </ProtectedRoute>
            } />
            <Route path="project/:id" element={
              <ProtectedRoute>
                <ProjectRoadmap />
              </ProtectedRoute>
            } />
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider >

  )
}

export default App