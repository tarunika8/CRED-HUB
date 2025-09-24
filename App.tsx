
import React, { useState, useMemo } from 'react';
import { Sidebar } from './components/Sidebar';
import { Header } from './components/Header';
import { Dashboard } from './components/Dashboard';
import { Verification } from './components/Verification';
import { JobMatching } from './components/JobMatching';
import { LearningRoadmap } from './components/LearningRoadmap';
import type { Certificate, UserProfile } from './types';
import { mockCertificates, mockUser } from './constants';

enum View {
  Dashboard,
  Verification,
  Jobs,
  Roadmap,
}

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<View>(View.Dashboard);
  const [certificates, setCertificates] = useState<Certificate[]>(mockCertificates);
  const [user] = useState<UserProfile>(mockUser);
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  
  const addCertificate = (cert: Omit<Certificate, 'id'>) => {
    const newCert: Certificate = {
      ...cert,
      id: `cert-${Date.now()}`,
    };
    setCertificates(prev => [newCert, ...prev]);
  };

  const renderView = () => {
    switch (currentView) {
      case View.Dashboard:
        return <Dashboard user={user} certificates={certificates} addCertificate={addCertificate} />;
      case View.Verification:
        return <Verification />;
      case View.Jobs:
        return <JobMatching certificates={certificates} />;
      case View.Roadmap:
        return <LearningRoadmap certificates={certificates} />;
      default:
        return <Dashboard user={user} certificates={certificates} addCertificate={addCertificate} />;
    }
  };

  const activeViewName = useMemo(() => {
    switch (currentView) {
      case View.Dashboard: return 'Dashboard';
      case View.Verification: return 'Verification';
      case View.Jobs: return 'Job Matching';
      case View.Roadmap: return 'Learning Roadmap';
    }
  }, [currentView]);

  return (
    <div className="relative min-h-screen md:flex bg-gray-900 font-sans">
      <Sidebar 
        currentView={currentView} 
        setCurrentView={setCurrentView} 
        isOpen={isSidebarOpen}
        setIsOpen={setSidebarOpen}
      />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header 
          viewName={activeViewName} 
          user={user} 
          toggleSidebar={() => setSidebarOpen(!isSidebarOpen)} 
        />
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-900 p-4 sm:p-6 md:p-8">
          {renderView()}
        </main>
      </div>
    </div>
  );
};

export default App;
