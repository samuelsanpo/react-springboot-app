import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useMessages } from '../hooks/useMessages';
import toast from 'react-hot-toast';

/**
 * Page component for creating a new message.
 */
const CreateMessage = () => {
  const navigate = useNavigate();
  const { createMessage, isCreating } = useMessages();
  const [formData, setFormData] = useState({ subject: '', text: '' });

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Safety check for subject length 
    if (formData.subject.length > 40) {
      toast.error('Subject exceeds 40 characters limit');
      return;
    }

    try {
      await createMessage(formData);
      toast.success('Message created successfully');
      navigate('/'); 
    } catch (error) {
      toast.error('Could not create message. Check your connection.');
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <Link to="/" className="text-sm text-gray-500 hover:text-globalside-blue flex items-center gap-2 mb-8 transition-colors">
        ← Cancel and go back
      </Link>

      <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">New Message</h2>
        <p className="text-gray-500 mb-8">Fill in the details below to create a message.</p>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Subject Field */}
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2 tracking-wide uppercase">
              Subject
            </label>
            <input
              type="text"
              required
              placeholder="Subject of the message..."
              className={`w-full px-4 py-3 rounded-xl border transition-all outline-none focus:ring-4 ${
                formData.subject.length > 40 
                ? 'border-red-500 focus:ring-red-100' 
                : 'border-gray-200 focus:border-globalside-blue focus:ring-globalside-blue/20'
              }`}
              value={formData.subject}
              onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
            />
            <div className="flex justify-between mt-2">
              <p className={`text-xs font-medium ${formData.subject.length > 40 ? 'text-red-500' : 'text-gray-400'}`}>
                {formData.subject.length > 40 ? 'Maximum length exceeded' : 'Subject line'}
              </p>
              <span className={`text-xs font-bold ${formData.subject.length > 40 ? 'text-red-500' : 'text-gray-500'}`}>
                {formData.subject.length}/40
              </span>
            </div>
          </div>

          {/* Message Text Field */}
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2 tracking-wide uppercase">
              Message
            </label>
            <textarea
              required
              rows={6}
              placeholder="Write your message here..."
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-globalside-blue focus:ring-4 focus:ring-globalside-blue/20 transition-all outline-none resize-none"
              value={formData.text}
              onChange={(e) => setFormData({ ...formData, text: e.target.value })}
            />
          </div>

          {/* Action Buttons */}
          <div className="flex gap-4 pt-4">
            <button
              type="submit"
              disabled={isCreating || formData.subject.length > 40 || !formData.subject || !formData.text}
              className="flex-1 bg-globalside-blue hover:bg-globalside-navy text-white font-bold py-4 rounded-xl shadow-lg shadow-globalside-navy transition-all active:scale-[0.98] disabled:opacity-50 disabled:shadow-none cursor-pointer"
            >
              {isCreating ? 'Creating Message...' : 'Create Message'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateMessage;