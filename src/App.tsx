/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { 
  LayoutDashboard, 
  AlertTriangle, 
  Users, 
  Database,
  Menu,
  X
} from 'lucide-react';
import Dashboard from './components/Dashboard';
import DataSiswa from './components/DataSiswa';
import Pelanggaran from './components/Pelanggaran';
import Bimbingan from './components/Bimbingan';
import BankData from './components/BankData';
import { Student, StudentRecord } from './types';

export default function App() {
  const [currentView, setCurrentView] = useState('welcome');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  
  // Initialize state from localStorage (Bank Data)
  const [students, setStudents] = useState<Student[]>(() => {
    const saved = localStorage.getItem('bk_students');
    return saved ? JSON.parse(saved) : [];
  });
  const [records, setRecords] = useState<StudentRecord[]>(() => {
    const saved = localStorage.getItem('bk_records');
    return saved ? JSON.parse(saved) : [];
  });

  // Save to localStorage whenever data changes
  useEffect(() => {
    localStorage.setItem('bk_students', JSON.stringify(students));
  }, [students]);

  useEffect(() => {
    localStorage.setItem('bk_records', JSON.stringify(records));
  }, [records]);

  const [isOnline, setIsOnline] = useState(navigator.onLine);

  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);
    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  const navigation = [
    { name: 'Data Siswa', id: 'data-siswa', icon: Database },
    { name: 'Pelanggaran', id: 'pelanggaran', icon: AlertTriangle },
    { name: 'Bimbingan', id: 'bimbingan', icon: Users },
    { name: 'Bank Data', id: 'bank-data', icon: Database },
  ];

  const renderContent = () => {
    switch (currentView) {
      case 'welcome':
        return <Dashboard onNavigate={setCurrentView} />;
      case 'data-siswa':
        return <DataSiswa students={students} setStudents={setStudents} onNavigate={setCurrentView} />;
      case 'pelanggaran':
        return <Pelanggaran students={students} records={records} setRecords={setRecords} onNavigate={setCurrentView} />;
      case 'bimbingan':
        return <Bimbingan students={students} records={records} setRecords={setRecords} onNavigate={setCurrentView} />;
      case 'bank-data':
        return <BankData students={students} records={records} setRecords={setRecords} onNavigate={setCurrentView} />;
      default:
        return <Dashboard onNavigate={setCurrentView} />;
    }
  };

  if (currentView === 'welcome') {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
        <div className="w-full max-w-4xl">
          {renderContent()}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      {/* Top Navigation Bar */}
      <header className="sticky top-0 z-50 bg-blue-900 text-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center space-x-2 cursor-pointer" onClick={() => setCurrentView('welcome')}>
            <div className="bg-white p-1 rounded-lg">
              <LayoutDashboard className="text-blue-900" size={24} />
            </div>
            <h1 className="text-xl font-bold tracking-tight">KONSELOR SMK NEGERI 1 BUNYU</h1>
          </div>
          
          <div className="flex items-center space-x-4">
            {!isOnline && (
              <div className="flex items-center bg-amber-500/20 text-amber-300 px-3 py-1 rounded-full text-xs font-bold border border-amber-500/30 animate-pulse">
                <div className="w-2 h-2 bg-amber-500 rounded-full mr-2"></div>
                MODA OFFLINE
              </div>
            )}
            <button 
              className="md:hidden p-2 hover:bg-blue-800 rounded-lg transition-colors"
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            >
              {isSidebarOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center space-x-1">
            {navigation.map((item) => {
              const Icon = item.icon;
              const isActive = currentView === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setCurrentView(item.id)}
                  className={`
                    flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-semibold transition-all
                    ${isActive 
                      ? 'bg-white text-blue-900 shadow-sm' 
                      : 'text-blue-100 hover:bg-blue-800 hover:text-white'}
                  `}
                >
                  <Icon size={18} />
                  <span>{item.name.toUpperCase()}</span>
                </button>
              );
            })}
          </nav>
        </div>

        {/* Mobile Nav Menu */}
        {isSidebarOpen && (
          <div className="md:hidden bg-blue-800 border-t border-blue-700 py-4 px-4 space-y-2">
            {navigation.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    setCurrentView(item.id);
                    setIsSidebarOpen(false);
                  }}
                  className={`
                    w-full flex items-center space-x-3 px-4 py-3 rounded-xl
                    ${currentView === item.id ? 'bg-white text-blue-900' : 'text-white hover:bg-blue-700'}
                  `}
                >
                  <Icon size={20} />
                  <span className="font-bold">{item.name}</span>
                </button>
              );
            })}
          </div>
        )}
      </header>
      
      {/* Main Content Area */}
      <main className="flex-1 overflow-auto p-4 md:p-8 bg-slate-50/50">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-end mb-6">
            <button
              onClick={() => setCurrentView('welcome')}
              className="flex items-center px-6 py-2.5 bg-white border border-slate-200 text-slate-600 font-bold rounded-xl hover:bg-red-600 hover:text-white hover:border-red-600 transition-all shadow-sm group"
            >
              <X size={20} className="mr-2 group-hover:rotate-90 transition-transform" />
              TUTUP HALAMAN
            </button>
          </div>
          {renderContent()}
        </div>
      </main>

      {/* Footer Branding */}
      <footer className="py-4 text-center text-slate-400 text-xs border-t border-slate-200 bg-white">
        &copy; {new Date().getFullYear()} KONSELOR SMK NEGERI 1 BUNYU • Sistem Administrasi Guru BK
      </footer>
    </div>
  );
}
