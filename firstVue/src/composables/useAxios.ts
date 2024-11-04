import { ref } from 'vue';
import axios from 'axios';

export function useAxios<T>(url: string) {
  const data = ref<T | null>(null);
  const error = ref<string | null>(null);
  const loading = ref<boolean>(false);

  const fetchData = async () => {
    loading.value = true;
    error.value = null; 

    try {
      const response = await axios.get<T>(url); 
      data.value = response.data;
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'An error occurred';
    } finally {
      loading.value = false;
    }
  };

  fetchData();

  return { data, error, loading, fetchData };
}
