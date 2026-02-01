import { useState } from 'react';
import { useMessages } from '../hooks/useMessages';
import MessageTable from '../components/ui/MessageTable';
import { Link } from 'react-router-dom';

/**
 * Acts as a container that manages the welcome state and 
 * passes data to the MessageTable presentational component.
 */
const LandingPage = () => {

  // State to handle the initial welcome view
  const [isHeroActive, setIsHeroActive] = useState(() => {
    return localStorage.getItem('hasSeenWelcome') !== 'true';
  });
  // Custom hook to fetch messages and handle loading states
  const { messages, isLoading } = useMessages();

  // Handler hide the hero section and show inbox
  const handleEnterInbox = () => {
    localStorage.setItem('hasSeenWelcome', 'true');
    setIsHeroActive(false);
  };

  //Welcome view
  if (isHeroActive) {
      return (
        <div className="flex flex-col items-center justify-center min-h-[60vh] text-center animate-fade-in">
          <h2 className="text-6xl font-black text-gray-900 tracking-tighter mb-4">
            Welcome to <span className="text-globalside-blue">Message Application</span>
          </h2>
          <p className="max-w-md text-gray-500 mb-10 text-lg">
            By Samuel Sanabria.
          </p>
          <button 
            onClick={handleEnterInbox} 
            className="bg-globalside-blue hover:bg-globalside-navy text-white px-8 py-4 rounded-xl font-bold shadow-xl shadow-globalside-navy transition-all active:scale-95 cursor-pointer"
          >
            View My Messages
          </button>
        </div>
      );
    }

  // Messages view
  return (
    <div className="animate-fade-in">
      <header className="mb-10 flex justify-between items-end">
        <div>
          <h3 className="text-4xl font-extrabold text-gray-900 tracking-tight">Your Messages</h3>
          <p className="text-gray-500 mt-2 font-medium">
            Showing {messages.length} messages.
          </p>
        </div>
        <Link
          to="/new"
          className="text-sm font-bold text-white bg-globalside-blue px-6 py-3 rounded-lg hover:bg-globalside-navy transition-all shadow-md shadow-globalside-navy h-fit"
        >
          Create New Message
        </Link>
      </header>

      <MessageTable
        messages={messages}
        isLoading={isLoading}
      />

      <footer className="mt-8 text-center">
        <p className="text-sm text-gray-400">
          Samuel Sanabria • 2026
        </p>
      </footer>
    </div>
  );
};

export default LandingPage;