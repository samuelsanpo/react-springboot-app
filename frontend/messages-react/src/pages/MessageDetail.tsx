import { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useMessages } from '../hooks/useMessages';
import { Modal } from '../components/ui/Modal';
import { DetailSkeleton } from '../components/ui/Skeleton';
import toast from 'react-hot-toast';

const MessageDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const { messageDetail, isLoading, deleteMessage, isDeleting } = useMessages(Number(id));

  const confirmDelete = async () => {
    try {
      await deleteMessage(Number(id));
      toast.success('Message permanently deleted');
      navigate('/');
    } catch (err) {
      toast.error('Deletion failed. Please try again.');
    }
  };

  if (isLoading) return <DetailSkeleton />;
  if (!messageDetail) return <div className="text-center py-20">Message not found</div>;

  return (
    <div className="max-w-3xl mx-auto">
      <Link to="/" className="text-sm text-gray-500 hover:text-globalside-blue flex items-center gap-2 mb-8 transition-colors">
        ← Back to Inbox
      </Link>

      <div className="bg-white rounded-2xl p-10 shadow-sm border border-gray-100">
        <div className="flex justify-between items-start border-b border-gray-50 pb-8 mb-8">
          <div>
            <h2 className="text-4xl font-extrabold text-gray-900 tracking-tight">{messageDetail.subject}</h2>
            <p className="text-gray-400 mt-2 font-medium">Received {messageDetail.date}</p>
          </div>
          <button 
            onClick={() => setShowModal(true)}
            className="text-red-500 hover:text-red-700 bg-red-50 hover:bg-red-100 px-4 py-2 rounded-lg transition-all font-semibold cursor-pointer"
          >
            Delete
          </button>
        </div>

        <div className="text-gray-700 leading-relaxed text-lg whitespace-pre-wrap">
          {messageDetail.text}
        </div>
      </div>

      <Modal 
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        onConfirm={confirmDelete}
        isLoading={isDeleting}
        title="Delete Message"
        message="Are you sure you want to delete this message? This cannot be undone."
      />
    </div>
  );
};

export default MessageDetail;