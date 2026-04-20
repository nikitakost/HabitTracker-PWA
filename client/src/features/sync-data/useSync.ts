import { useMutation, useQuery } from '@tanstack/react-query';
import { fetchWithAuth } from '@/shared/api';
import { useHabitStore } from '@/entities/habit';
import { useAuthStore } from '@/entities/user';

export const useSync = () => {
  const { user } = useAuthStore();
  const { habits, setHabits } = useHabitStore();

  const pushMutation = useMutation({
    mutationFn: async () => {
      if (!user) return;
      return fetchWithAuth<{ success: boolean; message: string }>('/sync/push', {
        method: 'POST',
        body: JSON.stringify({ habits }),
      });
    },
  });

  const pullQuery = useQuery({
    queryKey: ['sync-pull'],
    queryFn: async () => {
      if (!user) return null;
      const data = await fetchWithAuth<{ habits: typeof habits }>('/sync/pull');
      if (data.habits) {
        setHabits(data.habits);
      }
      return data;
    },
    enabled: !!user,
    staleTime: 5 * 60 * 1000,
    refetchOnMount: false,
    refetchOnReconnect: false,
  });

  return {
    pullHabits: pullQuery.refetch,
    pushHabits: pushMutation.mutate,
    isPushing: pushMutation.isPending,
    isPulling: pullQuery.isLoading,
  };
};
