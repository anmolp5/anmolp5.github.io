import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Navigation from './components/Navigation';
import Home from './pages/Home';
import Projects from './pages/Projects';
import ProjectDetail from './pages/ProjectDetail';
import Room3D from './pages/Room3D';
import Resume from './pages/Resume';
import Contact from './pages/Contact';

function Layout({ children }) {
  return (
    <>
      <Navigation />
      <div style={{ paddingTop: '70px' }}>
        {children}
      </div>
    </>
  );
}

function App() {
  return (
    <Router>
      <div style={{ minHeight: '100vh' }}>
        <Routes>
          {/* Room3D gets full screen without navigation */}
          <Route path="/projects/room-improvement" element={<Room3D />} />

          {/* All other routes get navigation */}
          <Route path="/" element={<Layout><Home /></Layout>} />
          <Route path="/projects" element={<Layout><Projects /></Layout>} />
          <Route path="/projects/:projectId" element={<Layout><ProjectDetail /></Layout>} />
          <Route path="/resume" element={<Layout><Resume /></Layout>} />
          <Route path="/contact" element={<Layout><Contact /></Layout>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;