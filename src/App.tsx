import React, { useState } from 'react';
import { Building2, Calculator, FileText, LineChart, Home, LogOut } from 'lucide-react';
import ProjectInput from './components/ProjectInput';
import Dashboard from './components/Dashboard';
import CostOptimization from './components/CostOptimization';
import Reports from './components/Reports';
import Login from './components/Login';
import Register from './components/Register';
import { createClient } from '@supabase/supabase-js';

type Tab = 'home' | 'input' | 'dashboard' | 'optimization' | 'reports';
type AuthView = 'login' | 'register';

const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL || '',
  import.meta.env.VITE_SUPABASE_ANON_KEY || ''
);

function App() {
  const [activeTab, setActiveTab] = useState<Tab>('home');
  const [projectData, setProjectData] = useState<any>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [authView, setAuthView] = useState<AuthView>('login');

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setIsAuthenticated(false);
    setAuthView('login');
  };

  if (!isAuthenticated) {
    return authView === 'login' ? (
      <Login
        onLogin={() => setIsAuthenticated(true)}
        switchToRegister={() => setAuthView('register')}
      />
    ) : (
      <Register
        onRegister={() => setIsAuthenticated(true)}
        switchToLogin={() => setAuthView('login')}
      />
    );
  }

 const renderContent = () => {
  switch (activeTab) {
    case 'home':
      return (
        <div
          className="text-center max-w-4xl mx-auto min-h-screen flex flex-col justify-center items-center p-8"
          style={{
            backgroundImage: `url('https://careers.asce.org/getasset/e312c7fd-7956-4c83-9239-a0d33bc49d62/')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            backgroundAttachment: 'fixed',
          }}
        >
          <div className="bg-white/80 backdrop-blur-md rounded-lg p-8 shadow-lg">
            <Building2 className="w-16 h-16 mx-auto mb-6 text-blue-600" />
            <h1 className="text-4xl font-bold mb-6 text-gray-800">Construction Cost Estimator</h1>
            <p className="text-lg text-gray-600 mb-8">
              Accurate cost estimation for your construction projects. Make informed decisions
              with our comprehensive analysis and optimization suggestions.
            </p>
            <button
              onClick={() => setActiveTab('input')}
              className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition"
            >
              Start New Estimation
            </button>
          </div>
        </div>
      );
      case 'input':
        return <ProjectInput onSubmit={setProjectData} onComplete={() => setActiveTab('dashboard')} />;
      case 'dashboard':
        return <Dashboard projectData={projectData} />;
      case 'optimization':
        return <CostOptimization projectData={projectData} />;
      case 'reports':
        return <Reports projectData={projectData} />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-between h-16">
            <div className="flex space-x-8">
              <button
                onClick={() => setActiveTab('home')}
                className={`inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium ${
                  activeTab === 'home'
                    ? 'border-blue-500 text-gray-900'
                    : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
                }`}
              >
                <Home className="w-5 h-5 mr-2" />
                Home
              </button>
              <button
                onClick={() => setActiveTab('input')}
                className={`inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium ${
                  activeTab === 'input'
                    ? 'border-blue-500 text-gray-900'
                    : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
                }`}
              >
                <Calculator className="w-5 h-5 mr-2" />
                Project Input
              </button>
              <button
                onClick={() => setActiveTab('dashboard')}
                className={`inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium ${
                  activeTab === 'dashboard'
                    ? 'border-blue-500 text-gray-900'
                    : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
                }`}
              >
                <LineChart className="w-5 h-5 mr-2" />
                Dashboard
              </button>
              <button
                onClick={() => setActiveTab('optimization')}
                className={`inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium ${
                  activeTab === 'optimization'
                    ? 'border-blue-500 text-gray-900'
                    : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
                }`}
              >
                <Calculator className="w-5 h-5 mr-2" />
                Optimization
              </button>
              <button
                onClick={() => setActiveTab('reports')}
                className={`inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium ${
                  activeTab === 'reports'
                    ? 'border-blue-500 text-gray-900'
                    : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
                }`}
              >
                <FileText className="w-5 h-5 mr-2" />
                Reports
              </button>
            </div>
            <div className="flex items-center">
              <button
                onClick={handleLogout}
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
              >
                <LogOut className="w-4 h-4 mr-2" />
                Logout
              </button>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto py-12 px-4">
        {renderContent()}
      </main>
    </div>
  );
}

export default App;