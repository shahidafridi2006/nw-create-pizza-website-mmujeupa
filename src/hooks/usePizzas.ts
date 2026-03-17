import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/lib/supabase';
import { Pizza } from '@/types';

export function usePizzas() {
  return useQuery({
    queryKey: ['pizzas'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('pizzas')
        .select('*')
        .eq('is_available', true)
        .order('created_at', { ascending: false });

      if (error) throw error;
      return data as Pizza[];
    },
  });
}
