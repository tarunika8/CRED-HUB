
import React from 'react';
import { DashboardIcon } from './icons/DashboardIcon';
import { VerifyIcon } from './icons/VerifyIcon';
import { JobIcon } from './icons/JobIcon';
import { RoadmapIcon } from './icons/RoadmapIcon';

interface SidebarProps {
  currentView: number;
  setCurrentView: (view: number) => void;
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

const NavItem: React.FC<{
  icon: React.ReactNode;
  label: string;
  isActive: boolean;
  onClick: () => void;
}> = ({ icon, label, isActive, onClick }) => {
  return (
    <button
      onClick={onClick}
      className={`flex items-center w-full px-4 py-3 text-sm font-medium transition-colors duration-200 ease-in-out rounded-lg ${
        isActive
          ? 'bg-blue-600 text-white'
          : 'text-gray-400 hover:bg-gray-700 hover:text-white'
      }`}
    >
      {icon}
      <span className="ml-4">{label}</span>
    </button>
  );
};

export const Sidebar: React.FC<SidebarProps> = ({ currentView, setCurrentView, isOpen, setIsOpen }) => {
  const navItems = [
    { id: 0, label: 'Dashboard', icon: <DashboardIcon className="w-6 h-6" /> },
    { id: 1, label: 'Verification', icon: <VerifyIcon className="w-6 h-6" /> },
    { id: 2, label: 'Job Matching', icon: <JobIcon className="w-6 h-6" /> },
    { id: 3, label: 'AI Roadmap', icon: <RoadmapIcon className="w-6 h-6" /> },
  ];

  const handleNavClick = (viewId: number) => {
    setCurrentView(viewId);
    setIsOpen(false); // Close sidebar on navigation in mobile
  }

  return (
    <>
      {/* Backdrop for mobile */}
      <div
        className={`fixed inset-0 bg-black bg-opacity-60 z-20 md:hidden transition-opacity ${
          isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        onClick={() => setIsOpen(false)}
        aria-hidden="true"
      ></div>

      {/* Sidebar */}
      <div
        className={`flex flex-col w-64 bg-gray-800 border-r border-gray-700 p-4 transform transition-transform duration-300 ease-in-out z-30
        fixed inset-y-0 left-0 md:relative md:translate-x-0
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}
      >
        <div className="flex items-center justify-between mb-8">
            <div className='flex items-center'>
                 <div className="bg-blue-600 p-2 rounded-lg">
                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"></path></svg>
                </div>
                <h1 className="ml-3 text-2xl font-bold text-white">CredHub</h1>
            </div>
             <button onClick={() => setIsOpen(false)} className="md:hidden p-1 text-gray-400 hover:text-white" aria-label="Close sidebar">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
            </button>
        </div>
        <nav className="flex-1 space-y-2">
          {navItems.map((item) => (
            <NavItem
              key={item.id}
              icon={item.icon}
              label={item.label}
              isActive={currentView === item.id}
              onClick={() => handleNavClick(item.id)}
            />
          ))}
        </nav>
      </div>
    </>
  );
};
