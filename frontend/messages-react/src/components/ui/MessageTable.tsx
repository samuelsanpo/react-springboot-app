import { Link } from 'react-router-dom';
import type { Message } from '../../types/message';
import { TableSkeleton } from './Skeleton';

interface MessageTableProps {
  messages: Message[];
  isLoading: boolean;
}


const MessageTable = ({ messages, isLoading }: MessageTableProps) => {
  if (!isLoading && messages.length === 0) {
    return (
      <div className="text-center py-20 bg-gray-50 rounded-2xl border-2 border-dashed border-gray-200">
        <p className="text-gray-500 font-medium">No messages found. Start by creating one!</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
      
      <table className="w-full text-left">
        <thead className="bg-gray-50/50 border-b border-gray-100">
          <tr>
            <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-widest">Subject</th>
            <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-widest">Date</th>
            <th className="px-6 py-4 text-right text-xs font-bold text-gray-400 uppercase tracking-widest">Action</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-50">
          {isLoading ? (
            <TableSkeleton />
          ) : (
            messages.map((msg) => (
              <tr key={msg.id} className="group hover:bg-blue-50/30 transition-colors">
                <td className="px-6 py-4">
                  <span className="text-gray-900 font-semibold block">{msg.subject}</span>
                </td>
                <td className="px-6 py-4 text-gray-500 text-sm font-medium">
                  {msg.date}
                </td>
                <td className="px-6 py-4 text-right">
                  <Link 
                    to={`/message/${msg.id}`}
                    className="inline-flex items-center text-globalside-blue hover:text-globalside-navy font-bold text-sm bg-blue-50 px-4 py-2 rounded-xl opacity-0 group-hover:opacity-100 transition-all"
                  >
                    View Details
                  </Link>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default MessageTable;