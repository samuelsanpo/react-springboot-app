import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { messageService } from '../service/api';
import type { CreateMessageRequest } from '../types/message';

/**
 * Custom hook to manage all message-related operations.
 * Uses TanStack Query for server state management, caching, and synchronization.
 * * @param id - Optional message ID for fetching details or performing specific actions.
 */
export const useMessages = (id?: number) => {
  const queryClient = useQueryClient();

  // --- Queries ---

  // Fetch all messages 
  const messagesQuery = useQuery({
    queryKey: ['messages'],
    queryFn: messageService.getAll,
  });

  // Fetch a single message by ID 
  const messageDetailQuery = useQuery({
    queryKey: ['messages', id],
    queryFn: () => messageService.getById(id!),
    enabled: !!id,
  });

  // --- Mutations ---

  // Create a new message and invalidate the list cache upon success
  const createMessageMutation = useMutation({
    mutationFn: (newMessage: CreateMessageRequest) => messageService.create(newMessage),
    onSuccess: () => {
      // Invalidate the 'messages' query to trigger an automatic refetch
      queryClient.invalidateQueries({ queryKey: ['messages'] });
    },
  });

  // Delete a message and refresh the list
  const deleteMessageMutation = useMutation({
    mutationFn: (messageId: number) => messageService.delete(messageId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['messages'] });
    },
  });

  return {
    // Data state
    messages: messagesQuery.data ?? [],
    messageDetail: messageDetailQuery.data,
    
    // Loading & Error states
    isLoading: messagesQuery.isLoading || messageDetailQuery.isLoading,
    isError: messagesQuery.isError || messageDetailQuery.isError,
    isCreating: createMessageMutation.isPending,
    isDeleting: deleteMessageMutation.isPending,
    
    // Actions 
    createMessage: createMessageMutation.mutateAsync,
    deleteMessage: deleteMessageMutation.mutateAsync,
  };
};