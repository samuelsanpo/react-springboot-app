import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import Navbar from './components/layout/Navbar'; 
import LandingPage from './pages/LandingPage';
import CreateMessage from './pages/CreateMessage';
import MessageDetail from './pages/MessageDetail';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-[#F9FAFB] text-gray-900 font-sans selection:bg-blue-100 selection:text-blue-900">
        <Navbar /> 

        <main className="max-w-5xl mx-auto px-6 py-12">
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/new" element={<CreateMessage />} />
            <Route path="/message/:id" element={<MessageDetail />} />
          </Routes>
        </main>
        
        <Toaster 
          position="bottom-right"
          toastOptions={{
            duration: 4000,
            style: { borderRadius: '12px', background: '#333', color: '#fff' }
          }} 
        />
      </div>
    </Router>
  );
}

export default App;